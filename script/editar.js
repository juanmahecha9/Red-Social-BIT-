var btn = document.getElementById('editar');
var dato = document.getElementById('dato');
var dato1 = document.getElementById('dato1');
var dato2 = document.getElementById('dato2');
var dato3 = document.getElementById('dato3');

btn.onclick = function () {
    nombre = prompt('Ingrese su nombre');
    dato.innerHTML = " " + nombre;
    fecha = prompt('Ingrese su fecha de nacimiento');
    dato1.innerHTML = " " + fecha;
    trabajo = prompt('Ingrese su ciudad de origen');
    dato3.innerHTML = " " + trabajo;
    ciudad = prompt('Ingrese su pasatiempo');
    dato2.innerHTML = " " + ciudad;

    if(nombre == "null" && fecha == "null" &&trabajo == "null"  && ciudad == "null" ){
        dato.value = "";
        dato1.value = "";
        dato2.value = "";
        dato3.value = "";
    }
}



