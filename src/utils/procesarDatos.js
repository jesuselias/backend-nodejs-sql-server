function procesarDatos(datos) {
    if (!datos.length) {
      console.log("No hay datos disponibles, por favor verifique el rango de fecha!");
      return;
    }
  
    const totalVentas = datos.reduce((acc, venta) => acc + venta.Total, 0);
    const cantidadVentas = datos.length;
    const ventaMasAlta = datos.reduce((max, venta) => venta.Total > max.Total ? venta : max, datos[0]);
    
    const productos = {};
    const locales = {};
    const marcas = {};
    const productosPorLocal = {};
  
    datos.forEach(({ ProductoNombre, TotalLinea, LocalNombre, MarcaNombre, Cantidad, Precio_Unitario, Costo_Unitario }) => {
      productos[ProductoNombre] = (productos[ProductoNombre] ||  0) + TotalLinea;
      locales[LocalNombre] = (locales[LocalNombre] || 0) + TotalLinea;
      const margen = (Cantidad * Precio_Unitario) - (Cantidad * Costo_Unitario);
      marcas[MarcaNombre] = (marcas[MarcaNombre] || 0) + margen;
        
      
        if (!productosPorLocal[LocalNombre]) {
          productosPorLocal[LocalNombre] = {};
        }
        productosPorLocal[LocalNombre][ProductoNombre] = (productosPorLocal[LocalNombre][ProductoNombre] || 0) + TotalLinea;

    });
  
    const productoMasVendido = Object.entries(productos).reduce((a, b) => (b[1] > a[1] ? b : a));
    const localMasVentas = Object.entries(locales).reduce((a, b) => (b[1] > a[1] ? b : a));
    const marcaMayorMargen = Object.entries(marcas).reduce((a, b) => (b[1] > a[1] ? b : a));

      // Obtener el producto más vendido en cada local
      const productoMasVendidoPorLocal = {};
      for (const local in productosPorLocal) {
          productoMasVendidoPorLocal[local] = Object.entries(productosPorLocal[local]).reduce((a, b) => (b[1] > a[1] ? b : a));
      }
  
    console.log("Total de ventas en 30 días:", totalVentas, "Cantidad de ventas:", cantidadVentas);
    console.log("Venta más alta:", ventaMasAlta.Fecha, "Monto:", ventaMasAlta.Total);
    console.log("Producto con mayor monto de ventas:", productoMasVendido[0]);
    console.log("Local con mayor monto de ventas:", localMasVentas[0]);
    console.log("Marca con mayor margen de ganancias:", marcaMayorMargen[0]);

    console.log("Productos más vendidos por local:");
        Object.entries(productoMasVendidoPorLocal).forEach(([local, [producto, total]]) => {
        console.log(`Local: ${local} - Producto más vendido: ${producto} con ventas de ${total}`);
    });
  }
  
  module.exports = { procesarDatos };
  
  