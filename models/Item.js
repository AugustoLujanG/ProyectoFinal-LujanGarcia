class Item {
    cancha; /// de tipo Cancha
    cantidad;

    constructor(cancha, cantidad) {
        this.cancha = cancha;
        this.cantidad = cantidad;
    }

    precioTotal() {
        return this.cantidad * this.cancha.precio;
    }
}