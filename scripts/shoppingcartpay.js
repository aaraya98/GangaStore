// Function to generate HTML for a product in the shopping cart
function generateProductHTML(product) {
    const div = document.createElement("div");
    div.className = "shopproduct";
    div.id = `${product.id}`;

    const divImg = document.createElement("div");
    divImg.className = "imgshoppro";
    divImg.innerHTML = `<img src="${product.imagen}" alt="imgshopproducts">`;

    const divBrand = document.createElement("div");
    divBrand.className = "brandshoppro";
    divBrand.innerHTML = `<span><strong>${product.marca}</strong><i class="fas fa-registered"></i></span>`;

    const divName = document.createElement("div");
    divName.className = "nameshoppro";
    divName.innerHTML = `<p>${product.nombre}</p>`;

    const divBoxNumDelete = document.createElement("div");
    divBoxNumDelete.className = "boxnumdeleteshoppro";

    const divContContainer = document.createElement("div");
    divContContainer.id = "contcontainer";

    const btnDecrementar = document.createElement("button");
    btnDecrementar.id = `btndecrementar`;
    btnDecrementar.innerHTML = "-";
    btnDecrementar.addEventListener("click", () => decrementar(product.id));

    const spanContador = document.createElement("span");
    spanContador.id = `contador`;
    spanContador.innerText = product.cantidad;

    const btnIncrementar = document.createElement("button");
    btnIncrementar.id = `btnincrementar`;
    btnIncrementar.innerHTML = "+";
    btnIncrementar.addEventListener("click", () => incrementar(product.id));

    divContContainer.appendChild(btnDecrementar);
    divContContainer.appendChild(spanContador);
    divContContainer.appendChild(btnIncrementar);

    const divBtnDelete = document.createElement("div");
    divBtnDelete.className = "btndeleteshop";

    const btnDelete = document.createElement("button");
    btnDelete.type = "reset";
    btnDelete.innerHTML = "Eliminar";
    btnDelete.addEventListener("click", () => eliminarProducto(product.id));

    divBtnDelete.appendChild(btnDelete);

    const divValueCartPro = document.createElement("div");
    divValueCartPro.className = "valueshopcartpro";

    const divValueShopPro = document.createElement("div");
    divValueShopPro.className = "valueshoppro";
    divValueShopPro.innerHTML = `<span><strong>$ ${product.precio}</strong></span><span>Valor unidad</span>`;

    const divPreValueShopPro = document.createElement("div");
    divPreValueShopPro.className = "prevalueshoppro";
    divPreValueShopPro.innerHTML = `<span><s>$ ${product.precioAnterior}</s></span><span>Valor unidad antes</span>`;

    divValueCartPro.appendChild(divValueShopPro);
    divValueCartPro.appendChild(divPreValueShopPro);

    divBoxNumDelete.appendChild(divContContainer);
    divBoxNumDelete.appendChild(divBtnDelete);

    div.appendChild(divImg);
    div.appendChild(divBrand);
    div.appendChild(divName);
    div.appendChild(divBoxNumDelete);
    div.appendChild(divValueCartPro);

    return div;
}


function renderizarCarrito() {
    const shopProductsContainer = document.getElementById('shopproducts');
    if (!shopProductsContainer) {
        console.error("Shop products container not found");
        return;
    }

    shopProductsContainer.innerHTML = ""; // Clear previous content

    let precioTotal = 0;

    cartItems.forEach(item => {
        const productHTML = generateProductHTML(item);
        shopProductsContainer.appendChild(productHTML);
        precioTotal += item.precio * item.cantidad;
    });

    document.getElementById("totalPrice").innerText = `$ ${precioTotal}`;
}

function incrementar(id) {
    const item = cartItems.find(item => item.id === id);
    if (item && item.cantidad < item.stock) {
        item.cantidad++;
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
    }
}

function decrementar(id) {
    const item = cartItems.find(item => item.id === id);
    if (item && item.cantidad > 1) {
        item.cantidad--;
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
    }
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

//eliminar el producto del carrito
function eliminarProducto(idProducto){
    const indice = cartItems.findIndex(item => item.id === idProducto);
    if(indice !== -1){
        cartItems.splice(indice, 1);
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
    }
}

//Compra realizada al darle click al boton de confirmar compra
function realizarCompra(){
    let precioTotalPagado = document.getElementById("totalPrice").innerText;
    if(precioTotalPagado === "$ 0"){
        Swal.fire({
            icon: "error",
            title: "No hay productos en el carrito",
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            }
        });
    }else{
        cartItems.length = 0;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderizarCarrito();
        Swal.fire({
            icon: "success",
            title: `compra finalizada por: ${precioTotalPagado}`,
            confirmButtonText:"aceptar"
        }).then(() => {
            // Recargar la página después de cerrar el SweetAlert
            location.reload();
        });
    }
}
//Darle la función al boton de confirmar compra
document.getElementById('payProducts').addEventListener('click', realizarCompra);


// Add the following event listener to check for cart items in local storage on page load
window.addEventListener('load', function () {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(...storedCartItems);
    renderizarCarrito();
});