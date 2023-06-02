import colors from 'colors';
import inquirer from 'inquirer';

const opsGeneral = [
    {
        type:'list',
        name:'opcion',
        message:'¿Que desea hacer?',
        choices:[
            {
                value:1,
                name:`${'1.'.green} Ver Productos`
            },
            {
                value:2,
                name:`${'2.'.green} Crear Cliente`
            },
            {
                value:3,
                name:`${'3.'.green} Inciar Sesion`
            },
            {
                value:0,
                name:`${'0.'.green} Salir`
            },
        ]
    }
]

const opsAuth = [
    {
        type:'list',
        name:'opcion',
        message:'¿Que desea hacer?',
        choices:[
            {
                value:4,
                name:`${'1.'.green} Ver Productos`
            },
            {
                value:5,
                name:`${'2.'.green} Ver Carrito`
            },
            {
                value:10,
                name:`${'0.'.green} Salir`
            },
        ]
    }
]

const principalMenu = async (auth = false)=>{
    console.clear();
    console.log('=============================='.green);
    console.log('       A V A P H A R M A      '.bold);
    console.log('==============================\n'.green);

    const { opcion } = await inquirer.prompt(!auth ? opsGeneral : opsAuth);

    return opcion;
}

const pausa = async ()=>{

    console.log('\n')
    await inquirer.prompt([{
        type:'input',
        name:'enter',
        message:`Presione ${'ENTER'.blue} para continuar`,
    }]);

}

const leerInput = async(message,name,validate)=>{
    const question = [
        {
            type:'input',
            name,
            message,
            validate
        }
    ]
    const input = await inquirer.prompt(question);
    return input[name];
}


const confirmar = async (message)=>{
    console.log('\n')
    const {ok} = await inquirer.prompt([{
        type:'confirm',
        name:'ok',
        message,
    }]);
    return ok;
}



export {
    principalMenu,
    pausa,
    confirmar,
    leerInput
}
