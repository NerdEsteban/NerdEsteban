<template>
    <div class="container">
        <div class="spinner-container" v-if="isLoading">
            <bounce-loader :loading="isLoading" color="#68d391" />
        </div>
        <template v-if="!isLoading">
            <div class="content-wrapper">
                <div class="image-section">
                    <img class="avatar" :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`" :alt="asset.name"/>
                    <h1>
                        {{ asset.name }}
                    <small class="subtitle">{{  asset.symbol  }}</small>
                    </h1>
                </div>
                <div class="info-section">
                    <ul class="info-list">
                    <li>
                        <p>Ranking</p>
                        <span>#{{  asset.rank  }}</span>
                    </li>
                    <li>
                        <p>Precio actual</p>
                        <span>{{   dollarFilter(asset.priceUsd)  }}</span>
                    </li>
                    <li>
                        <p>Precio más bajo</p>
                        <span> {{ dollarFilter(min) }}</span>
                    </li>
                    <li>
                        <p>Precio más alto</p>
                        <span>{{ dollarFilter(max) }}</span>
                    </li>
                    <li>
                        <p>Precio Promedio</p>
                        <span>{{ dollarFilter(avg) }}</span>
                    </li>
                    <li>
                        <p>Variación 24hs</p>
                        <span>{{ percentFilter(asset.changePercent24Hr) }}</span>
                    </li>
                    </ul>
                </div>
                <div class="action-section">
                    <button 
                    @click="toggleConverter"
                    class="change-button">
                    {{ 
                        fromUsd ? `UDS a ${asset.symbol}` : `${asset.symbol} a USD`
                    }}
                    </button>
                    <div class="input-section">
                    <label for="convertValue">
                        <input
                        v-model="convertValue"
                        id="convertValue"
                        type="number"
                        class="input-field"
                        :placeholder="`Valor en ${fromUsd ? 'USD' : asset.symbol}`"
                        />
                    </label>
                    </div>
                    <span class="result-text">  {{   convertResult  }}  {{ fromUsd ? asset.symbol : 'USD' }}</span>
                </div>
            </div>

            <line-chart 
                :colors="['blue']" 
                :min="min" 
                :max="max" 
                :data="history.map(h => [h.date, parseFloat(h.priceUsd).toFixed(2)])" 
                class="grafica"
            />

            <h3 class="offers-title">Mejores Ofertas de Cambio</h3>
            <table class="offers-table">
                <tr v-for="m in markets" :key="`${m.exchangeId}-${m.priceUsd}`" class="offers-row">
                    <td class="exchange-id">
                        <b>{{ m.exchangeId }}</b>
                    </td>
                    <td class="price">{{ dollarFilter(m.priceUsd) }}</td>
                    <td class="symbol">{{ m.baseSymbol }} / {{ m.quoteSymbol }}</td>
                    <td class="action-cell">
                        <span v-if="m.errorMessages" class="error-message">Datos no disponibles</span>
                        <px-button 
                            :is-loading="m.isLoading"
                            v-else-if="!m.url"
                            @custom-click="getWebSite(m)">
                            <slot>Obtener Link</slot>
                        </px-button>
                        <a v-else href="" class="link-button">{{ m.url }}</a>
                    </td>
                </tr>
            </table>

        </template>
    </div>
</template>

<script>

import PxButton from '@/components/PxButton.vue';
import api from '@/api'
import { dollarFilter, percentFilter } from '../filters'
import  BounceLoader from 'vue-spinner/src/BounceLoader';

export default {
    name:'CoinDetail',

    components: {
        PxButton,
        BounceLoader
    },


    data() {
        return {
            isLoading: false,
            asset: {},
            history: [],
            markets: [],
            fromUsd: true,
            convertValue: null,
        }
    },

    computed: {
        min () {
            return Math.min(
                ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
            )
        },

        max () {
            return Math.max(
                ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
            )
        },

        avg () {
            return Math.abs(
                ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
            )
        },

        convertResult () {
            if (!this.convertValue){
                return 0
            }

            const result = this.fromUsd ? this.convertValue / this.asset.priceUsd : 
            this.convertValue * this.asset.priceUsd

            return result.toFixed(4)
        },
    },

    watch: {
        $route () {
            this.getCoin()
        }
    },

    created() {
        this.getCoin()
    },

    methods: {
        toggleConverter() {
            this.fromUsd = !this.fromUsd
        },

        getWebSite (exchange) {
            exchange.isLoading = true
            setTimeout(() => {
                return api.getExchange(exchange.exchangeId)
                    .then(res => {
                        exchange.url = res.exchangeUrl
                    }).catch(error => {
                        console.error("Error al obtener el enlace:", error);
                        exchange.errorMessages = true;
                    })
                    .finally(() => {
                    exchange.isLoading = false;
                    });
            }, 2000);
        },

        getCoin () {
            const id = this.$route.params.id
            this.isLoading = true

            Promise.all([
                api.getAsset(id),
                api.getAssetHistory(id),
                api.getMarkets(id), 
            ])
              .then(([asset, history, markets]) => {
                if (asset && history) {
                    this.asset = asset;
                    this.history = history;
                    this.markets = markets;
                } else {
                    console.error("Error al cargar el asset o history:", asset, history);
                }
              })
              .finally(() => {
                    setTimeout(() => {
                        this.isLoading = false; 
                    }, 200); 
                });
        }
    },

    setup() {
        return {
            dollarFilter,
            percentFilter
        }
    }
}

</script>

<style scoped>

    .container {
        display: flex;
        flex-direction: column;
        margin-top: 40px;
        align-items: center;
    }

    .content-wrapper {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-around;
        text-align: center;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }

    .image-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    }

    .avatar {
    width: 80px;
    height: 80px;
    margin-right: 20px;
    }

    h1 {
    font-size: 3rem;
    }

    .subtitle {
    margin-right: 10px;
    color: #6b7280; /* Gray color */
    }

    .info-section {
    margin: 20px 0;
    }

    .info-list {
    list-style: none;
    padding: 0;
    margin: 0;
    }

    .info-list li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    text-transform: uppercase;
    color: #6b7280; /* Gray color */
    }

    .action-section {
    margin-top: 20px;
    text-align: center;
    }

    .change-button {
        background-color: #38a169; /* Green */
        color: white;
        font-weight: bold;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        border: none;
        transition: background-color 0.3s;
    }

    .change-button:hover {
        background-color: #2f855a; /* Darker green */
    }

    .input-section {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .input-field {
        text-align: center;
        background-color: white;
        border: 1px solid #d1d5db; /* Light gray */
        border-radius: 8px;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
    }

    .result-text {
    font-size: 1.25rem;
    margin-top: 20px;
    }
    
    p {
        font-weight: bold;
        color: #717379;
        margin-right: 100px;
    }

    span{
        font-weight: bold;
        color: #000;
    }

    .grafica {
        width: 80vw; 
        max-width: 90vw; 
        height: 400px;
        margin-top: 120px;
        margin-bottom: 120px;
    }

    .offers-title {
    font-size: 2rem;
    font-weight: bold;
    margin: 20px 0;
    color: #333; /* Color del texto */
    text-align: center; /* Centrar el título */
    }

    .offers-table {
        width: 100%;
        border-collapse: collapse; /* Colapsar bordes de la tabla */
        margin-bottom: 40px; /* Espacio inferior */
    }

    .offers-row {
        border-bottom: 1px solid #d1d5db; /* Línea separadora entre filas */
    }

    .offers-row:hover {
        background-color: #f7fafc; /* Color de fondo al pasar el mouse */
    }

    .exchange-id,
    .price,
    .symbol {
        padding: 10px; /* Espacio interno */
        text-align: left; /* Alinear texto a la izquierda */
    }

    .price {
        font-weight: bold; /* Resaltar el precio */
    }

    .action-cell {
        text-align: center; /* Centrar el contenido de la celda de acción */
    }

    .exchange-button:hover {
        background-color: #2f855a; /* Color más oscuro al pasar el mouse */
    }

    .link-button {
        margin-left: 10px; /* Espacio a la izquierda del enlace */
        text-decoration: underline; /* Subrayar el enlace */
        color: #38a169; /* Color del enlace */
        cursor: pointer; /* Cambiar el cursor al pasar por encima */
    }

    .error-message {
        color: #e74c3c; /* Rojo para indicar un error */
        font-weight: bold; /* Negrita para hacer que el mensaje resalte */
        font-size: 0.9rem; /* Tamaño de fuente más pequeño para que no domine */
        display: block; /* Hace que el span ocupe toda la línea dentro de la celda */
        padding: 5px 10px; /* Espaciado interno */
        background-color: #fce4e4; /* Fondo suave en rojo claro */
        border-radius: 5px; /* Bordes redondeados */
        margin: 5px 0; /* Margen superior e inferior */
        text-align: center; /* Centrar el texto */
    }

</style>
