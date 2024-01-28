//No se puede trabajar en console.log, puesto que todo es petición al usuario.
//Asignamos las variables, donde se simula el user y password se sacan de la BD.
const USER = "preentrega1";
const PASSWORD = "Coderhouse";
//Se crean en let puesto que el usuario los debe de llenar y en const no se puede
let newUser;
let newPassword;
let counter = 4;
//Variable enabled sirve para los bucles, si el usuario puede logearse o no.
let enabled = false;
//Varibale sirve para el bucle del while, si ya inicio sesión recien podra iniciar el bucle
let login = false;
//Variable para termino por cantidad deseada a comprar
let leave = false;
//Variables con productos guardados
let placaMadre = 15;
let memoriaRam = 7;
let tarjetaGrafica =9;
let procesador = 0;

//Funcion para recolectar los datos que el usuario entregue al sistema para intento de logeo.
function logging(){
    let getUser = prompt("Ingrese el usuario: ");
    let getPassword = prompt("Ingrese la contraseña: ");
    counter--;
    return [getUser, getPassword];
}

//Bienvenida al programa
alert("Bienvenido a GangaStore, tu tienda ideal para compra de Hardware, recuerde que para comprar, primero debe de iniciar sesión");

//Bucle do while para comenzar a interactuar con el usuario
do{
    //Solicitud de opciones
    let select = parseInt(prompt("Escriba 1 si desea Iniciar Sesión.\nEscriba 2 si desea Crear Cuenta.\nEscriba 3 si desea salir del programa."));
    //Condicional por opciones
    switch(select){
        case 1:
            //Bucle while para que inicie sesión y si se equivoca multiples veces su cuenta sera bloqueada
            while(enabled == false){
                let [getUser, getPassword] = logging();
                if((USER === getUser && PASSWORD === getPassword) || (newUser === getUser && newPassword === getPassword)){
                    login = true;
                    enabled = true;
                    alert("Gracias por iniciar sesión");
                    break;
                }else{
                    if(counter === 0){
                        enabled = false;
                        alert("Su cuenta fue bloqueada por multiples intentos, se saldra el programa y deberá de esperar 15 minutos para volver a iniciar sesión");
                    }else{
                        alert("Usuario o contraseña incorrecta, vuelva a intentar, le quedan " + counter + " intentos");
                    }
                }
            }
            break;
        case 2:
            newUser = prompt("Ingrese su nombre de usuario");
            newPassword = prompt("Ingrese la contraseña del usuario");
            while(newUser === "" || newPassword === ""){
                alert("El usuario o contraseña no pueden estar vacios");
                newUser = prompt("Ingrese su nombre de usuario");
                newPassword = prompt("Ingrese la contraseña del usuario");
            }
            break;
        case 3:
            enabled = true;
            login = false;
            break;
        default:
            alert("¡Debe de escribir una de las opciones disponibles!");
        }
}while(enabled == false){
    while(login){
        let product = parseInt(prompt("Stock online:\n\nProducto          Cantidad\n\nPlaca Madre          "+placaMadre+"\nMemoria ram         "+memoriaRam+"\nTarjeta grafica        "+tarjetaGrafica+"\nProcesador             "+procesador+"\n\nSelecciona el producto deseado como l placa madre, 2 memoria ram, 3 tarjeta grafica, 4 procesador o 5 para cerrar sesión"));

        switch(product){
            case 1:
                if(placaMadre === 0){
                    alert("Actualmente no hay Stock, seleccione otra opción");
                }else{
                    while(leave == false){
                        let quantity = parseInt(prompt("¿Cual es la cantidad que desea comprar?"));
                        if(quantity >= 1 && quantity <= placaMadre){
                            leave = true;
                            placaMadre -= quantity;
                            alert("Gracias por comprar "+quantity+" placa madre");
                        }else if(quantity <= 0 || quantity > placaMadre){
                            alert("La cantidad no puede ser negativo, mayor al stock o 0");
                        }else{
                            alert("La cantidad ingresada no es valida, vuelva a intentar");
                        }
                    }
                }
                break;
            
            case 2:
                if(memoriaRam === 0){
                    alert("Actualmente no hay Stock, seleccione otra opción");
                }else{
                    while(leave == false){
                        let quantity = parseInt(prompt("¿Cual es la cantidad que desea comprar?"));
                        if(quantity >= 1 && quantity <= memoriaRam){
                            leave = true;
                            memoriaRam -= quantity;
                            alert("Gracias por comprar "+quantity+" memoria ram");
                        }else if(quantity <= 0 || quantity > memoriaRam){
                            alert("La cantidad no puede ser negativo, mayor al stock o 0");
                        }else{
                            alert("La cantidad ingresada no es valida, vuelva a intentar");
                        }
                    }
                }
                break;

            case 3:
                if(tarjetaGrafica === 0){
                    alert("Actualmente no hay Stock, seleccione otra opción");
                }else{
                    while(leave == false){
                        let quantity = parseInt(prompt("¿Cual es la cantidad que desea comprar?"));
                        if(quantity >= 1 && quantity <= tarjetaGrafica){
                            leave = true;
                            tarjetaGrafica -= quantity;
                            alert("Gracias por comprar "+quantity+" tarjeta grafica");
                        }else if(quantity <= 0 || quantity > tarjetaGrafica){
                            alert("La cantidad no puede ser negativo, mayor al stock o 0");
                        }else{
                            alert("La cantidad ingresada no es valida, vuelva a intentar");
                        }
                    }
                }
                break;
            
            case 4:
                if(procesador === 0){
                    alert("Actualmente no hay Stock, seleccione otra opción");
                }else{
                    while(leave == false){
                        let quantity = parseInt(prompt("¿Cual es la cantidad que desea comprar?"));
                        if(quantity >= 1 && quantity <= procesador){
                            leave = true;
                            procesador -= quantity;
                            alert("Gracias por comprar "+quantity+" procesador");
                        }else if(quantity <= 0 || quantity > procesador){
                            alert("La cantidad no puede ser negativo, mayor al stock o 0");
                        }else{
                            alert("La cantidad ingresada no es valida, vuelva a intentar");
                        }
                    }
                }
                break;

            case 5:
                login = false;
                break;

            default:
                alert("¡Debe escribir una de las opciones disponibles!");
        }
    }
}