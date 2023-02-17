const ciudad_api = document.getElementById("ciudad-api");
const fecha_api = document.getElementById("fecha-api");
const hora_api = document.getElementById("hora-api");
const temperatura_api = document.getElementById("temperatura-api");
const informacion_api = document.getElementById("informacion-api");
const humedad_api = document.getElementById("humedad-api");
const viento_api = document.getElementById("viento-api");
const icono_api = document.getElementsByClassName("ciudad");
const fondo = document.getElementById("fondos");

const claveAPI = "6c0d3feb4e345e0f7d513c4a3e82e61f";

function clima() {
  let latitud = -34.542444963342604;
  let longitud = -58.449545651847;
  let url = `https://api.openweathermap.org/data/2.5/weather?&lat=${latitud}&lon=${longitud}&appid=${claveAPI}&lang=es&units=metric`;

  fetch(url)
    .then(respuesta => respuesta.json())
    .then(info => {
      let fecha = new Date(info.dt * 1000);

      fecha_api.textContent = (fecha.getDate() < 10 ? '0' : '') + fecha.getDate() + "/" + ((fecha.getMonth() + 1) < 10 ? '0' : '') + (fecha.getMonth() + 1) + "/" + fecha.getFullYear() // + " " + 

      hora_api.textContent = (fecha.getHours() < 10 ? '0' : '') + fecha.getHours() + ":" + (fecha.getMinutes() < 10 ? '0' : '') + fecha.getMinutes() + ":" + (fecha.getSeconds() < 10 ? '0' : '') + fecha.getSeconds();

      let ciudad = info.name;
      ciudad_api.textContent = ciudad;

      let temperatura = info.main.temp;
      temperatura_api.textContent = `${temperatura} °C`

      let informacion = info.weather[0].description;
      informacion_api.textContent = informacion.charAt(0).toUpperCase() + informacion.slice(1);

      let humedad = info.main.humidity;
      humedad_api.textContent = `${humedad} %`

      let viento = ((info.wind.speed) * 3.6).toFixed(2);
      viento_api.textContent = `${viento} Km/h`;

      let icono = info.weather[0].icon;

      let img = document.createElement("img");
      img.src = `http://openweathermap.org/img/wn/${icono}.png`;
      img.classList.add("icono")
      icono_api[0].appendChild(img);

      // ver codigos de icono en https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2

      if (info.weather[0].icon == '01d') {
        fondo.style.background = `url(../images/clima/despejado.png) center center / cover no-repeat`
      } else {
        if (info.weather[0].icon == '01n') {
          fondo.style.background = `url(../images/clima/despejado-noche.jpg) center center / cover no-repeat`
        } else {
          if (info.weather[0].icon == '02d') {
            fondo.style.background = `url(../images/clima/despejado-nubes.jpg) center center / cover no-repeat`
          } else {
            if (info.weather[0].icon == '02n') {
              fondo.style.background = `url(../images/clima/despejado-nubes-noche.jpg) center center / cover no-repeat`
            } else {
              if (info.weather[0].icon == '03d' || info.weather[0].icon == '04d') {
                fondo.style.background = `url(../images/clima/nublado.jpg) center center / cover no-repeat`
              } else {
                if (info.weather[0].icon == '03n' || info.weather[0].icon == '04n') {
                  fondo.style.background = `url(../images/clima/nublado-noche.webp) center center / cover no-repeat`
                } else {
                  if (info.weather[0].icon == '09d' || info.weather[0].icon == '10d') {
                    fondo.style.background = `url(../images/clima/lluvia.jpg) center center / cover no-repeat`
                  } else {
                    if (info.weather[0].icon == '09n' || info.weather[0].icon == '10n') {
                      fondo.style.background = `url(../images/clima/lluvia-noche.jpg) center center / cover no-repeat`
                    } else {
                      if (info.weather[0].icon == '11d') {
                        fondo.style.background = `url(../images/clima/tormenta.jpg) center center / cover no-repeat`
                      } else {
                        if (info.weather[0].icon == '11n') {
                          fondo.style.background = `url(../images/clima/tormenta-noche.jpg) center center / cover no-repeat`
                        } else {
                          if (info.weather[0].icon == '50d') {
                            fondo.style.background = `url(../images/clima/neblina.jpg) center center / cover no-repeat`
                          } else {
                            fondo.style.background = `url(../images/clima/neblina-noche.jpg) center center / cover no-repeat`
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
    })
    .catch(error => console.error(error));
}

clima();