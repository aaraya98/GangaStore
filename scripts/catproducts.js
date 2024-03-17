//Constructor de productos
class Producto{
    constructor(id, marca, nombre, sku, stock, imagen, descriptionImage, precio, precioAnterior){
        this.id = id;
        this.marca = marca;
        this.nombre = nombre;
        this.sku = sku;
        this.stock = stock;
        this.imagen = imagen;
        this.descriptionImage = descriptionImage;
        this.precio = precio;
        this.precioAnterior = precioAnterior;
    };
};

//Array de objetos de los productos
const PRODUCTOSARRAY = [
    new Producto(1, "Logitech", "Mouse Gamer G305 Ligthspeed Wireless Negro", "5L3M1G8W", 150, "../images/L-G305-LS.jpg", "../images/descripcion-mouse-lg305.jpg", 39000, 40990),
    new Producto(2, "Logitech", "Mouse Gamer G502 X PLUS Wireless Blanco", "5L5MXPWB", 14, "../images/L-G502-XP.jpg", "../images/descripcion-mouse-lg502.jpg", 129990, 179990),
    new Producto(3, "Victus", "Notebook Gamer Victus Intel i5-11400H NVIDIA RTX 3050 4GB 16.1\" FHD 60Hz 8GB RAM 256GB SSD Windows 11 16-d0500la Performance Blue", "8NV5R3W1", 20, "../images/V-16I5R3-NG.jpg", "../images/descripcion-notebook-victus.jpg", 1079990, 1349990),
    new Producto(4, "Gear", "Desktop Gamer Red Demon AMD Ryzen 5 5600X 8GB 240GB SSD NVIDIA PH-GTX 1650 4GB", "TO10GR5G", 2, "../images/T-GGEAR-RG.jpg", "../images/descripcion-desktop-reddemon.jpg", 499990, 750990),
    new Producto(5, "Logitech", "Mouse Gamer G604 Lightspeed Wireless-Bluetooth Negro", "5L6M2G40", 28, "../images/L-G604-LS.jpg", "../images/descripcion-mouse-lg604.jpg", 63990, 79990),
    new Producto(6, "HyperX", "Teclado Gamer HyperX Alloy Elite2 Mecánico Español", "1THAL2ME", 3, "../images/H-ELITE2-ME.jpg", "../images/descripcion-teclado-haelite2.jpg", 119990, 139990),
    new Producto(7, "Dell", "Notebook Inspiron 3520 Intel i5-1235U 15.6\" FHD 8GB 512GB SSD Windows 11", "8NDII5W1", 100, "../images/N-DINS-I5.jpg", "../images/descripcion-notebook-di3520.jpg", 349990, 549990),
    new Producto(8, "Asus", "Notebook TUF Gaming F15 FX506 Intel Core i5-11400H NVIDIA RTX 2050 4GB 15.6\" FHD 144Hz 8GB 512GB SSD Windows 11 Graphite Black", "7H1G54TG", 78, "../images/N-AF15-TG.jpg", "../images/descripcion-notebook-f15-fx506.jpg", 649990, 779990),
    new Producto(9, "Apple", "MacBook Air 13\" (Chip M1 CPU 8 núcleos GPU 7 núcleos, 8GB RAM, 256GB SSD) - Gris espacial", "AM15713A", 6, "../images/N-APA13-M1.jpg", "../images/descripcion-notebook-amair13.jpg", 849990, 1099990),
    new Producto(10, "Samsung", "Notebook Galaxy Book3 360 13.3\"FHD AMOLED Intel Core i7-1355U 8GB 512GB SSD Windows 11 Silver", "5FJHW421", 31, "../images/N-SBK3-21.jpg", "../images/descripcion-notebook-gb3360.jpg", 990990, 1229990),
    new Producto(11, "HP", "Notebook 2 en 1 HP Pavilion x360 14\" FHD Intel Core i5-1235U 8GB 512GB SSD Windows 11 Natural Silver 14-dy2003la", "568UFN2Q", 8, "../images/N-HP21-PX.jpg", "../images/descripcion-notebook-hpx360.jpg", 829990, 889990),
    new Producto(12, "Asus", "Notebook Zenbook 14X OLED UX3404 14.5\" 2K Intel Core i9-13900H 16GB 1TB SSD Windows 11 Inkwell Gray UX3404VA-M9115W", "5L3M1G8W", 100, "../images/N-AZ14X-UX.jpg", "../images/descripcion-notebook-azb14x.jpg", 1169990, 1499990),
    new Producto(13, "AMD", "CPU Ryzen 5 5600G (AM4)", "AMD5A46G", 30, "../images/CPU-R5-4.jpg", "../images/descripcion-cpu-r55600g.jpg", 149990, 154590),
    new Producto(14, "Gamdias", "Gabinete ATX Aura GC1 / 4 Ventiladores ARGB", "GAB7157A", 17, "../images/GAB-GAMAURA-GC1.jpg", "../images/descripcion-gabinete-gc1.jpg", 52990, 55790),
    new Producto(15, "Asus", "Video AMD Radeon RX560 4G ROG STRIX V2", "G75UARX4", 100, "../images/GPU-ARX5-4.jpg", "../images/descripcion-gpurx560.jpg", 92990, 97890),
    new Producto(16, "Corsair", "CORSAIR RM750e Full Modular Low-Noise ATX Power Supply - Dual EPS12V Connectors - 105°C-Rated Capacitors - 80 PLUS Gold", "FP780PGM", 100, "../images/FP-COR50-PG.jpg", "../images/descripcion-psu-rm750e.jpg", 109990, 115790),
    new Producto(17, "Gigabyte", "M/B AMD B550M DS3H (AM4)", "PMJG748A", 50, "../images/PM-GB5_DH.jpg", "../images/descripcion-mb-gds3h.jpg", 135990, 143190),
    new Producto(18, "Crucial", "DDR4 8GB 2666MHz Value", "JHGYU951", 100, "../images/MR-CLD4-26MH.jpg", "../images/descripcion-ram-c82666.jpg", 18990, 22990)
];

//Funcion para crear los productos
function crearCard(producto){
    //Identificamos donde se comenzara a crear las listas que es el ul
    const listaProductos = document.getElementById("productList");

    //Creamos las listas con su clase product
    const li = document.createElement("li");
    li.className = "product";

    //Creamos la primera seccion que almacenara todos los div
    const a = document.createElement("a");
    a.href = "../pages/product.html";
    a.className = "productinfo";
    a.addEventListener('click', function() {
        localStorage.setItem("selectedProductID", producto.id);
    });

    //Creamos el div que tiene la marca y el logo registrado
    const trademark = document.createElement("div");
    trademark.className = "producttrademark";
    trademark.innerHTML = `<span><strong>${producto.marca} </strong><i class="fas fa-registered"></i></span>`;

    //Creamos el div del nombre o detalle del producto
    const productName = document.createElement("div");
    productName.className = "productname";
    productName.innerHTML = `<p>${producto.nombre}</p>`;

    //creamos el div que tendra el SKU y el STOCK de los productos
    const skuUnits = document.createElement("div");
    skuUnits.className = "skuunits";
    skuUnits.innerHTML = `<div class="productsku"><span><strong>SKU:</strong> ${producto.sku}</span></div><div class="productunits"><span>${producto.stock} Stock</span></div>`;

    //Creamos el div que almacena las imagenes de los productos
    const productImg = document.createElement("div");
    productImg.className = "productimg";
    productImg.innerHTML = `<img src="${producto.imagen}" alt="imgcontcatpro">`;

    //Agregamos todo lo creamos al ancla, para que cuando se seleccione cualquier parte del producto, envie al respectivo producto
    a.appendChild(trademark);
    a.appendChild(productName);
    a.appendChild(skuUnits);
    a.appendChild(productImg);

    //Creamos la segunda seccion que almacenara precios y logo carro compras
    const valueCart = document.createElement("div");
    valueCart.className = "valuecart";

    //Creamos un ancla que estara dentro del div anterior, es solo mismo que la primera seccion, asi se selcciona todo
    const value = document.createElement("a");
    value.href = "../pages/product.html";
    value.className = "value";
    value.addEventListener('click', function() {
        localStorage.setItem("selectedProductID", producto.id);
    });

    //Creamos el div que contiene el precio actual del producto
    const productValue = document.createElement("div");
    productValue.className = "productvalue";
    productValue.innerHTML = `<span><strong>$ ${producto.precio}</strong></span>`;

    //Creamos el div que contiene el precio sin descuentos
    const productPreValue = document.createElement("div");
    productPreValue.className = "productprevalue";
    productPreValue.innerHTML = `<span><s>$ ${producto.precioAnterior}</s></span>`;

    //Creamos el boton que tendra el logo carrito y su direccionamiento
    const cartPlus = document.createElement("button");
    cartPlus.className = "cartplus";
    cartPlus.id = `${producto.id}`
    cartPlus.innerHTML = '<i class="fa fa-cart-plus"></i>';

    //Agregamos los creado a value
    value.appendChild(productValue);
    value.appendChild(productPreValue);

    //Agregamos todo a valuecart
    valueCart.appendChild(value);
    valueCart.appendChild(cartPlus);

    /*Todo lo creado actualmente se agrega a la lista creada anteriormente*/
    li.appendChild(a);
    li.appendChild(valueCart);

    listaProductos.appendChild(li);
}

//Funcion para colocar puntos a los valores de los productos, lee de izquierda a derecha y cada 3 numeros coloca un punto
function formatNumberWithComma(number){
    //Convierte el número a una cadena y revierte el orden
    const reversedNumberString = String(number).split('').reverse().join('');

    //Divide la cadena en grupos de tres caracteres
    const groups = reversedNumberString.match(/.{1,3}/g);

    //Une los grupos con puntos y revierte nuevamente el orden
    const formattedNumber = groups.join('.').split('').reverse().join('');

    return formattedNumber;
}

//Verificar si ya esta en localStorage
if(localStorage.getItem("productosStock")){
    const ARRAYPRODUCTSSTRING = localStorage.getItem("productosStock");
    const ARRAYPRODUCTSOBJECTS = JSON.parse(ARRAYPRODUCTSSTRING);
    //Actualizar precios de productos con formato
    for(const producto of ARRAYPRODUCTSOBJECTS){
        producto.precio = formatNumberWithComma(producto.precio);
        producto.precioAnterior = formatNumberWithComma(producto.precioAnterior);
    }
    //Generar los productos en el HTML
    for(const producto of ARRAYPRODUCTSOBJECTS){
        //Si el stock es 0 no lo mostrara para evitar confusiones de productos
        if(producto.stock > 0){
            crearCard(producto);
        }
    }
}else{
    //Guardar el array en el localStorage para utilizarlo en otra pagina y en el shoppingCart
    const PRODUCTOSSTOCK = JSON.stringify(PRODUCTOSARRAY);
    localStorage.setItem("productosStock", PRODUCTOSSTOCK);
    //Actualizar precios de productos con formato
    for(const producto of PRODUCTOSARRAY){
        producto.precio = formatNumberWithComma(producto.precio);
        producto.precioAnterior = formatNumberWithComma(producto.precioAnterior);
    }
    //Generar los productos en el HTML
    for(const producto of PRODUCTOSARRAY){
        //Si el stock es 0 no lo mostrara para evitar confusiones de productos
        if(producto.stock > 0){
            crearCard(producto);
        }
    }
}