
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

const baseUrl = window.location.origin

fetch(`${baseUrl}/weather?address=Hyderabad`)

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    msgOne.textContent = "Loading...";
    msgTwo.textContent = "";

    fetch(`${baseUrl}/weather?address=`+search.value).then((response) => {
        response.json().then((data) => {
            if(data.error){
                msgOne.textContent = data.error;
            }else{
                msgOne.textContent = data.forecast;
                msgTwo.textContent = data.location;
            }
        });
    });
})






















