const ARRAYPRODUCTSSTRING = localStorage.getItem("productosStock");//Extraer del local los productos
const ARRAYPRODUCTSOBJECTS = JSON.parse(ARRAYPRODUCTSSTRING);//Convertir lo extraido a array de objetos
const productList = document.getElementById("productList");
const cartItemsString = localStorage.getItem("cartItems");
const cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];
const cartContainer = document.getElementById("cartContent");//Productos dentro del carrito de compras
const totalCart = document.getElementById("totalCart");//Total de los productos del carrito de compras

//Funcion para agregar al carrito el elemento
function addCart(idProduct){
    const itemExists = cartItems.find(item => item.id === idProduct);
    if(itemExists){
            itemExists.cantidad++
    }else{
        const product = ARRAYPRODUCTSOBJECTS.find(p => p.id === idProduct);
        if(product){
            cartItems.push({...product, cantidad:1});
        }
    }
    renderizarCarrito();
}


//Actualizar carrito de compras despues de una acción, puede ser agregar, eliminar o comprar
function renderizarCarrito(){
    cartContainer.innerHTML = "";
    let precioTotal = 0;
    cartItems.forEach(item =>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="text-center align-middle">${item.nombre}</td>
            <td class="text-center align-middle">${item.precio}</td>
            <td class="text-center align-middle">${item.cantidad}</td>
            <td class="text-center align-middle">${item.precio * item.cantidad}</td>
        `;
        const eliminar = document.createElement('td');
        eliminar.className = "text-center align-middle";
        const btnEliminar = document.createElement('button');
        btnEliminar.className = "btn";
        btnEliminar.innerHTML = `<i class="fas fa-trash"></i>`;
        btnEliminar.addEventListener('click', () => eliminarDelCarrito(item.id));
        eliminar.appendChild(btnEliminar);
        // Append the eliminar cell to the tr
        tr.appendChild(eliminar);
        // Append the tr to the cart container
        cartContainer.appendChild(tr);
        precioTotal += item.precio * item.cantidad;
    });
    totalCart.innerHTML = `
        <tr>
            <td colspan="3"></td>
            <td>Total General</td>
            <td id="precioTotal">$ ${precioTotal}</td>
        </tr>
    `
}

//Evento para poder agregar al carrito con el boton de agregar carrito
productList.addEventListener('click',function(evento){
    if(evento.target.classList.contains('cartplus')){
            const idProducto = parseInt(evento.target.getAttribute('id'));
            addCart(idProducto);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            Swal.fire({
                icon: "success",
                title: "Producto agregado al carrito de compras",
                confirmButtonText:"aceptar"
            })
    }
});

//eliminar el producto del carrito
function eliminarDelCarrito(idProducto){
    const indice = cartItems.findIndex(item => item.id === idProducto);
    if(indice !== -1){
        cartItems.splice(indice, 1);
        renderizarCarrito();
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
}

//Darle la función al boton de confirmar compra
document.getElementById('payCart').addEventListener('click', ()=>{
    window.location.href = './shoppingcart.html'
});