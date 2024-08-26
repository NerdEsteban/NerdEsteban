<template>
    <div class="spinner-container">
        <bounce-loader :loading="isLoading" color="#68d391" />
        <px-assets-table v-bind:assets="assets" v-if="!isLoading" />
    </div>
</template>

<script>
    import api from '../api'
    import PxAssetsTable from "../components/PxAssetsTable.vue";
    import  BounceLoader from 'vue-spinner/src/BounceLoader';

    export default {
        name: 'Home',

        components: {
            PxAssetsTable,
            BounceLoader
        },

        data () {
            return {
                isLoading: false,
                assets: [],
            }
        },
        created() {
            this.isLoading = true;

            setTimeout(() => {
                api.getAssets()
                    .then(assets => {
                        this.assets = assets;
                    })
                    .catch(error => {
                        console.error("Error fetching assets:", error);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            }, 800); // Simula un retraso de 2 segundos
        }
    }
</script>

<style>

.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* Esto asegura que el spinner esté centrado verticalmente */
}
</style>