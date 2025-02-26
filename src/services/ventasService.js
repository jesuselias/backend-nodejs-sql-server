const { conectarBD } = require('../config/db');

async function consultaDetalleDeVentas(dias) {
  try {
    const pool = await conectarBD();
    const result = await pool.request().query(`
      SELECT 
        V.ID_Venta, V.Total, V.Fecha, V.ID_Local,
        VD.ID_VentaDetalle, VD.Precio_Unitario, VD.Cantidad, VD.TotalLinea, VD.ID_Producto,
        P.Nombre AS ProductoNombre, P.ID_Marca, P.Costo_Unitario,
        M.Nombre AS MarcaNombre,
        L.Nombre AS LocalNombre
      FROM Venta V
      INNER JOIN VentaDetalle VD ON V.ID_Venta = VD.ID_Venta
      INNER JOIN Producto P ON VD.ID_Producto = P.ID_Producto
      INNER JOIN Marca M ON P.ID_Marca = M.ID_Marca
      INNER JOIN Local L ON V.ID_Local = L.ID_Local
      WHERE V.Fecha >=  DATEADD(DAY, -${dias}, GETDATE())
    `);
    await pool.close();
    return result.recordset;
  } catch (err) {
    console.error('Error al obtener datos:', err);
    return [];
  }
}

module.exports = { consultaDetalleDeVentas };