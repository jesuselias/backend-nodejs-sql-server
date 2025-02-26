// index.js
require('dotenv').config();
const express = require('express');
const ventasRouters = require('./src/routes/ventasRouters');
const { obtenerDatosVentas } = require('./src/controllers/ventasController');
const { procesarDatos } = require('./src/utils/procesarDatos');

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint para obtener los datos
app.use('/api', ventasRouters);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Función para ejecutar el análisis de datos
async function ejecutarAnalisis() {
    const datos = await obtenerDatosVentas();
    procesarDatos(datos);
  }

// Ejecutar el análisis al iniciar la aplicación
ejecutarAnalisis();