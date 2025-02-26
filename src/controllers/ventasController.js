const { consultaDetalleDeVentas } = require('../services/ventasService');

const obtenerDatosVentas = async () => {
    try {
        const datos = await consultaDetalleDeVentas(30);
        return datos;
    } catch (error) {
        console.error('Error al obtener datos de ventas:', error);
        return [];
    }
};

// Función para manejar la solicitud HTTP
const obtenerDatosVentasHandler = async (req, res) => {
    try {
        const datos = await obtenerDatosVentas();
        res.status(200).json(datos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de ventas' });
    }
};

module.exports = { obtenerDatosVentas, obtenerDatosVentasHandler };