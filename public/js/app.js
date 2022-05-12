import weatherCodes from '../weather-codes.json' assert { type: 'json' };

function rgbToYIQ({ r, g, b }) {
  return (r * 299 + g * 587 + b * 114) / 1000;
}

function hexToRgb(hex) {
  if (!hex || hex === undefined || hex === '') {
    return undefined;
  }

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : undefined;
}

function contrast(colorHex, threshold = 128) {
  if (colorHex === undefined) {
    return '#000';
  }

  const rgb = hexToRgb(colorHex);

  if (rgb === undefined) {
    return '#000';
  }

  return rgbToYIQ(rgb) >= threshold ? '#444444' : '#fff';
}

const weatherForm = document.querySelector('form');

const forecast = document.getElementById('forecast');

const search = document.querySelector('input');

const messageOne = document.getElementById('message1');
const messageTwo = document.getElementById('message2');

const timeText = document.getElementById('time');
const dateText = document.getElementById('date');
const tempText = document.getElementById('temperature');
const weatherText = document.getElementById('weather');
const locationText = document.getElementById('location');
const humidityText = document.getElementById('humidity');
const windSpeedText = document.getElementById('wind_speed');

const icon = document.getElementById('icon');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  messageOne.innerHTML = 'Getting weather...';
  messageTwo.innerHTML = '';
  fetch(`/weather?address=${encodeURIComponent(search.value)}`).then(
    (response) => {
      response.json().then(async (data) => {
        if (data.error) {
          // messageLocation.innerHTML = data.error;
          // messageTwo.innerHTML = '';
        } else {
          console.log(data);
          forecast.classList.add('fade-in');
          forecast.style.visibility = 'visible';
          timeText.innerHTML = data.Forecast_data.localtime.split(' ')[1];
          dateText.innerHTML = data.Forecast_data.localtime.split(' ')[0];
          tempText.innerHTML = data.Forecast_data.temperature + '°C';
          weatherText.innerHTML = data.Forecast_data.weather;
          locationText.innerHTML = data.location;
          humidityText.innerHTML = data.Forecast_data.humidity + '%';
          windSpeedText.innerHTML = data.Forecast_data.windSpeed + ' km/h';
          var bgColour = weatherCodes.find((weatherCode) => {
            return (
              weatherCode.Icon ===
              String(data.Forecast_data.icon).match(
                /\/(wsymbol_\d\d\d\d_.+)\.png/
              )[1]
            );
          }).Hexadecimal;
          document.getElementById('forecast').style.background = bgColour;
          document.getElementById('forecast').style.color = contrast(bgColour);
          icon.src = data.Forecast_data.icon;
        }
      });
    }
  );
});
