import { inventariosData, sucursalesData } from "../db/index.js"

export const infoSucursal = (idSucursal) => {
    return sucursalesData.find(s => s.id === idSucursal);
}

export const GetNombresSucursalesPorProducto = (idProduct) => {
    
    const sucursales = GetSucursalesPorProducto(idProduct);

    const sucursalesNombres = sucursales.map(s => s.nombre);

    return sucursalesNombres;
}

export const GetSucursalesPorProducto = (idProduct) => {
    const inventarios = inventariosData.filter(inv => inv.productoId === idProduct && inv.cantAsignada > 0);
    const sucursales = sucursalesData.map(s => inventarios.find(inv => inv.sucursalId === s.id) ? s : null ).filter(Boolean);

    return sucursales;
}

export const GetSucursalesWithStockPorProducto = (idProduct) => {
    const inventarios = inventariosData.filter(inv => inv.productoId === idProduct && inv.cantAsignada > 0);
    const sucursalesWithStock = sucursalesData.map(s => {
        const invent = inventarios.find(inv => inv.sucursalId === s.id)
        if(invent){
            return {
                ...s,
                stock: invent.cantAsignada
            }
        }
        return null;
    }).filter(Boolean);

    return sucursalesWithStock;
}