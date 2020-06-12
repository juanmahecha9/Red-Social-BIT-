const show= (boton) => {
    const imgTag = boton.parentNode.querySelector('.imagen'); //selecciona los archivos imagen
    const file = boton.files[0]; //archivo
    const reader = new FileReader(); //nuevo archivo

    reader.onloadend = function () {
        imgTag.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        imgTag.src = "";
    }
}