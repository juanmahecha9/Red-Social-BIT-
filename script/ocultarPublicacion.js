// oculta div de publicacion
//mostrar y ocultar 
var publicacion = document.getElementById("btn1");// boton publicacion nueva
var x = document.getElementById("contenedor");
var cancelarPublicacion = document.getElementById("can")
publicacion.addEventListener("click", () => { // cada vez que cambie la lista
  x.classList.remove("ocultarContenido");
})

cancelarPublicacion.addEventListener("click", () => {
x.classList.add("ocultarContenido");
});
