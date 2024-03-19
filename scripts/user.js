//Constructor de usuarios
class User {
    constructor(id, names, lastNames, rut, phone, email, password, street, numberStreet, place, region, commune) {
        this.id = id;
        this.names = names;
        this.lastNames = lastNames;
        this.rut = rut;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this. street = street;
        this.numberStreet = numberStreet;
        this.place = place;
        this. region = region;
        this.commune = commune;
    }
}
//Array de objetos de los productos
const USERSARRAY = [
    new User(1,"Alvaro Ernesto", "Araya Sanchez", "19.756.238-2", "56912345678","alvaroaraya726@gmail.com", "alvaraya98", "elm", "1234", "casa", "Region Metropolitana", "Recoleta"),
    new User(2,"Coder", "House", "12.345.678-9", "56912387654", "coder@gmail.com", "coder.123", "js", "4321", "departamento", "Region Metropolitana", "Conchali")
];

//Al tener 2 eventos de distintos FORM de distintas paginas, da error por consola en JS, puesto
//que no encuentra los form de la otra pagina, se crea un localizador de la pagina actual
//y una condicion dependiendo de la pagina que este actualmente para que tome uno u otro evento

//Obtener la pagina actual
let currentPage = window.location.pathname;
console.log(currentPage);

//Condicion de pagina
if(currentPage === "/GangaStore/pages/login.html"){
    //Evento de inicio de sesión
    document.getElementById("loginForm").addEventListener('submit', (event)=>{
        event.preventDefault();
        let getEmail = document.getElementById('email').value;
        let getPassword = document.getElementById('password').value;
    
        //función asincrona para verificar las credenciales
        function verificarCredenciales(){
            return new Promise((resolve, reject)=>{
                //Extraer del localStorage el array USUARIOS
                const ARRAYUSERSSTRING = localStorage.getItem("USUARIOS");
                const ARRAYUSERSOBJECTS = JSON.parse(ARRAYUSERSSTRING);
    
                if(ARRAYUSERSOBJECTS && ARRAYUSERSOBJECTS.some(usuario => usuario.email === getEmail && usuario.password === getPassword)){
                    resolve();
                }else{
                    reject(new Error("Datos incorrectos"));
                }
            });
        };
    
        // Llamar a la función asíncrona y manejar el resultado
        verificarCredenciales()
            .then(()=>{
                //Guardar en localStorage los datos necesarios para un futuro hacer propaganda o si ya esta logeado que no muestra login
                //si no que muestre otro panel con datos personales del usuario final
                localStorage.setItem('logCorrecto', true);
                localStorage.setItem('USER', getEmail);
                localStorage.setItem('PASS', getPassword);
                
                //Credenciales correctas mostrar mensaje de exito y redirigir
                Swal.fire({
                    icon: "success",
                    title: "Iniciaste sesión correctamente",
                    confirmButtonText: "Aceptar",
                    willClose: ()=>{
                        window.location.href = '../index.html';
                    }
                });
            })
            .catch(error =>{
                //Credenciales incorrectas mostrar mensaje de error
                document.getElementById('mensajeLogin').innerHTML = "No están correctos los datos ingresados";
                Swal.fire({
                    icon: "error",
                    title: "Datos incorrectos",
                    text: error.message,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
            });
    });

    //Lo primero que hara es crear en el localStorage USUARIOS siesque no lo tiene
    if(localStorage.getItem("USUARIOS") === null){
        const USERSARRAYJSON = JSON.stringify(USERSARRAY)
        localStorage.setItem("USUARIOS", USERSARRAYJSON); 
    }
}else if(currentPage === "/GangaStore/pages/registeruser.html"){

    //Definir arrays para regions y communes
    const regions = ["Región Metropolitana", "Valparaíso", "Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo", "Valle del Aconcagua", "O'Higgins", "Maule", "Ñuble", "Biobío", "La Araucanía", "Los Ríos", "Los Lagos", "Aysén del General Carlos Ibáñez del Campo", "Magallanes y de la Antártica Chilena"];
    const communes = {
        "Región Metropolitana": ["Colina", "Lampa", "Til Til", "Pirque", "Puente Alto", "San José de Maipo", "Buin", "Calera de Tango", "Paine", "San Bernardo", "Alhué", "Curacaví", "María Pinto", "Melipilla", "San Pedro", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Granja", "La Florida", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Miguel", "San Joaquín", "San Ramón", "Santiago", "Vitacura", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor", "Talagante"],
        "Valparaíso": ["Viña del Mar", "Valparaíso", "Quilpué", "Villa Alemana", "Concón", "Quillota", "La Ligua"],
        "Arica y Parinacota": ["Arica", "Putre"],
        "Tarapacá": ["Iquique", "Alto Hospicio"],
        "Antofagasta": ["Antofagasta", "Calama", "Mejillones"],
        "Atacama": ["Copiapó", "Vallenar", "Chañaral"],
        "Coquimbo": ["La Serena", "Coquimbo", "Illapel", "Ovalle"],
        "Valle del Aconcagua": ["San Felipe", "Los Andes", "Quillota"],
        "O'Higgins": ["Rancagua", "Rengo", "Machalí"],
        "Maule": ["Talca", "Curicó", "Linares"],
        "Ñuble": ["Chillán", "Bulnes", "Yungay"],
        "Biobío": ["Concepción", "Talcahuano", "Chillán Viejo", "Los Ángeles"],
        "La Araucanía": ["Temuco", "Angol", "Villarrica"],
        "Los Ríos": ["Valdivia", "La Unión", "Río Bueno"],
        "Los Lagos": ["Puerto Montt", "Osorno", "Puerto Varas", "Castro"],
        "Aysén del General Carlos Ibáñez del Campo": ["Coyhaique", "Puerto Aysén"],
        "Magallanes y de la Antártica Chilena": ["Punta Arenas", "Puerto Natales"],
    };

    //Funcion para completar el menu desplegable de regiones
    function populateRegionDropdown(){
        const regionDropdown = document.getElementById('region');
        //Agregar opciones para cada region
        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            regionDropdown.appendChild(option);
        });
    }

    //Funcion para completar el menu desplegable de comunas según la region seleccionada
    function populateCommuneDropdown(selectedRegion){
        const communeDropdown = document.getElementById('comuna');
        
        //Borrar opciones existentes
        communeDropdown.innerHTML = "";

        //Agregar opciones para las comunas de la region seleccionada
        const selectedCommunes = communes[selectedRegion] || [];
        selectedCommunes.forEach(commune => {
            const option = document.createElement('option');
            option.value = commune;
            option.textContent = commune;
            communeDropdown.appendChild(option);
        });
    }

    //Llenar el menu desplegable de region inicialmente
    populateRegionDropdown();

    //Evento de cambios de region
    document.getElementById('region').addEventListener('change', (event) => {
        const selectedRegion = event.target.value;
        populateCommuneDropdown(selectedRegion);
    });

    //Eliminar letras del input telefono
    //Evento de telefono
    document.getElementById('telefono').addEventListener('input', function(){
        //Reemplaza cualquier caracter que no sea un numero con una cadena vacia
        this.value = this.value.replace(/\D/g, '');
        let phone = document.getElementById('telefono').value;
        if(phone.length < 11 || phone.length > 11){
            document.getElementById('mensajePhone').innerHTML = "El numero telefonico debe de tener el mismo largo que el ejemplo";
        }else{
            document.getElementById('mensajePhone').innerHTML = "";
        }
    });

    //Eliminar letras del input rut/dni y solo asignar una k despues del -
    //Evento de rut/dni
    document.getElementById('rut').addEventListener('input', function(){
         //Reemplaza cualquier caracter que no sea un numero con una cadena vacia, despues del - aceptara numeros o una letra k
         //Asi estan estipulados los rut o dni en chile
        this.value = this.value.replace(/[^0-9kK-]/g, '');
        let rut = document.getElementById('rut').value;
        if(rut.length < 9 || rut.length > 10){
            document.getElementById('mensajeRutDni').innerHTML = "El RUT/DNI ingresado debe de ser parecido al ejemplo";
        }else{
            document.getElementById('mensajeRutDni').innerHTML = "";
        }
    });

    //Evento de password para comentar al usuario las condiciones de las mismas
    document.getElementById('password').addEventListener('input', function(){
        let password = document.getElementById('password').value;
        if(password.length < 8 || password.includes(" ")){
            document.getElementById('mensajePassword').innerHTML = "La contraseña debe de tener un largo minimo de 8 caracteres y no debe de tener espacios";
        }else{
            document.getElementById('mensajePassword').innerHTML = "";
        };
    });
    //Evento de repetir_password para comentar al usuario las condiciones de las mismas
    document.getElementById('repetir_password').addEventListener('input', function(){
        let password = document.getElementById('password').value;
        let repeatPassword = document.getElementById('repetir_password').value;
        if(password === repeatPassword){
            document.getElementById('mensajeRepeatPassword').innerHTML = "";
        }else{
            document.getElementById('mensajeRepeatPassword').innerHTML = "La contraseña que esta repitiendo debe de ser igual a la primera";
        };
    });

    //Evento de creacion de usuario
    document.getElementById("registerUserForm").addEventListener('submit', (event)=>{
        event.preventDefault();
        let getNames = document.getElementById('nombres').value;
        let getLastNames = document.getElementById('apellidos').value;
        let getRut = document.getElementById('rut').value;
        let getPhone = document.getElementById('telefono').value;
        let getEmail = document.getElementById('email').value;
        let getStreet = document.getElementById('nombre_direccion').value;
        let getNumberStreet = document.getElementById('numero').value;
        let getPlace = document.getElementById('casa_oficina').value;
        let getRegion = document.getElementById('region').value;
        let getCommune = document.getElementById('comuna').value;
        let getPassword = document.getElementById('password').value;
        let getRepeatPassword = document.getElementById('repetir_password').value;

        //Extraer del localStorage el array USUARIOS
        const ARRAYUSERSSTRING = localStorage.getItem("USUARIOS");
        const ARRAYUSERSOBJECTS = JSON.parse(ARRAYUSERSSTRING);
        //Condicion de ARRAY por existencia en localStorage
        if(localStorage.getItem("USUARIOS")){
            if((getPhone.length < 11 || getPhone.length > 11) || (getRut.length < 9 || getRut.length > 10) || (getPassword != getRepeatPassword && getRepeatPassword < 8)){
                Swal.fire({
                    icon: "error",
                    title: "Datos incorrectos",
                    text: "Por favor, verifica rut, telefono o contraseña e intenta nuevamente.",
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
                //Extraigo el ultimo objeto del array
                let lastObject = ARRAYUSERSOBJECTS[ARRAYUSERSOBJECTS.length - 1];
                //Extraigo el id del ultimo objeto y le sumo un 1 
                let lastId = lastObject.id+1;
    
                //Crear e incorporar los datos recopilados al array creando un nuevo objeto usuario
                const newUser = new User(
                    lastId, getNames, getLastNames, getRut, getPhone, getEmail,
                    getPassword, getStreet, getNumberStreet, getPlace, getRegion, getCommune
                );
                ARRAYUSERSOBJECTS.push(newUser);
    
                //Guardar el array en localStorage para que si el usuario que se desea logear y creo cuenta nueva, siempre esten los datos y no se pierdan al recargar o cambiar la pagina
                const USERSARRAYJSON = JSON.stringify(ARRAYUSERSOBJECTS)
                localStorage.setItem("USUARIOS", USERSARRAYJSON);

                //Redirigir al login
                window.location.href = './login.html';
            }
        }else{
            if((getPhone.length < 11 || getPhone.length > 11) || (getRut.length < 9 || getRut.length > 10) || (getPassword != getRepeatPassword && getRepeatPassword < 8)){
                Swal.fire({
                    icon: "error",
                    title: "Datos incorrectos",
                    text: "Por favor, verifica rut, telefono o contraseña e intenta nuevamente.",
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
                //Extraigo el ultimo objeto del array
                let lastObject = USERSARRAY[USERSARRAY.length - 1];
                //Extraigo el id del ultimo objeto y le sumo un 1 
                let lastId = lastObject.id+1;
    
                //Crear e incorporar los datos recopilados al array creando un nuevo objeto usuario
                const newUser = new User(
                    lastId, getNames, getLastNames, getRut, getPhone, getEmail,
                    getPassword, getStreet, getNumberStreet, getPlace, getRegion, getCommune
                );
                USERSARRAY.push(newUser);
    
                //Guardar el array en localStorage para que si el usuario que se desea logear y creo cuenta nueva, siempre esten los datos y no se pierdan al recargar o cambiar la pagina
                const USERSARRAYJSON = JSON.stringify(USERSARRAY);
                localStorage.setItem("USUARIOS", USERSARRAYJSON);

                //Redirigir al login
                window.location.href = './login.html';
            }
        }
    });
};