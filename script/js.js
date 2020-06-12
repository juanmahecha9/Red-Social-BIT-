var btn = document.getElementById('mo')
var nuevo = document.getElementById('divbotonmo')

btn.onclick = function () {

    var button = document.createElement('button');
    button.innerHTML = "<span onclick='modoC()'>Modo Claro</span> <br>";
    button.setAttribute('onclick', 'borrar(id)');
    button.id = 'abc';
    button.classList.add("button");
    nuevo.insertBefore(button, nuevo.childNodes[0]);
    
    
    document.body.style.background = 'black'
    document.getElementById('us1').style.background = 'whitesmoke'
    document.getElementById('contenedor').style.background = 'whitesmoke'
    document.getElementById('f1').style.background = 'none'
}

function modoC(){
    document.body.style.background = "#80bdFF ";
    document.getElementById('us1').style.background = '#e1f5f8'
    document.getElementById('contenedor').style.background = '#e1f5f8'
    document.getElementById('f1').style.background = 'none'
    document.getElementById('abc').remove();
}