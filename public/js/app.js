const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')
const messageThree = document.querySelector('#message-three')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.innerHTML = ''
    messageThree.textContent = ''

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                return messageOne.textContent = data.error
            }
            messageOne.textContent = data.location
            messageTwo.innerHTML = data.temperature + '&deg;C ' + '<i>(H ' + data.temperatureHigh +  '&deg; / L ' + data.temperatureLow + '&deg;)</i>'
            messageThree.textContent = data.summary + ' ' + data.rainChance + '% chance of rain.'
        })
    })
})

