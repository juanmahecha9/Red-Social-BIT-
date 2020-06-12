//Para cargar el archivo al cargar la pagina
document.addEventListener("DOMContentLoaded", ajax)
function ajax() {
    var http = new XMLHttpRequest(); //encargado de crear la solicitud
    var url = "header.html" // cargar la url a llamar

    http.onreadystatechange = function () {
        //Evaluar el estado de la respuesta
        if (this.readyState == 4 && this.status == 200) {
            // se indica que lo que queremos que se ejecute o cambie
            document.getElementById("header").innerHTML = this.responseText;
        }
    };
    http.open("GET", url);
    http.send();
};


