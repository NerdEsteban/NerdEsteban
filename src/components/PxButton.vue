<template>
    <div class="fila">
        <button v-on:click="buttonClick" :disabled="isLoading">
            <beat-loader  :loading="isLoading" :color="'#68d391'" :size="8"/>
            <p v-show="!isLoading">
                <slot></slot>
            </p>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'PxButton',

        props: {
            isLoading: {
                type: Boolean,
                default: false
            }
        },

        methods: {
            buttonClick() {
                this.$emit('custom-click');
            }
        }
    }

</script>

<style scoped>

    button {
        background-color: #22a722;
        margin-top: 10px;
        color: #ffffff;
        padding: 10px 20px; 
        font-size: 16px; 
        font-weight: bold; 
        border: none; 
        border-radius: 5px; 
        cursor: pointer; 
        transition: background-color 0.3s ease, transform 0.2s ease;
        position: relative; 
    }


    button:hover {
        background-color: #1a8b1a; 
        transform: translateY(-2px); 
    }


    button:active {
        background-color: #147214; 
        transform: translateY(0); 
    }

    button:disabled {
        background-color: #cccccc; 
        cursor: not-allowed; 
        opacity: 0.6; 
    }

</style>