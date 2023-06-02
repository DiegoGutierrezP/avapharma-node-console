
import inquirer from "inquirer";
import {clientesData} from "../db/index.js"
import { leerInput } from "../helpers/inquirer.js";
import Cliente from "../models/cliente.js";

export const createCliente = async () => {
    const dni = await leerInput('Dni: ','dni',(value) => {
        if(value.length !== 8){
            return 'Porfavor ingrese un dni valido'
        }else if(clientesData.find(cli => cli.dni === value)){
            return 'El dni ya ha sido registrado'
        }
        return true;
    })
    const nombres = await leerInput('Nombres: ','nombres',(value) => {
        if(value.length === 0){
            return 'Porfavor ingrese un nombre'
        }
        return true;
    })
    const apellidos = await leerInput('Apellidos: ','apellidos',(value) => {
        if(value.length === 0){
            return 'Porfavor ingrese su apellidos'
        }
        return true;
    })

    const cliente = new Cliente(dni,nombres,apellidos);

    if(clientesData.find(cli => cli.dni === cliente.dni)){
        console.log('\n El dni ya ha sido registrado'.bgRed);
    }else{
        clientesData.push(cliente);
        console.log('\n Cliente registrado correctamente'.bgGreen);
    }
}



export const listCheckAuthClientes = async () => {
    console.log('\n');

    if(clientesData.length === 0){
        console.log('No tiene clientes registrados'.bold);
        return;
    }

    let choices = clientesData.map((cli,i)=>{
        const idx = `${i + 1}.`.red;
        return {
            value : `${cli.dni}`,
            name :  `${idx} ${cli.nombres} ${cli.apellidos} `,
        }
    })

    choices.push({
        value:0,
        name: `${'0.'.red} Cancelar`
    })

    const pregunta = [
        {
            type:'list',
            name: 'dni',
            message:'Iniciar sesion',
            choices
        }
    ]

    const { dni } = await inquirer.prompt(pregunta);
    
    return dni;
}