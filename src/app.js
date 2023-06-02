import { confirmar, pausa, principalMenu } from "./helpers/inquirer.js";
import { addProductCarrito, comprarCarrito, listCarrito } from "./services/carritoService.js";
import { createCliente, listCheckAuthClientes } from "./services/clienteService.js";
import { listCheckProductos, listProductos, listSucursalesProduct } from "./services/productoService.js";


const main = async () => {
    let opt = "";
    let auth = false;//almacenamos dni

    do{
        opt = await principalMenu(auth);

        switch (opt) {
            case 1:
                //solo vista
                listProductos();
                break;
            case 2:
                await createCliente();
                break;
            case 3:
                const dni = await listCheckAuthClientes();
                auth = dni;
                break;
            case 4:
                const idProduct = await listCheckProductos();
                if(idProduct){
                    const idSucur = await listSucursalesProduct(idProduct);
                    if(idSucur){
                        const added = addProductCarrito(idProduct,auth,idSucur)
                        if(!added){
                            console.log('Prodcuto sin stock'.bgRed)
                        }
                    }
                }
                
                break;
            case 5:
                const totalCarrito = listCarrito(auth);
                if(totalCarrito > 0){
                    const comprar = await confirmar('Comprar Carrito?')
                    if(comprar){
                        comprarCarrito(auth);
                    }
                }
                break;
            case 10://cerrar sesion
                auth = false;
                break;
            default:
                break;
        }

        await pausa();
    }while(opt != 0)

    
}

main();