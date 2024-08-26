<template>
    <div class="container">
        <h1>Platzi Exchange</h1>
        <p>Proyecto para obtener las cotizaciones de las criptomonedas más importantes a través de la API REST de Coincap.</p>
        <br>
        <p>Este proyecto es utilizado en el curso de Vue.js Básico de Platzi.</p>
        <RouterLink to="/" class="back-link">Volver a la página de Inicio</RouterLink>
    </div>
</template>

<style scoped>
.container {
    max-width: 800px; 
    margin: 10vh auto; 
    padding: 20px; 
    background-color: #f9f9f9; 
    border-radius: 8px; 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
}

h1 {
    font-size: 2.5rem; 
    color: #0e5f0b; 
    text-align: center; 
    margin-bottom: 20px; 
}

p {
    font-size: 1.2rem; 
    color: #34495e; 
    line-height: 1.6; 
    margin-bottom: 15px; 
}

.back-link {
    display: inline-block; 
    margin-top: 20px; 
    padding: 10px 15px; 
    background-color: #2dcc8a; 
    color: white; 
    border-radius: 5px;
    text-decoration: none; 
    transition: background-color 0.3s;
}

.back-link:hover {
    background-color: #02990e; /* Color de fondo al pasar el ratón */
}
</style>
