const weatherForm = document.querySelector('form')

const search =  document.querySelector('input')

const messageOne = document.getElementById('message-1')

const messageTwo = document.getElementById('message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.innerHTML = "Getting weather..."
    messageTwo.innerHTML = ""
    fetch(`/weather?address=${encodeURIComponent(search.value)}`).then(response => {
        response.json()
        .then(data => {
            if(data.error) {
                messageOne.innerHTML = data.error
                messageTwo.innerHTML = ""
            } else {
                messageOne.innerHTML = data.location
                messageTwo.innerHTML = ('Weather: '+data.Forecast_data.weather+', Temperature: '+data.Forecast_data.temperature+', Precipitation: '+data.Forecast_data.precipitation+', Humidity: '+data.Forecast_data.humidity)
            }
        })
    })
})