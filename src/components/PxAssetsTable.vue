<template>
<div class="tabla">
    <table>
      <thead>
        <tr class="cabecera">
          <th></th>
          <th :class="{ up: this.sortOrder === -1, down: this.sortOrder === 1}">
            <span 
            class="underline"
            @click="changeSortOrder">Ranking</span>
          </th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cap. de mercados</th>
          <th>Variación 24hs</th>
          <th>
            <input 
              id="filter"
              placeholder="Buscar..."
              type="text" 
              v-model="filter"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="a in filteredAssets" :key="a.id">
          <td>
            <img :src="`https://assets.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`" :alt="a.name">
          </td>
          <td>
            <b>#{{  a.rank }}</b>
          </td>
          <td>
            <RouterLink :to="{ name: 'coin-detail', params: { id: a.id } }" class="enlace">
              {{ a.name }}
            </RouterLink>
            <small class="enlace-symbol"> {{ a.symbol }}</small>
          </td>
          <td>{{ dollarFilter(a.priceUsd)  }}</td>
          <td>{{  dollarFilter(a.marketCapUsd) }}</td>
          <td :class="a.changePercent24Hr.includes('-') ? 'red' : 'green'">
            {{ percentFilter(a.changePercent24Hr) }}'
          </td>
          <px-button @custom-click="goToCoin(a.id)">
            <span>Detalle</span>
          </px-button>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  
  import PxButton from './PxButton.vue';
  import { dollarFilter, percentFilter } from '../filters'

  export default {

    name: 'PxAssetsTable',

    components: { PxButton },

    props: {
      assets: {
        type: Array,
        default: () => []
      }
    },

    methods: {
      goToCoin (id) {
        this.$router.push({ name: 'coin-detail', params: { id } })
      },

      changeSortOrder () {
        this.sortOrder = this.sortOrder === 1 ? -1 : 1
      }
    },

    setup() {
      return {
        dollarFilter,
        percentFilter
      }
    },

    data() {
      return {
        filter: '',
        sortOrder: -1,
      }
    },

    computed: {
      filteredAssets() {
        const altOrder = this.sortOrder === 1 ? -1 : 1

        return this.assets
        .filter(a => 
          a.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
          a.name.toLowerCase().includes(this.filter.toLowerCase()) 
        )
        .sort((a, b) => {
          if (parseInt(a.rank > parseInt(b.rank))){
            return this.sortOrder
          }

          return altOrder
        })
      }
    }
  }
</script>

<style scoped>

.tabla {
  display: flex;
  justify-content: center;
  margin-top: 5vh;
}

table {
  width: 80vw;
  border-collapse: collapse;
}

.tabla tbody tr {
    transition: background-color 0.3s ease;
}

.tabla tbody tr:hover {
    background-color: #fbfcdc;
}

.tabla th, .tabla td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.tabla th, .tabla td {
  text-align: center; /* Alinea todo al centro */
  padding: 12px;
  border-bottom: 1px solid #ddd; /* Opcional, para agregar una línea divisoria */
}

th,
td {
  padding: 8px;
  text-align: left;
  text-align: center;
}

th {
  background-color: #f3f3f3;
}

tr {
  border-bottom: 1px solid rgba(212, 212, 212, 0.5);
}

.cabecera {
  border-bottom: 1px solid rgba(185, 185, 185, 0.8);
}

tr td img {
  width: 30px;
  height: 30px;
}

.red {
  color: red;
}

.green {
  color: #10d410
}

.enlace {
    color: #22a722; /* Color azul similar a un enlace */
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.3s ease;
}

.enlace:hover {
    color: #0056b3; /* Color más oscuro en hover */
    text-decoration: underline;
}

.enlace-symbol {
    color: #6c757d; /* Gris para menor énfasis */
    font-size: 0.875rem; /* Tamaño de texto más pequeño */
    margin-left: 0.5rem; /* Espacio a la izquierda del nombre */
    vertical-align: middle; /* Alineación vertical con el nombre */
}

.cabecera th input[type="text"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  font-size: 14px;
}

.cabecera th input[type="text"]:focus {
  outline: none;
  border-color: #22a722; 
  box-shadow: 0 0 5px rgba(34, 167, 34, 0.5);
}

.cabecera th input[type="text"]::placeholder {
  color: #999;
  font-style: italic;
}

.underline {
  color: #22a722; /* Usa tu color base */
  text-decoration: none;
  cursor: pointer;
  font-weight: bold;
}

.underline:hover {
  text-decoration: underline;
  color: #1b7a1b; /* Un tono más oscuro para el hover */
}

.underline:active {
  color: #145214; /* Aún más oscuro cuando está activo */
}

.underline:focus {
  outline: none;
  box-shadow: 0 0 2px 2px rgba(34, 167, 34, 0.5);
}

.up::before {
  content: '☝';
}

.down::before {
  content: '👇';
}
</style>