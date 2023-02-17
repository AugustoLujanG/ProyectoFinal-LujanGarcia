let canchas = [];

const selectTipo = document.getElementById("tipo");
const selectDia = document.getElementById("dia");
const selectHora = document.getElementById("hora");
const btnSumar = document.getElementById("sumar");
const forms = document.querySelectorAll("form");
let errorCancha = document.querySelector(".form_error_cancha");
let errorFecha = document.querySelector(".form_error_fecha");
let errorHora = document.querySelector(".form_error_hora");

btnSumar.addEventListener("click", (evento) => {
	evento.preventDefault();
	let cancha = new Cancha();
	cancha.tipo = selectTipo.value;
	cancha.dia = selectDia.value;

	date = new Date(cancha.dia);

	const day = date.getDay() + 1;
	cancha.hora = parseInt(selectHora.value);

	if (cancha.tipo == "Fútbol 5" && day > 0 && day < 6 && cancha.hora > 8 && cancha.hora < 13) {
		cancha.precio = 3000;
	} else {
		if (cancha.tipo == "Fútbol 5" && day > 0 && day < 6 && cancha.hora > 12 && cancha.hora < 24) {
			cancha.precio = 4500;
		} else {
			if (cancha.tipo == "Fútbol 5" && day == 6 && cancha.hora > 8 && cancha.hora < 13) {
				cancha.precio = 4000;
			} else {
				if (cancha.tipo == "Fútbol 5" && day == 6 && cancha.hora > 12 && cancha.hora < 24) {
					cancha.precio = 5000;
				} else {
					if (cancha.tipo == "Fútbol 5" && day == 7) {
						cancha.precio = 6500;
					} else {
						if (cancha.tipo == "Fútbol 8" && day > 0 && day < 6 && cancha.hora > 8 && cancha.hora < 13) {
							cancha.precio = 5300;
						} else {
							if (cancha.tipo == "Fútbol 8" && day > 0 && day < 6 && cancha.hora > 12 && cancha.hora < 24) {
								cancha.precio = 6000;
							} else {
								if (cancha.tipo == "Fútbol 8" && day == 6 && cancha.hora > 8 && cancha.hora < 13) {
									cancha.precio = 6500;
								} else {
									if (cancha.tipo == "Fútbol 8" && day == 6 && cancha.hora > 12 && cancha.hora < 24) {
										cancha.precio = 7500;
									} else {
										if (cancha.tipo == "Fútbol 8" && day == 7) {
											cancha.precio = 8000;
										} else {
											if (cancha.tipo == "Tenis descubierta" && day > 0 && day < 6 && cancha.hora > 8 && cancha.hora < 13) {
												cancha.precio = 1000;
											} else {
												if (cancha.tipo == "Tenis descubierta" && day > 0 && day < 6 && cancha.hora > 12 && cancha.hora < 24) {
													cancha.precio = 1500;
												} else {
													if (cancha.tipo == "Tenis descubierta" && day == 6 && cancha.hora > 8 && cancha.hora < 13) {
														cancha.precio = 1200;
													} else {
														if (cancha.tipo == "Tenis descubierta" && day == 6 && cancha.hora > 12 && cancha.hora < 24) {
															cancha.precio = 1800;
														} else {
															if (cancha.tipo == "Tenis descubierta" && day == 7) {
																cancha.precio = 2000;
															} else {
																if (cancha.tipo == "Tenis techada" && day > 0 && day < 6 && cancha.hora > 8 && cancha.hora < 13) {
																	cancha.precio = 1500;
																} else {
																	if (cancha.tipo == "Tenis techada" && day > 0 && day < 6 && cancha.hora > 12 && cancha.hora < 24) {
																		cancha.precio = 2000;
																	} else {
																		if (cancha.tipo == "Tenis techada" && day == 6 && cancha.hora > 8 &&
																			cancha.hora < 13) {
																			cancha.precio = 2000;
																		} else {
																			if (cancha.tipo == "Tenis techada" && day == 6 && cancha.hora > 12 && cancha.hora < 24) {
																				cancha.precio = 2500;
																			} else {
																				if (cancha.tipo == "Tenis techada" && day == 7) {
																					cancha.precio = 3000;
																				} else {
																					if (cancha.tipo == "Paddle" && day > 0 && day < 6 &&
																						cancha.hora > 8 && cancha.hora < 13) {
																						cancha.precio = 1000;
																					} else {
																						if (cancha.tipo == "Paddle" && day > 0 && day < 6 &&
																							cancha.hora > 12 && cancha.hora < 24) {
																							cancha.precio = 1300;
																						} else {
																							if (cancha.tipo == "Paddle" && day == 6 && cancha.hora > 8 && cancha.hora < 13) {
																								cancha.precio = 1200;
																							} else {
																								if (cancha.tipo == "Paddle" && day == 6 && cancha.hora > 12 && cancha.hora < 24) {
																									cancha.precio = 1500;
																								} else {
																									if (cancha.tipo == "Paddle" && day == 7) {
																										cancha.precio = 2000;
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	if (verify(selectTipo, selectDia, selectHora, errorCancha, errorFecha, errorHora) == true) {
		canchas.push(cancha);
		localStorage.setItem("canchas", JSON.stringify(canchas));
		Swal.fire("Cancha agregada!", "", "success");
		limpiarForms();
	} else {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Campos incompletos",
			confirmButtonColor: "#d33",
		});
	}
});

function showError(divInput, divError, msgError) {
	divError.innerText = msgError;
	divInput.style.borderColor = "red";
}

function verify(inputCancha, inputFecha, inputTurno, errorCancha, errorFecha, errorHora) {
	if (inputCancha.value != "Cancha" && inputFecha.value != "" && inputTurno.value != "Turno") {
		errorCancha.innerText = "";
		errorFecha.innerText = "";
		errorHora.innerText = "";
		return true;
	} else {
		if (inputCancha.value == "Cancha") {
			showError(inputCancha, errorCancha, "No puede estar vacío!");
			errorFecha.innerText = "";
			errorHora.innerText = "";
			return false;
		} else {
			if (inputFecha.value == "") {
				errorCancha.innerText = "";
				errorHora.innerText = "";
				showError(inputFecha, errorFecha, "No puede estar vacío!");

				return false;
			} else {
				if (inputTurno.value == "Turno") {
					errorCancha.innerText = "";
					errorFecha.innerText = "";
					showError(inputTurno, errorHora, "No puede estar vacío!");

					return false;
				}
			}
		}
	}
}

function limpiarForms() {
	forms.forEach((form) => {
		form.reset();
	});
}