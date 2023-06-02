import inquirer from "inquirer";
import { productosData,inventariosData, sucursalesData } from "../db/index.js";
import { GetNombresSucursalesPorProducto, GetSucursalesPorProducto, GetSucursalesWithStockPorProducto } from "./sucursalService.js";

export const infoProducto = (idProduct) => {
    return productosData.find(p => p.id === idProduct);
}

export const listProductos = () => {
    let listado = '';
    console.log('\n');
    productosData.forEach((p,i) => {

        const sucursalesNombres = GetNombresSucursalesPorProducto(p.id);

        const idx = `${i + 1}.`.red;
        const precio = `S/ ${p.precio}`.bgBlue.bold;
        const dispSucursales = 'Disponible en:'.bgWhite + ` ${sucursalesNombres.join(' | ')}`;
        listado += `${idx}. ${p.nombre} -  ${precio} \n  ${dispSucursales} \n`;
    })
    console.log(productosData.length > 0 ? listado : 'No hay productos registrados'.bold);
}

export const listCheckProductos = async () => {
    console.log('\n');
    let choices = productosData.map((product,i)=>{
        const idx = `${i + 1}.`.red;
        const precio = `S/ ${product.precio}`.bgBlue.bold;
        return {
            value : `${product.id}`,
            name :  `${idx} ${product.nombre} -  ${precio}`,
            checked : false
        }
    })

    const pregunta = [
        {
            type:'list',
            name: 'id',
            message:'Nuestro Productos ',
            choices
        }
    ]

    const { id } = await inquirer.prompt(pregunta);
    
    return id;
}

export const listSucursalesProduct = async (idProduct) => {
    //const sucursales = GetSucursalesPorProducto(idProduct);
    const sucursales = GetSucursalesWithStockPorProducto(idProduct);

    if(sucursales.length === 0){
        console.log('Producto sin stock'.bgRed);
        return;
    } 

    let choices = sucursales.map((sucur,i)=>{
        const idx = `${i + 1}.`.red;
        return {
            value : `${sucur.id}`,
            name :  `${idx} ${sucur.nombre} | Stock: ${sucur.stock}`,
            checked : false
        }
    })

    choices.push({
        value:0,
        name: `${'X.'.red} Regresar`
    })

    const pregunta = [
        {
            type:'list',
            name: 'id',
            message:'Escoja la sucursal de recojo',
            choices
        }
    ]

    const { id } = await inquirer.prompt(pregunta);
    return id;
}