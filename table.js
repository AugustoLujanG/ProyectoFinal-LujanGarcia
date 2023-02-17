const tabla = document.getElementById('items');
const selectCanchas = document.getElementById('canchas')
const btnAgregar = document.getElementById('agregar');
const btnVaciar = document.getElementById('vaciar');
const total = document.getElementById('total');
const btnConfirmar = document.getElementById("confirmar");

let amountProduct = document.getElementById('count-product');
let carrito = JSON.parse(localStorage.getItem("carrito"));

let nametarjeta = document.querySelector('.tarjeta_detalle-nombre');
let nameInput = document.querySelector('#tarjetaholder');
let nameErrorDiv = document.querySelector('.form_tarjetatitular--error');

let numbertarjeta = document.querySelector('.tarjeta_numero');
let numberInput = document.querySelector('#tarjetaNumber');
let numberErrorDiv = document.querySelector('.form_inputnumero--error');

let monthtarjeta = document.querySelector('.tarjeta_mes');
let monthInput = document.querySelector('#tarjetaMonth');
let monthErrorDiv = document.querySelector('.form_input-mm--error');

let yeartarjeta = document.querySelector('.tarjeta_año');
let yearInput = document.querySelector('#tarjetaYear');
let yearErrorDiv = document.querySelector('.form_input-yy--error');

let cvvtarjeta = document.querySelector('.tarjeta_reverso_cvv');
let cvvInput = document.querySelector('#tarjetaCvv');
let cvvErrorDiv = document.querySelector('.form_input-cvv--error');

function actualizarCounter() {
    let countProduct = 0;
    carrito.forEach((item) => countProduct += item.cantidad)
    amountProduct.innerHTML = countProduct
}

allEventListeners();

function allEventListeners() {
    window.addEventListener('DOMContentLoaded', traerItems);

    btnVaciar.addEventListener('click', vaciarCarrito);

    btnAgregar.addEventListener('submit', (e) => {
        e.preventDefault();
        const canchaSelected = canchas[selectCanchas.value];
        if (canchas.length > 0 && carrito.find((item) => {
                return (item.cancha.tipo === canchaSelected.tipo && item.cancha.hora === canchaSelected.hora)
            }) === undefined) {
            const nuevoItem = new Item(canchaSelected, 1);
            carrito.push(nuevoItem);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            newRow(nuevoItem);
        }
    });
}

function traerItems() {
    canchas = JSON.parse(localStorage.getItem('canchas')) || []
    dropdown();
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    actualizarTablaCarrito();
}

function dropdown() {
    canchas.forEach((canch) => {
        const option = document.createElement('option');
        option.innerText = `${canch.tipo}: ${canch.dia} - ${canch.hora}hs - $${canch.precio}`;
        option.value = canchas.indexOf(canch);
        selectCanchas.appendChild(option);
    });
}

function actualizarTablaCarrito() {
    tabla.innerHTML = '';
    total.innerText = 0;
    carrito.forEach((item) => {
        newRow(item);
    });
}

function newRow(item) {
    const row = document.createElement('tr');
    row.className = "text-center table-dark"
    let td = document.createElement('td');
    const posCarrito = carrito.indexOf(item);
    td.textContent = item.cancha.tipo;
    row.appendChild(td);

    td = document.createElement('td');
    td.textContent = item.cancha.dia;
    row.appendChild(td);

    td = document.createElement('td');
    td.textContent = item.cancha.hora;
    row.appendChild(td);

    td = document.createElement('td');
    td.textContent = item.cantidad;
    row.appendChild(td);

    const incrementar = document.createElement('button');
    incrementar.className = 'btn btn-primary';
    incrementar.style = 'margin: 0px 10px'
    incrementar.innerText = '+';

    const descontar = document.createElement('button');
    descontar.className = 'btn btn-primary';
    descontar.style = 'padding: 6px 15px'
    descontar.innerText = '-';

    incrementar.onclick = () => {
        carrito[posCarrito].cantidad++;
        actualizarTablaCarrito();
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    descontar.onclick = () => {
        if (carrito[posCarrito].cantidad > 1) {
            carrito[posCarrito].cantidad--;
        } else {
            carrito.splice(posCarrito, 1);
        }
        actualizarTablaCarrito();
        actualizarCounter()
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    td.appendChild(incrementar);
    td.appendChild(descontar);
    row.appendChild(td);

    td = document.createElement('td');
    td.textContent = "$" + item.cancha.precio;

    row.appendChild(td);

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn btn-danger';
    btnEliminar.innerText = 'Eliminar';

    btnEliminar.onclick = () => {
        carrito.splice(posCarrito, 1);
        actualizarTablaCarrito();
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCounter()
    }

    td = document.createElement('td')
    td.appendChild(btnEliminar);
    row.appendChild(td);
    tabla.appendChild(row);

    total.innerText = "$" + carrito.reduce((acumulador, item) => acumulador + item.cancha.precio * item.cantidad, 0);
    actualizarCounter()
}

function vaciarCarrito() {
    Swal.fire({
        title: `Esta a punto de vaciar el carrito, continuar?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#45AC42',
        cancelButtonColor: '#d33',
    }).then((result) => {
        if (result.value) {
            carrito = [];
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarTablaCarrito();
            Swal.fire({
                title: "Carrito vaciado!",
                icon: "success"
            });
        }
        actualizarCounter()
    })
}

nameInput.addEventListener('input', () => {
    if (nameInput.value == '') {
        nametarjeta.innerText = 'TITULAR'
    } else {
        nametarjeta.innerText = nameInput.value;
    }
});

numberInput.addEventListener('input', () => {
    let regExp = /[A-z]/g;
    if (regExp.test(numberInput.value)) {
        showError(numberInput, numberErrorDiv, 'Sólo números!');
    } else {
        numberInput.value = numberInput.value.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim();
        showError(numberInput, numberErrorDiv, '', false);
    }
    numbertarjeta.innerText = numberInput.value;

    if (numberInput.value == '') {
        numbertarjeta.innerText = '0000 0000 0000 0000';
    }
});

monthInput.addEventListener('input', () => {
    monthtarjeta.innerText = monthInput.value;
    validateLetters(monthInput, monthErrorDiv);
});

yearInput.addEventListener('input', () => {
    yeartarjeta.innerText = yearInput.value;
    validateLetters(yearInput, yearErrorDiv);
});

cvvInput.addEventListener('input', () => {
    cvvtarjeta.innerText = cvvInput.value;
    validateLetters(cvvInput, cvvErrorDiv);
});

let confirmBtn = document.querySelector('.form_submit')

let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let CvvValidation = false;
let formSection = document.querySelector('.form');
let thanksSection = document.querySelector('.gracias');

confirmBtn.addEventListener('click', event => {
    event.preventDefault();

    if (verifyIsFilled(nameInput, nameErrorDiv)) {
        nameValidation = true;
    } else {
        nameValidation = false;
    }
    if (verifyIsFilled(numberInput, numberErrorDiv) == true) {
        if (numberInput.value.length == 19) {
            showError(numberInput, numberErrorDiv, '', false);
            numberValidation = true;
        } else {
            showError(numberInput, numberErrorDiv, 'Número incorrecto!');
            numberValidation = false;
        }
    }

    if (verifyIsFilled(monthInput, monthErrorDiv)) {
        if (parseInt(monthInput.value) > 0 && parseInt(monthInput.value) <= 12) {
            showError(monthInput, monthErrorDiv, '', false);
            monthValidation = true;
        } else {
            showError(monthInput, monthErrorDiv, 'Mes incorrecto!');
            monthValidation = false;
        }
    }
    if (verifyIsFilled(yearInput, yearErrorDiv)) {
        if (parseInt(yearInput.value) > 22 && parseInt(yearInput.value) <= 27) {
            showError(yearInput, yearErrorDiv, '', false);
            yearValidation = true;
        } else {
            showError(yearInput, yearErrorDiv, 'Año inorrecto!');
            yearValidation = false;
        }
    }

    if (verifyIsFilled(cvvInput, cvvErrorDiv)) {
        if (cvvInput.value.length == 3) {
            showError(cvvInput, cvvErrorDiv, '', false);
            CvvValidation = true;
        } else {
            showError(cvvInput, cvvErrorDiv, 'CVV incorrecto');
            CvvValidation = false;
        }
    }

    if (nameValidation == true && numberValidation == true && monthValidation == true && yearValidation == true && CvvValidation == true) {

        if (carrito.length != []) {
            Swal.fire('Finalizaste la compra!', '', 'success')
            carrito = [];
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarTablaCarrito();
        } else {
            Swal.fire("No hay canchas agregadas, no hemos generado un cobro");
        }
        actualizarCounter()
        formSection.style.display = 'none';
        thanksSection.style.display = 'block';
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campos incorrectos',
            confirmButtonColor: '#d33',
        })
    }
});

function showError(divInput, divError, msgError, show = true) {
    if (show) {
        divError.innerText = msgError;
        divInput.style.borderColor = '#FF0000';
    } else {
        divError.innerText = msgError;
        divInput.style.borderColor = 'hsl(270, 3%, 87%)';
    }
}

function verifyIsFilled(divInput, divError) {
    if (divInput.value.length > 0) {
        showError(divInput, divError, "", false);
        return true;
    } else {
        showError(divInput, divError, "No puede estar vacío!");
        return false;
    }
}

function validateLetters(input, divError) {
    let regExp = /[A-z]/g;
    if (regExp.test(input.value)) {
        showError(input, divError, 'Sólo números!');
    } else {
        showError(input, divError, '', false);
    }
}