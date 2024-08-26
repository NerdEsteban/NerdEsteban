<template>
    <div class="container">
        <h1>Error</h1>
        <p class="error-message">Lo sentimos, ha ocurrido un error. Por favor, vuelve a intentar más tarde.</p>
        <RouterLink to="/" class="back-link">Volver a la página de Inicio</RouterLink>
    </div>
</template>

<style scoped>
.container {
    max-width: 600px;
    margin: 10vh auto; 
    padding: 20px; 
    background-color: #ffdddd;
    border-radius: 8px; 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
    text-align: center; 
}

h1 {
    font-size: 2.5rem;
    color: #e74c3c; 
    margin-bottom: 20px; 
}

.error-message {
    font-size: 1.2rem; 
    color: #333; 
    margin-bottom: 20px; 
}

.back-link {
    display: inline-block; 
    margin-top: 10px;
    padding: 10px 15px; 
    background-color: #2dcc8a; 
    color: white; 
    border-radius: 5px; 
    text-decoration: none; 
    transition: background-color 0.3s; 
}

.back-link:hover {
    background-color: #02990e; 
}
</style>
