//Вешаем слушатели.
document.querySelector('.random__panel > button').addEventListener('click', randomColor);
document.querySelector('.random-width > input').addEventListener('input', sizeValue);
document.querySelector('.random-height > input').addEventListener('input', sizeValue);

function sizeValue() {
    let width = document.getElementById("width").value;
    let height = document.getElementById("height").value;
    document.querySelectorAll(".random__result")[0].style.width  = `${width}px`;
    document.querySelectorAll(".random__result")[0].style.height = `${height}px`;
}

function randomColor() {
    const Red   = Math.floor(Math.random() * 256);
    const Green = Math.floor(Math.random() * 256);
    const Blue  = Math.floor(Math.random() * 256);
    document.querySelectorAll(".random__result")[0].style.background = `rgb(${Red}, ${Green}, ${Blue})`;
}


    
