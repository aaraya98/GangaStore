//Funcion para llenar los option del select motivo
function reiniciarSelect(){
    var selectElement = document.getElementById("motivo");
    function agregarOpcion(valor, texto) {
        var selectElement = document.getElementById("motivo");
        var option = document.createElement("option");
        option.value = valor;
        option.text = texto;
        selectElement.add(option);
    }
    // Crear nuevas opciones
    agregarOpcion("consultas", "Consultas");
    agregarOpcion("reclamos", "Reclamos");
    agregarOpcion("solicitudes", "Solicitudes");
    agregarOpcion("atrasoEnvio", "Atraso de Envío");
    agregarOpcion("productoConFalla", "Producto con Falla");
    agregarOpcion("otro", "Otro Motivo");
}

//LLamar a la funcion para que llene los datos solicitados
reiniciarSelect();

//Evento de rut/dni para evitar ingresos de letras no habilitadas por rut
document.getElementById('rut').addEventListener('input', function(){
     //Reemplaza cualquier caracter que no sea un numero con una cadena vacia, despues del - aceptara numeros o una letra k
     //Asi estan estipulados los rut o dni en chile
    this.value = this.value.replace(/[^0-9kK-]/g, '');
});

//Evento de telefono, solo acepta numeros
document.getElementById('telefono').addEventListener('input', function(){
    //Reemplaza cualquier caracter que no sea un numero con una cadena vacia
    this.value = this.value.replace(/\D/g, '');
    let phone = document.getElementById('telefono').value;
    if(phone.length < 11){
        document.getElementById('mensajePhone').innerHTML = "El numero telefonico debe de tener el mismo largo que el ejemplo";
    }else{
        document.getElementById('mensajePhone').innerHTML = "";
    }
});

//Evento para realizar envio de lo descrito
document.getElementById("contactUserForm").addEventListener('submit', (event)=>{
    event.preventDefault();
    let name = document.getElementById('nombre').value;
    let lastName = document.getElementById('apellido').value;
    let rutDni = document.getElementById('rut').value;
    let phoneNumber = document.getElementById('telefono').value;
    let email = document.getElementById('email').value;
    let numberOrde = document.getElementById('numeroOrden').value;
    let reason = document.getElementById('motivo').value;
    let comment = document.getElementById('comentarios').value;

    if(reason === "consultas" || phoneNumber.length < 11 || (rutDni.length < 9 || rutDni.length > 10)){
        alert("Los datos ingresados son erroneos, favor revisar rut, telefono o motivo");
    }else{
        //ya con backend se puede enviar al correo de soporte o consultas corporativo
        alert("Datos enviados exitosamente");
        //Redirigir al index
        window.location.href = '../index.html'
    }
})