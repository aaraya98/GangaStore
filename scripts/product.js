//Obtener datos del localStorage
const productosStock = JSON.parse(localStorage.getItem("productosStock"));
const selectedProductID = localStorage.getItem("selectedProductID");
const cartItems = JSON.parse(localStorage.getItem("cartItems"));
//Encontrar el producto seleccionado
const selectedProduct = productosStock.find(producto => producto.id == selectedProductID);

//Evento para que al comenzar muestre el producto de inmediato
document.addEventListener("DOMContentLoaded", function(){
    //Verificar si se encontró el producto
    if (selectedProduct) {
        //Llenar el HTML con los detalles del producto seleccionado
        document.querySelector('.mainimgproproduct img').src = selectedProduct.imagen;
        document.querySelector('.brandproproduct h2').textContent = selectedProduct.marca;
        document.querySelector('.nameproproduct p').textContent = selectedProduct.nombre;
        document.querySelector('.productsku span').innerHTML = `<strong>SKU:</strong> ${selectedProduct.sku}`;
        document.querySelector('.productunits span').textContent = `${selectedProduct.stock} Stock`;
        document.querySelector('.currentvalueproproduct span strong').textContent = `$ ${selectedProduct.precio}`;
        document.querySelector('.prevalueproproduct span s').textContent = `$ ${selectedProduct.precioAnterior}`;
        document.querySelector('#presentacion img').src = selectedProduct.descriptionImage;
        //También puedes llenar otras secciones del HTML si es necesario
    } else {
        //Si el producto no se encuentra, puedes mostrar un mensaje de error o redireccionar a otra página
        console.log("Producto no encontrado");
    }
});

//Incrementar las unidades que desea agregar al carrito
document.getElementById('btnincrementar').addEventListener('click', ()=>{
    let contador = document.getElementById('contador').textContent;

    if(contador < selectedProduct.stock){
        contador++;
        document.querySelector('#contador').textContent = contador;
    }
});

//Decrementar las unidades que desea agregar al carrito
document.getElementById('btndecrementar').addEventListener('click', ()=>{
    let contador = document.getElementById('contador').textContent;

    if(contador > 1){
        contador--;
        document.querySelector('#contador').textContent = contador;
    }
});

document.getElementById('addCart').addEventListener('click', () => {
    const cantidadSeleccionada = parseInt(document.getElementById('contador').textContent);
    
    //Buscar el índice del producto en cartItems
    const existingCartItemIndex = cartItems.findIndex(item => item.id == selectedProductID);

    if(existingCartItemIndex !== -1){
        //Si el producto está en cartItems, actualizar la cantidad
        cartItems[existingCartItemIndex].cantidad = cantidadSeleccionada;
        Swal.fire({
            icon: "success",
            title: "Producto actualizado al carrito de compras",
            confirmButtonText:"aceptar"
        })
    }else{
        //Si el producto no está en cartItems, buscarlo en productosStock
        const productToAdd = productosStock.find(producto => producto.id == selectedProductID);
        
        if (productToAdd){
            //Si el producto se encuentra en productosStock, agregarlo al carrito
            cartItems.push({...productToAdd, cantidad:cantidadSeleccionada});
            Swal.fire({
                icon: "success",
                title: "Producto agregado al carrito de compras",
                confirmButtonText:"aceptar"
            })
        }
    }

    // Guardar los cambios en localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
});