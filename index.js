let form = document.querySelector('.formWithValidation');
let userCoordinates = form.querySelector('.userCoordinates');
let userResult = document.querySelector('.resultMessage');
let modal = document.querySelector(".modal");
let closeButton = document.querySelector(".close-button");
let countries;

// on search click events
form.addEventListener('submit', function (event) {
    event.preventDefault();

    validateUserInput();
})

// close modal events
closeButton.addEventListener("click", openCloseModal);
window.addEventListener("click", windowOnClick);

function validateUserInput() {
    let userX;
    let userY;
    if (userCoordinates.value.match(/^x=[0-9]+$|y=[0-9]+$|x=[0-9]+[,]y=[0-9]+$|y=[0-9]+[,]+x=[0-9]+$/)) {
        if (userCoordinates.value.match(/\x=[0-9]*/)) {
            userX = Number(userCoordinates.value.match(/\x=[0-9]*/)[0].substring(2));
        };
        if (userCoordinates.value.match(/\y=[0-9]*/)) {
            userY = Number(userCoordinates.value.match(/\y=[0-9]*/)[0].substring(2));
        };
        
        findClosestCountry(userX, userY, countries)
    }else {
        let modalIsOpen = false;
        openCloseModal(modalIsOpen);
    }
}

function openCloseModal(modalIsOpen) {
    if(modalIsOpen === false) {
        modalIsOpen = true;
        modal.classList.add("show-modal");
    }else {
        modal.classList.remove("show-modal");
    }
}

function windowOnClick(event) {
    if (event.target === modal) {
        modal.classList.remove("show-modal");
    }
}


fetch('countries.json')
    .then(function (response) { 
        return response.json();
    })
    .then(function (json) {
        countries = json.countries.slice();
    });

function findClosestCountry(x, y, countriesList) {
    x = x || 0;
    y = y || 0;
    let minValue = null;
    let countryNumber = null;
    let changingValue;

    for (let i = 0; i < countries.length; i++) {
        changingValue = Math.sqrt(Math.pow(x - countriesList[i].x, 2) + Math.pow(y - countriesList[i].y, 2));
        if (changingValue < minValue || minValue == null) {
            minValue = changingValue;
            countryNumber = i;
        }
    }

    renderCountry(countries, countryNumber)
}

function renderCountry(countriesList, countryNumber) {
    return userResult.textContent = "Ближайшая страна: " + countriesList[countryNumber].country;
}