const ARRAYUSERSSTRING = localStorage.getItem("USUARIOS");
const ARRAYUSERSOBJECTS = JSON.parse(ARRAYUSERSSTRING);
//Crear variable donde se guardara el codigo generado
let codigoGenerado;
//Variable que guardara el ID del usuario encontrado
let userId;

//Generar codigo aleatorio de 4 letras y 4 numeros
function generarCodigoAleatorio() {
    const letrasMayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
    let codigoAleatorio = '';
    for (let i = 0; i < 4; i++) {
        const indiceLetra = Math.floor(Math.random() * letrasMayusculas.length);
        const indiceNumero = Math.floor(Math.random() * numeros.length);
        codigoAleatorio += letrasMayusculas.charAt(indiceLetra);
        codigoAleatorio += numeros.charAt(indiceNumero);
    }
    //Mezclar aleatoriamente el codigo generado
    codigoAleatorio = codigoAleatorio.split('').sort(() => Math.random() - 0.5).join('');
    return codigoAleatorio;
}

//Evento para verificar el correo ingresado vs el array
document.getElementById('emailUser').addEventListener('click', function () {
    const userEmail = document.getElementById('email').value;
    // Verificar si el correo existe en ARRAYUSERSOBJECTS
    const userExists = ARRAYUSERSOBJECTS.find(user => user.email === userEmail);

    if (userExists){
        userId = userExists.id;
        codigoGenerado = generarCodigoAleatorio();
        Swal.fire({
            icon: "success",
            title: "Correo correcto",
            text: `Tu código es: ${codigoGenerado}`,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            }
        });
    } else{
        Swal.fire({
            icon: "error",
            title: "Correo incorrecto",
            text: "Por favor, verifica tu correo e intenta nuevamente.",
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            }
        });
    }
});

// Evento de clic para el segundo botón (Validar código)
document.getElementById('keyDelivered').addEventListener('click', function () {
    // Obtener el valor del código ingresado
    const enteredCode = document.getElementById('code').value;

    if(enteredCode === codigoGenerado){
        //Guardar en el localStorage el id del usuario que desea cambiar la clave
        localStorage.setItem("userId", userId);
        Swal.fire({
            icon: "success",
            title: "Código correcto",
            confirmButtonText:"aceptar",
            willClose: () => {
                // Redirigir a cambiar la clave
                window.location.href = './changepassword.html';
            }
        });
    }else{
        Swal.fire({
            icon: "error",
            title: "Código incorrecto",
            text: "Por favor, verifica que el código sea el correcto",
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            }
        });
    }
});