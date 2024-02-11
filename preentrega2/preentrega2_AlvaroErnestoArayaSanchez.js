//No se puede trabajar en console.log, puesto que todo es petición al usuario.
//constructor de usuarios junto a su array de almacenamiento.
class UserPassword{
    constructor(id,user,pasword){
        this.id = id;
        this.user = user;
        this.pasword = pasword;
    }
}
const USERPASSARRAY = [
    new UserPassword(1,"preentrega2","Coderhouse"),
    new UserPassword(2,"alvaroaraya726@gmail.com","Aaraya1998"),
    new UserPassword(3,"catalinanuezdonoso20@gmail.com","catdonoso98"),
]
//Array de objetos como productos
class Product{
    constructor(id,mark,name,sku,stock,image,value){
        this.id = id;
        this.mark = mark;
        this.name = name;
        this.sku= sku;
        this.stock = stock;
        this.image = image;
        this.value = value;
    }
}
const PRODUCTSARRAY = [
    new Product(1,"Logitech","Mouse Gamer G305 Ligthspeed Wireless Negro","5L3M1G8W",50,"../images/L-G305-LS.jpg",39990),
    new Product(2,"Logitech","Mouse Gamer G502 X PLUS Wireless Blanco","5L5MXPWB",150,"../images/L-G502-XP.jpg",129990),
    new Product(3,"Victus","Notebook Gamer Victus Intel i5-11400H RTX 3050 4GB","8NV5R3W1",30,"../images/V-16I5R3-NG.jpg",1079990),
    new Product(4,"Gear","Desktop Gamer Ryzen 5 5600X 8GB 240GB GTX 1650","TO10GR5G",3,"../images/T-GGEAR-RG.jpg",499990),
    new Product(5,"Logitech","Mouse Gamer G604 Lightspeed Wireless-Bluetooth Negro","5L6M2G40",1,"../images/L-G604-LS.jpg",63990),
    new Product(6,"HyperX","Teclado Gamer HyperX Alloy Elite2 Mecánico Español","1THAL2ME",32,"../images/H-ELITE2-ME.jpg",119990)
]
//Contador de intentos fallidos de inicio sesión, despues del primer error, le dira que le quedan 3 intentos
let counter = 4;
//Variable enabled sirve para los bucles, si el usuario esta bloqueado o no por multiples intentos.
let enabled = true;
//Varibale login sirve para el bucle del while, si ya inicio sesión recien podra iniciar el bucle
let login = false;
//Almacenamiento de productos para poder mostrar al usuario
let productsInfo = "";


//Funcion para recolectar los datos que el usuario entregue al sistema para intento de logeo y compara si existe el usuario o no.
function logging(){
    let getUser = prompt("Ingrese el usuario: ");
    let getPassword = prompt("Ingrese la contraseña: ");
    counter--;

    //Recorre el array para buscar coincidencias
    for (let i = 0; i < USERPASSARRAY.length; i++) {
        if (getUser === USERPASSARRAY[i].user && getPassword === USERPASSARRAY[i].pasword) {
            // Coincidencia encontrada
            login = true;
            counter = 4;
            alert("Inicio de sesión exitoso, gracias por ingresar");
            console.log("Inicio de sesión exitoso");
            return login;
        }
    }

    //No se encontraron coincidencias
    if(counter > 0){
        alert(`Usuario o contraseña incorrecta, vuelva a intentar, le quedan ${counter} intentos`);
        console.log("Usuario o contraseña incorrectos");
        login = false;
        return login;
    }else{
        alert("Se cerrara el programa por multiples intentos");
        enabled = false;
    }
}
//Funcion para agregar un nuevo usuario y que el ID incremente.
function addUser() {
    let newUser = prompt("Ingrese su nombre de usuario");
    let newPassword = prompt("Ingrese la contraseña del usuario");

    if (newUser === "" || newPassword === "") {
        alert("El usuario o contraseña no pueden estar vacíos");
        return;
    }

    // Obtener el ultimo id en el array o establece 0 si está vacío, condicionar dependiendo si tiene o no datos
    let lastId = USERPASSARRAY.length > 0 ? USERPASSARRAY[USERPASSARRAY.length - 1].id : 0;
    // Crea un nuevo objeto UserPassword con un id incrementado
    let newUserObject = new UserPassword(lastId + 1, newUser, newPassword);
    // Agrega el nuevo usuario al array
    USERPASSARRAY.push(newUserObject);
    //Alert de que se creo correctamente
    alert("Usuario creado exitosamente");
    // Imprimir el nuevo array para verificar
    console.log(USERPASSARRAY);
}

//Iterar los productos para posterior mostrar
function showProducts(){
    for (let i = 0; i < PRODUCTSARRAY.length; i++) {
        let product = PRODUCTSARRAY[i];
        productsInfo += `Opcion: ${product.id}\n`;
        productsInfo += `Nombre: ${product.name}\n`;
        productsInfo += `SKU: ${product.sku}      `;
        productsInfo += `Stock: ${product.stock}      `;
        productsInfo += `Valor: $ ${product.value}\n`;
    }
    return productsInfo;
}
//Iterar los productos para posterior mostrar
function showProductsFiltered(productArray){
    for (let i = 0; i < productArray.length; i++) {
        let product = productArray[i];
        productsInfo += `ID: ${product.id}\n`;
        productsInfo += `Nombre: ${product.name}\n`;
        productsInfo += `SKU: ${product.sku}      `;
        productsInfo += `Stock: ${product.stock}      `;
        productsInfo += `Valor: $ ${product.value}\n`;
    }
    return productsInfo;
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
            //Llamos a la funcion
            login = logging();
            //Bucle while para que inicie sesión y si se equivoca multiples veces su cuenta sera bloqueado
            while(login){
                let firstSelection = parseInt(prompt("Seleccione una de las opciones disponibles\n\nOpcion:1\nFiltrar productos\nOpcion:2\nVer todos los productos\nOpcion:3\nVolver al inicio"));
                switch(firstSelection){
                    case 1:
                        //Constante que buscara dependiendo de lo que escribe, todo pasa a minuscula pero lo muestra originalmente como estaba escrito
                        const SEARCH = (letras) => {
                            const letrasMinusculas = letras.toLowerCase();
                            return PRODUCTSARRAY.filter(item => {
                                const nombreMinusculas = item.name.toLowerCase();
                                return nombreMinusculas.includes(letrasMinusculas);
                            });
                        }
                        let filteredInput = prompt("Escriba las palabras claves del producto");
                        // Llamar a la función SEARCH con la entrada del usuario
                        let filteredProducts = SEARCH(filteredInput);
                        let funProducFilter = showProductsFiltered(filteredProducts);
                        let selectedOptionOne = parseInt(prompt(`Seleccione el ID del producto deseado o si desea volver al inicio:\n\n${showProductsFiltered(filteredProducts)}Opcion:7\nVolver al inicio`));
                        if (selectedOptionOne === 7){
                            productsInfo = "";
                            login = false;
                            console.log("Cierre de sesión");
                        }else{
                            //Validar si el ID seleccionado está en la lista de IDs de productos filtrados
                            const validOption = filteredProducts.some(product => product.id === selectedOptionOne);
                            if(validOption){
                                //Reconocer el ID del producto seleccionado
                                let selectedProduct = PRODUCTSARRAY.find(product => product.id === selectedOptionOne);
                                //Validar si el producto tiene stock o no
                                if(selectedProduct.stock >= 1){
                                    // Mostrar el mensaje con el nombre, el stock del producto y que escriba la cantidad que desea comprar
                                    let quantityToBuy = parseInt(prompt(`Has seleccionado la opción ${selectedOptionOne} - ${selectedProduct.name} con stock ${selectedProduct.stock}\n\nEscribe la cantidad deseada a comprar.`));
                                    // Validar si la cantidad es válida
                                    if (quantityToBuy >= 1 && quantityToBuy <= selectedProduct.stock){
                                        let confirmPurchase = confirm(`Desea comprar ${quantityToBuy} unidades del producto: ${selectedProduct.name}?`);
                                        if (confirmPurchase){
                                            // Actualizar el stock después de la compra
                                            selectedProduct.stock -= quantityToBuy;
                                            productsInfo = "";
                                            alert(`Compra exitosa. Has comprado ${quantityToBuy} unidades de ${selectedProduct.name}.`);
                                        }else{
                                            productsInfo = "";
                                            alert("Compra cancelada.");
                                        }
                                    }else{
                                        alert("Cantidad no válida. Por favor, ingrese una cantidad válida.");
                                    }
                                }else{
                                    productsInfo = "";
                                    alert("El producto no tiene stock disponible, seleccione otro producto");
                                }
                            }else{
                                productsInfo = "";
                                alert("Opción no válida. Por favor, seleccione una opción válida.");
                            }
                        }
                        break;
                    case 2:
                        // Validar si el usuario seleccionó una opción válida
                        showProducts();
                        let selectedOptionTwo = parseInt(prompt(`Seleccione el numero del producto deseado o si desea volver al inicio:\n\n${productsInfo}Opcion:7\nVolver al inicio`));
                        // Validar si el usuario seleccionó una opción válida
                        if (selectedOptionTwo >= 1 && selectedOptionTwo <= PRODUCTSARRAY.length+1){
                            //Validar si la opcion fue salir
                            if(selectedOptionTwo === 7){
                                productsInfo = "";
                                login = false;
                                console.log("Cierre de sesión");
                            }else{
                                //Reconocer el ID del producto seleccionado
                                let selectedProduct = PRODUCTSARRAY.find(product => product.id === selectedOptionTwo);
                                //Validar si el producto tiene stock o no
                                if(selectedProduct.stock >= 1){
                                    // Mostrar el mensaje con el nombre, el stock del producto y que escriba la cantidad que desea comprar
                                    let quantityToBuy = parseInt(prompt(`Has seleccionado la opción ${selectedOptionTwo} - ${selectedProduct.name} con stock ${selectedProduct.stock}\n\nEscribe la cantidad deseada a comprar.`));
                                    // Validar si la cantidad es válida
                                    if (quantityToBuy >= 1 && quantityToBuy <= selectedProduct.stock){
                                        let confirmPurchase = confirm(`Desea comprar ${quantityToBuy} unidades del producto: ${selectedProduct.name}?`);
                                        if (confirmPurchase){
                                            // Actualizar el stock después de la compra
                                            selectedProduct.stock -= quantityToBuy;
                                            productsInfo = "";
                                            alert(`Compra exitosa. Has comprado ${quantityToBuy} unidades de ${selectedProduct.name}.`);
                                        }else{
                                            productsInfo = "";
                                            alert("Compra cancelada.");
                                        }
                                    }else{
                                        alert("Cantidad no válida. Por favor, ingrese una cantidad válida.");
                                    }
                                }else{
                                    productsInfo = "";
                                    alert("El producto no tiene stock disponible, seleccione otro producto");
                                }
                            }
                        }else{
                            productsInfo = "";
                            alert("Opción no válida. Por favor, seleccione una opción válida.");
                        }
                        break;
                    case 3:
                        productsInfo = "";
                        login = false;
                        console.log("Cierre de sesión");
                        break;
                    default:
                        alert("¡Debe de escribir una de las opciones disponibles!");
                }
            }
            break;
        case 2:
            addUser();
            break;
        case 3:
            enabled = false;
            login = false;
            break;
        default:
            alert("¡Debe de escribir una de las opciones disponibles!");
        }
}while(enabled);
