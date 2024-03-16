//Obtener la pagina actual
let currentPage = window.location.pathname;
console.log(currentPage);

//Condicion de pagina
if(currentPage === "/GangaStore/pages/recoveraccount.html"){
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
}else if(currentPage === "/GangaStore/pages/changepassword.html"){
    const userId = parseInt(localStorage.getItem("userId")) || null;
    const ARRAYUSERSSTRING = localStorage.getItem("USUARIOS") || null;
    let ARRAYUSERSOBJECTS = JSON.parse(ARRAYUSERSSTRING) || [];

    // Obtener el usuario con el userId
    const userToChangePassword = ARRAYUSERSOBJECTS.find(user => user.id === userId);

    if (userToChangePassword) {
        // Evento de clic para cambiar la contraseña
        document.getElementById('formcontainer').addEventListener('submit', function (event) {
        event.preventDefault();

        const newPassword = document.getElementById('newpass').value;
        const repitPassword = document.getElementById('repitpass').value;

        if (newPassword.length >= 8 && newPassword === repitPassword) {
            // Actualizar la contraseña del usuario
            userToChangePassword.password = newPassword;

            // Volver a almacenar el array actualizado en el localStorage
            localStorage.setItem("USUARIOS", JSON.stringify(ARRAYUSERSOBJECTS));
            localStorage.removeItem("userId");
            Swal.fire({
                icon: "success",
                title: "Contraseña cambiada",
                text: "La contraseña se ha cambiado exitosamente.",
                confirmButtonText: "Aceptar",
                willClose: () => {
                    // Redirigir a la página principal u otra página después de cambiar la contraseña
                    window.location.href = './login.html';
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error al cambiar la contraseña",
                text: "Asegúrate de que la nueva contraseña cumple con los requisitos y coincide en ambos campos.",
                confirmButtonText: "Aceptar"
            });
        }
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Usuario no encontrado",
            text: "No se encontró el usuario para cambiar la contraseña.",
            confirmButtonText: "Aceptar",
            willClose: () => {
                // Redirigir a la página principal u otra página en caso de error
                window.location.href = '../index.html';
            }
        });
    }
}