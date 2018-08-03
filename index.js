var form = document.querySelector('.formWithValidation');
var userCoordinates = form.querySelector('.userCoordinates');
var userResult = document.querySelector('.resultMessage');
var countries;
var userX;
var userY;
var minValue = null;
var countryNumber = null;

// on search click events
form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    coordinatesInit();
    findClosestCountry(userX, userY);
    render(countries);
})

// user x and y coordinates initialisation
function coordinatesInit() {
    if (userCoordinates.value.match(/\x=[0-9]*/)) {
        userX = Number(userCoordinates.value.match(/\x=[0-9]*/)[0].substring(2));
        
    } else if (userCoordinates.value.match(/\x=[0-9]*/) == undefined) {
        userX = null
    }
    if (userCoordinates.value.match(/\y=[0-9]*/)) {
        userY = Number(userCoordinates.value.match(/\y=[0-9]*/)[0].substring(2));
        
    } else if (userCoordinates.value.match(/\y=[0-9]*/) == undefined) {
        userY = null
    }

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
    minValue = null;
    countryNumber = null;
    if (x && y) { /*if userX and userY have value*/
        for (let i = 0; i < countries.length; i++) {
            let changingValue = Math.sqrt(Math.pow(x - countries[i].x, 2) + Math.pow(y - countries[i].y, 2))
            if (changingValue < minValue || minValue == null) {
                minValue = changingValue;
                countryNumber = i;
            }
        }
    }

    if (x == null) { /*if userX has not value*/
        
        for (let i = 0; i < countries.length; i++) {
            let changingValue = Math.abs(y - countries[i].y);
            if (changingValue < minValue || minValue == null) {
                minValue = changingValue;
                countryNumber = i;
            }
        }
    }

    if (y == null) { /*if userY has not value*/
        
        for (let i = 0; i < countries.length; i++) {
            let changingValue = Math.abs(x - countries[i].x);
            if (changingValue < minValue || minValue == null) {
                minValue = changingValue;
                countryNumber = i;
            }
        }
    }

}
// render result
function render(countriesList) {
    return userResult.textContent = countriesList[countryNumber].country;
}