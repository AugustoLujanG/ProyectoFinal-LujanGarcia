let amountProduct = document.getElementById('count-product');
let carro = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarCounter() {
    let countProduct = 0;
    carro.forEach((item) => countProduct += item.cantidad)
    amountProduct.innerHTML = countProduct
}

actualizarCounter();