var btn = document.getElementById('pub');

var ss = [];
function agregarFoto() {
    var tareaNombre = document.getElementById('publica').value; //Variable del mensaje

    var contenedor = document.getElementById("muestraImg"); //Cargar campo para mostar las imagenes
    var archivos = document.getElementById("cargarImg").files; //Cargar el valor del input file

    for (i = 0; i < archivos.length; i++) { // se crea un arreglo para poder cargar varias veces imagenes
        var newTask = document.createElement('div'); // div que contiene toda la informacion
        newTask.setAttribute("class", "picture");
        newTask.setAttribute("id", "f1");

        var checkbox = document.createElement('input'); // cear un input
        checkbox.type = 'checkbox'; // tipo del input es checkbox
        var label = document.createElement('p'); //le crea el  texto al checkbox
        label.setAttribute("class", "texto");
        label.innerHTML = tareaNombre;

        //Crear boton para borrar
        var button = document.createElement('button');
        button.innerHTML = "<span onclick='eliminar(this)'>🗑</span>";
        button.setAttribute('onclick', 'borrar(id)');
        button.id = 'a' + Math.random();
        button.classList.add("button");

        imgTag = document.createElement("img"); // se crea la etiqueta imagen
        imgTag.classList.add("foto"); // le agrega una clase al elemento creado 
        imgTag.id = "imagen" + (i + 1);      // ORDENADAS CON UN TAMAÑO ESTÁNDAR
        imgTag.src = URL.createObjectURL(archivos[i]); //Crear una ruta url depentiendo del indice

        //Agregar al div todos los elementos en el orden que van a aparecer
        newTask.appendChild(imgTag); //agregar hijo
        newTask.appendChild(label);
        newTask.appendChild(checkbox)
        newTask.appendChild(button);
        // con insertbefore se agrega al contenedor el nuevo contenido
        // y  se agrega al contenedor un nuevo hijo en la posicion 
        contenedor.insertBefore(newTask, contenedor.childNodes[0]);
        console.log(i);
        ss.push(newTask);
    }
    document.getElementById('cargarImg').value = ''
    document.getElementById('publica').value = '';
}

btn.onclick = function () {
    agregarFoto();
}

var div;
function eliminar(elemento) {

    var result = confirm('¿Desea eliminar la publicacion?');
    if (result == true) {
        alert('Publicacion eliminada')
        var id = elemento.parentNode.getAttribute("id");
        console.log(id)
        node = document.getElementById(id).parentNode;
        // console.log(node)
        div = node;
        div.remove(this);
    } else {
        alert('Cancelado')
    }


}

function elimina1() {
    var result = confirm('¿Desea eliminar la publicacion?');
    if (result == true) {
        alert('Publicacion eliminada')
        var id = document.getElementById('a').parentNode.remove();
    } else {
        alert('Cancelado')
    }
}
function elimina2() {
    var result = confirm('¿Desea eliminar la publicacion?');
    if (result == true) {
        alert('Publicacion eliminada')
        var id = document.getElementById('aa').parentNode.remove();
    } else {
        alert('Cancelado')
    }
}
function elimina3() {
    var result = confirm('¿Desea eliminar la publicacion?');
    if (result == true) {
        alert('Publicacion eliminada')
        var id = document.getElementById('aaa').parentNode.remove();
    } else {
        alert('Cancelado')
    }
}
