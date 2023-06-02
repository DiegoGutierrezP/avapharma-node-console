import { basketData } from "../db/basket.data.js";
import Basket from "../models/basket.js"
import { actualizarInventario, infoInventario, reservarProducto } from "./inventarioService.js";
import { infoProducto } from "./productoService.js"
import { infoSucursal } from "./sucursalService.js";


export const addProductCarrito = (idProduct,dni,idSucur) => {
    const producto = infoProducto(idProduct)
    const inventario = infoInventario(idProduct,idSucur)

    if(inventario.cantAsignada > 0){

        let existItem = false;
        ///verficamos si existe un registro en el carrito con el mismo producto, dni y sucursal
        basketData.find((b,idx) => {
            if(b.productoId ===  idProduct && b.dni === dni && b.sucursalId === idSucur){
                basketData[idx] = {
                    ...b,
                    cantidad: b.cantidad + 1
                }
                existItem = true;
            }
        })

        if(!existItem){
            const basket = new Basket(idProduct,dni,idSucur,producto.nombre,producto.precio);
            basketData.push(basket);
        }

        reservarProducto(idProduct,idSucur);
        return true;
    }
    return false;
    
}

export const listCarrito = (dni) => {
    /* let listado = '';
    console.log('\n');
    let totalCarrito = 0;
    basketData.filter(b => b.dni === dni).forEach((b,i) => {
        const precioItem = b.precioProducto * b.cantidad;
        totalCarrito += precioItem;
        const sucursal = infoSucursal(b.sucursalId);

        const idx = `${i + 1}.`.red;
        const precioColor = `S/ ${precioItem.toFixed(2)}`.bgBlue.bold;
        const cantidad = `(${b.cantidad})`.bgYellow;
        listado += `${idx}. ${b.nombreProducto} | ${cantidad} | ${precioColor} |  ${sucursal.nombre} \n`;
    })
    if(totalCarrito > 0)  listado += `\n TOTAL: S/ ${totalCarrito.toFixed(2)}`
    
    console.log(totalCarrito > 0 ? listado : 'No tiene productos en el carrito'.bold);
    return totalCarrito; */
    let listado = [];
    console.log('\n');
    let totalCarrito = 0;
    basketData.filter(b => b.dni === dni).forEach((b,i) => {
        const precioItem = b.precioProducto * b.cantidad;
        totalCarrito += precioItem;
        const sucursal = infoSucursal(b.sucursalId);

        listado.push({
            producto: b.nombreProducto,
            cantidad : b.cantidad,
            precio: precioItem.toFixed(2),
            sucursal: sucursal.nombre
        })
    })
    listado.length > 0 ? console.table(listado ) : console.log('No tiene productos en el carrito');
    return totalCarrito;
}


export const comprarCarrito = (dni) => {
    const carrito = basketData.filter(b => b.dni === dni);

    carrito.forEach(c => {
        actualizarInventario(c.cantidad,c.productoId,c.sucursalId);
    })

    

    basketData.forEach((b,idx) => {
        if(b.dni === dni){
            basketData.splice(idx,1);
        }
    })

    console.log('\n El carrito ha sido comprado, el stock de los productos ha sido actualizada'.bgGreen);
}