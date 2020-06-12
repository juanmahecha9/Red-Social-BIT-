//alert("hola mundo")

//identificacion de elementos

//Botones
var btnVentana = document.getElementById("btnVentana");
var btnCerraVentana = document.getElementById("btnCerraVentana");
var btnLateral = document.getElementById('btnLateral');
var btnCrearGrupo = document.getElementById('btnCrearGrupo');

//Contenedores
var ventanaGrupo = document.getElementById("ventanaGrupo");
var cajaPertenece = document.getElementsByClassName("pertenece__lista")[0];
var cajaLateral = document.getElementsByClassName('box-lateral')[0];
var cajaTuyos = document.getElementsByClassName('tuyos__lista')[0];

//Otros
var selectPriv = document.getElementById('selectPriv');
var imgPriv = document.getElementById('imgPriv');
var inpNombreGrupo = document.getElementById('inpNombreGrupo');

//asignacion de eventos
btnVentana.addEventListener("click", mostrarVentana );
btnCerraVentana.addEventListener("click", cerraVentana); //al dar click se ejecute esa funcion
btnLateral.addEventListener('click', toggleLateral);
cajaLateral.style.animationName = 'ocultaLateral'; //Lo setea
selectPriv.addEventListener('change', togglePrivado);
btnCrearGrupo.addEventListener('click', crearGrupo);

//funciones
function mostrarVentana() {
    ventanaGrupo.style.animationName = "mostrar";
} 

function cerraVentana() {
    ventanaGrupo.style.animationName = "ocultar";
}

function unirse(e) {
    var idCarta = e.target.parentElement;
    var nombreGrupo = e.target.parentElement.childNodes[3].childNodes[1].innerHTML;
    e.target.parentElement.classList.add('card--state-gracias');
    idCarta.innerHTML = `<div class='cont-gracias'> Gracias por unirse a <span>${nombreGrupo}<span> `;
   // e.target.parentElement.firstChild.nextSibling.firstChild.innerHTML;

   pertenecer(nombreGrupo);
}

function pertenecer(nombre) {
    let nombreGrupo = document.createTextNode(nombre);
    let contLink = document.createElement('div');
    contLink.className = 'cont-link';
    let btnBorrar = document.createElement('span');
    btnBorrar.innerHTML = 'X';
    btnBorrar.setAttribute('onclick','borrarPertenece(event)');

    let linkGrupo = document.createElement('a');
    linkGrupo.href = '#';
    linkGrupo.appendChild(nombreGrupo) ;
    
    //Se mete texto dentro de <a> y <a> dentro de <p>
    contLink.appendChild(linkGrupo);
    contLink.appendChild(btnBorrar);

    //Se mete todo dentro de div lista
    cajaPertenece.appendChild(contLink);
}

function crearGrupo() {
    let nombre = inpNombreGrupo.value;
    let privacidad = selectPriv.value;

    if(/^\s*$/.test(nombre)) {
        alert('Por favor ingrese un nombre');
    }else {
        let contLink = document.createElement('div');
        contLink.className = 'cont-link';
        let img = document.createElement('img');
        if(privacidad == 'privado') {
            img.src = 'img/priva1.svg';
        }
    
        if(privacidad == 'publico') {
            img.src = 'img/priva2.svg';
        }
        img.width = '22px';
    
        let link = document.createElement('a');
        link.href='#';
        link.innerHTML = nombre;
    
        contLink.appendChild(img);
        contLink.appendChild(link);
    
        cajaTuyos.appendChild(contLink);

        inpNombreGrupo.value = '';
    }
}

function borrarPertenece(e) {
    cajaPertenece.removeChild(e.target.parentElement);
}

function toggleLateral() {
    if(cajaLateral.style.animationName == 'ocultaLateral') {
        cajaLateral.style.animationName = 'muestraLateral';
    }else if(cajaLateral.style.animationName == 'muestraLateral') {
        cajaLateral.style.animationName = 'ocultaLateral';
    }
}

function togglePrivado() {
    if(selectPriv.value == 'privado') {
        imgPriv.src = 'img/priva1.svg';
    }else if(selectPriv.value == 'publico') {
        imgPriv.src = 'img/priva2.svg';
    }
}



