// src/routes/ventasRoutes.js
const { obtenerDatosVentas } = require('../controllers/ventasController');
const express = require('express');
const router = express.Router();


router.get('/ventas', async (req, res) => {
  try {
    const datos = await obtenerDatosVentas();
    res.json(datos); // Enviar resultados como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

module.exports = router;