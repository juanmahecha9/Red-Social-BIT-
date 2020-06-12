new WOW().init();


var validacion_global1 = false;
var validacion_global2 = false;
var validacion_global3 = false;
var validacion_global4 = false;

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDsTLA6IcRY68Y5BGfrHUa019SYjEGlze4",
    authDomain: "bit-redsocial.firebaseapp.com",
    databaseURL: "https://bit-redsocial.firebaseio.com",
    projectId: "bit-redsocial",
    storageBucket: "bit-redsocial.appspot.com",
    messagingSenderId: "344532253297",
    appId: "1:344532253297:web:30be4c30a6f88431a179d0",
    measurementId: "G-J59TSW2NQJ"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

var defaultProject = firebase.initializeApp(firebaseConfig, 'bit-redsocial');
// console.log(defaultProject.name);  // "[DEFAULT]"
defaultFirestore = defaultProject.firestore();
// console.log(defaultFirestore);
var coleccion = defaultFirestore.collection('cuentas');

function registrar() {

    var json_object = {
        'nombre': document.getElementById("nombre").value.trim(),
        'apellido': document.getElementById("apellido").value.trim(),
        'email': document.getElementById("email").value.trim(),
        'password': document.getElementById("password").value.trim(),
        'fecha_creacion': new Date()
    };
    coleccion.add(json_object).then(result => {
        console.log('SE AGREGÓ un nuevo registro', result.id);
        alert("Se ha registrado correctamente");

        document.getElementById("formulario").remove();
        document.querySelector("#respuesta_final h1").innerHTML = '¡ Bienvenido a la comunidad BIT !';
        document.querySelector("#respuesta_final h6").innerHTML = '¡FELICIDADES! Te has registrado correctamente <a class="btn btn-primary" href="perfil.html" target="_blank">IR A MI CUENTA</a>';
              // AQUI SE COLOCA UN REDIRECCIONAMIENTO A LA PAGINA DE INICIO DE SESION, O A LA DEL MURO DE PUBLICACIONES
    });
    
    
}
function validar_registro() {
    if (document.getElementById("password").value != document.getElementById("password2").value) {
        document.getElementById("validar_formulario").innerHTML = "LAS CONTRASEÑAS DEBEN SER IGUALES"
        return false;
    }
    else {
        if (document.getElementById("validar_formulario")) {
            document.getElementById("validar_formulario").innerHTML = "";
        }
        return true;
    }
}


var registros = [];
coleccion
    // .where("email", "==", "mariayvethramos@gmail.com")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            // if (doc.exists) {
            //     console.log("Document data:", doc.data());
            // } else {
            //     // doc.data() will be undefined in this case
            //     console.log("No such document!");
            // }
            // if ( document.getElementById(id_respuesta)){
            //     document.getElementById(id_respuesta).innerHTML = "";
            // }
            // return true;
            registros.push(doc.data().email);
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

// console.log('registros',registros);

var registrarme = document.getElementById('registrarme');
registrarme.addEventListener("click", function (event) {
    event.preventDefault();

    if (validar_registro() == true && validar_formulario()) {
        registrar();
    }

});

var login = document.getElementById('login_boton');
login.addEventListener("click", function (event) {
    event.preventDefault();

    // console.log('validando');
    validar_login(function (respuesta) {
        // console.log('respuestaaaa',respuesta);
        // if (error) console.log('error',error);
        if (respuesta == true) {
            // CAMBIAR AQUI LA URL O PROTOCOLOS PARA LA PAGINA DEL MURO O PERFIL
            document.getElementById('login_validacion').innerHTML = 'Bienvenido, pronto sera redirigido';
            document.getElementById("formulario").remove();
            document.querySelector("#respuesta_final h1").innerHTML = '¡ Bienvenido a la comunidad BIT !';
            document.querySelector("#respuesta_final h6").innerHTML = '¡FELICIDADES! Te has registrado correctamente <a class="btn btn-primary" href="perfil.html" target="_blank">IR A MI CUENTA</a>';
          
        //window.location = "perfil.html";
        }
        else {
            document.getElementById('login_validacion').innerHTML = 'El usuario o contraseña ingresados, no existen';
        }
    });
    // console.log('validado');


});


function validar(tipo, campo, id_respuesta) {

    var regexp_letras = "^([a-zA-Z ]){2,50}$";
    var regexp_email = "^[^@]+@[^@]+\.[a-zA-Z]$";
    var regexp_numeros = "^([0-9]){10,10}$";
    var regexp_cuenta = "^([a-zA-Z0-9]){3,8}$";

    if (tipo == 'letras') {
        var patt = new RegExp(regexp_letras);
        if (patt.test(campo.value) == false) {
            document.getElementById(id_respuesta).innerHTML = "Solo se admiten letras en su nombre, <br> Y minimo 2 caracteres,corrija e intente de nuevo"
            return false;
        }
        else {
            if (document.getElementById(id_respuesta)) {
                document.getElementById(id_respuesta).remove();
            }
            return true;
        }
    }
    if (tipo == 'numeros') {
        var patt = new RegExp(regexp_numeros);
        if (patt.test(campo.value) == false) {
            document.getElementById(id_respuesta).innerHTML = "Solo se admiten letras en su nombre, corrija e intente de nuevo"
            return false;
        }
        else {
            if (document.getElementById(id_respuesta)) {
                document.getElementById(id_respuesta).remove();
            }
            return true;
        }
    }
    if (tipo == 'email') {
        var patt = new RegExp(regexp_email);
        if (patt.test(campo.value) == false) {
            document.getElementById(id_respuesta).innerHTML = "Escriba el formato correcto de correo, corrija e intente de nuevo"
            return false;
        }
        else {

            if (registros.find(element => element == campo.value.trim()) != undefined) {
                if (document.getElementById(id_respuesta)) {
                    document.getElementById(id_respuesta).innerHTML = "El correo que intenta ingresar ya existe, intente con otro";
                }
                return false;
            }
            else {
                if (document.getElementById(id_respuesta)) {
                    document.getElementById(id_respuesta).innerHTML = "";
                }
                return true;
            }


        }
    }
    if (tipo == 'password') {
        var patt = new RegExp(regexp_cuenta);
        if (patt.test(campo.value) == false) {
            document.getElementById(id_respuesta).innerHTML = "La contraseña no debe contener espacios, minimo 3, maximo 8 caracteres, y solo admite numeros y letras, corrija e intente de nuevo"
            return false;
        }
        if (campo.value.trim() == "") {
            document.getElementById(id_respuesta).innerHTML = "La contraseña no puede quedar vacia, corrija e intente de nuevo"
            return false;
        }
        else {
            if (document.getElementById(id_respuesta)) {
                document.getElementById(id_respuesta).innerHTML = "";
            }
            return true;
        }
    }
}

function validar_formulario() {
    if (validacion_global1 == true && validacion_global2 == true && validacion_global3 == true && validacion_global4 == true) {
        if (document.getElementById('validar_formulario')) {
            document.getElementById('validar_formulario').innerHTML = "";
        }
        return true;
    }
    else {

        document.querySelector(".modal-footer .options").innerHTML = "<h5 id='error_cuenta'>¡Debe completar todos los campos <b>CORRECTAMENTE<b/>!";

        return false;
    }
}




function validar_login(callback) {
    // var registros_usuario = false; 
    let usuario = document.getElementById('login_usuario');
    let password = document.getElementById('login_password');


    // console.log('return registros_usuario',registros_usuario)
    // return buscar_cuenta;
    coleccion
        .where("email", "==", usuario.value)
        .where("password", "==", password.value)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (doc.exists) {
                    // console.log("Document data:", doc.data());
                    // console.log('registros_usuario',true);
                    callback(true);
                } else {
                    // doc.data() will be undefined in this case
                    // console.log("No such document!");
                    // console.log('registros_usuario',false);
                    callback(false);
                }
                // registros_usuario.push(doc.data().email);
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });

    callback(false);
}