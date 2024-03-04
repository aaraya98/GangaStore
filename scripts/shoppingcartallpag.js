const ARRAYPRODUCTSSTRING = localStorage.getItem("productosStock");//Extraer del local los productos
const ARRAYPRODUCTSOBJECTS = JSON.parse(ARRAYPRODUCTSSTRING);//Convertir lo extraido a array de objetos
const cartItems = [];//Guardara los productos para despues mostrarlos en el carrito popup
const cartContainer = document.getElementById("cartContent");//Productos dentro del carrito de compras
const totalCart = document.getElementById("totalCart");//Total de los productos del carrito de compras


//Comprobar si el usuario tiene guardado al en el carrito
window.addEventListener('load', function(){
    if(localStorage.getItem('cartItems')){
        let cart = localStorage.getItem("cartItems");
        let cartItem = JSON.parse(cart);
        if(cartItem.length > 0){
            //Actualizar carrito de compras despues de una acción, puede ser agregar, eliminar o comprar
            function renderizarCarrito(){
                cartContainer.innerHTML = "";
                let precioTotal = 0;
                cartItem.forEach(item =>{
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
            //eliminar el producto del carrito
            function eliminarDelCarrito(idProducto){
                const indice = cartItem.findIndex(item => item.id === idProducto);
                if(indice !== -1){
                    cartItem.splice(indice, 1);
                    localStorage.setItem('cartItems', JSON.stringify(cartItem));
                    renderizarCarrito();
                }
            }
            //Compra realizada al darle click al boton de confirmar compra
            function realizarCompra(){
                let precioTotalPagado = document.getElementById("precioTotal").innerText;
                if(precioTotalPagado === "$ 0"){
                    alert(`El carrito esta vacio`);
                }else{
                    alert(`compra finalizada ${precioTotalPagado}`);
                    cartItem.length = 0;
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    renderizarCarrito();
                }
            }
            //Darle la función al boton de confirmar compra
            document.getElementById('payCart').addEventListener('click',realizarCompra);
            renderizarCarrito();
        }
    }
});
