export default class Basket {
    constructor(productoId,dni,sucursalId,nombreProducto,precioProducto){
        this.productoId = productoId;
        this.dni = dni;
        this.sucursalId = sucursalId;
        this.cantidad = 1;
        this.nombreProducto = nombreProducto;
        this.precioProducto = precioProducto;
    }
}