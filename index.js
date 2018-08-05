let form = document.querySelector('.formWithValidation');
let userCoordinates = form.querySelector('.userCoordinates');
let userResult = document.querySelector('.resultMessage');
let countries;

// on search click events
form.addEventListener('submit', function (event) {
    event.preventDefault();

    coordinatesInit();
})

// user x and y coordinates initialisation
function coordinatesInit() {
    let userX;
    let userY;

    if (userCoordinates.value.match(/\x=[0-9]*/)) {
        userX = Number(userCoordinates.value.match(/\x=[0-9]*/)[0].substring(2));

    } else if (userCoordinates.value.match(/\x=[0-9]*/) == undefined) {
        userX = 0;
    };
    if (userCoordinates.value.match(/\y=[0-9]*/)) {
        userY = Number(userCoordinates.value.match(/\y=[0-9]*/)[0].substring(2));

    } else if (userCoordinates.value.match(/\y=[0-9]*/) == undefined) {
        userY = 0;
    };

    findClosestCountry(userX, userY)

}

// get data from json
fetch('countries.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        countries = json.countries.slice();
    });

// finding country function
function findClosestCountry(x, y) {

    let minValue = null;
    let countryNumber = null;
    let changingValue;

    for (let i = 0; i < countries.length; i++) {
        changingValue = Math.sqrt(Math.pow(x - countries[i].x, 2) + Math.pow(y - countries[i].y, 2));
        if (changingValue < minValue || minValue == null) {
            minValue = changingValue;
            countryNumber = i;
        }
    }

    render(countries, countryNumber)
}
// render result
function render(countriesList, countryNumber) {
    return userResult.textContent = countriesList[countryNumber].country;
}