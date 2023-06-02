import { inventariosData } from "../db/index.js"

export const infoInventario = (idProducto,idSucursal) => {
    return inventariosData.find(inv => inv.productoId === idProducto && inv.sucursalId === idSucursal);
}

export const reservarProducto = (idProduct,idSucur) => {
   
    inventariosData.find((inv,idx) => {
        if(inv.sucursalId === idSucur && inv.idProduct === idProduct){
            inventariosData[idx] = {
                ...inv,
                cantReservada: inv.cantReservada + 1,
                //cantAsignada: inv.cantAsignada - 1
            }
        }
    })
}

export const actualizarInventario = (cantidad,idProduct,idSucursal) => {
    inventariosData.find((inv,idx) => {
        if(inv.sucursalId === idSucursal && inv.productoId === idProduct){
            inventariosData[idx] = {
                ...inv,
                cantReservada: inv.cantReservada - cantidad,
                cantAsignada: inv.cantAsignada - cantidad
            }
        }
    })
}