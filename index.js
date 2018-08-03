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
    console.log('clicked on search');
    
    coordinatesInit();
    findClosestCountry();
    render();
})

// user x and y coordinates initialisation
function coordinatesInit() {
    if(userCoordinates.value.match(/\x=[0-9]*/)) {
        userX = Number(userCoordinates.value.match(/\x=[0-9]*/)[0].substring(2));
        console.log((userX));
    }else if (userCoordinates.value.match(/\x=[0-9]*/) == undefined) {
        userX = null
    }
    if(userCoordinates.value.match(/\y=[0-9]*/)) {
        userY = Number(userCoordinates.value.match(/\y=[0-9]*/)[0].substring(2));
        console.log((userY));
    }else if (userCoordinates.value.match(/\y=[0-9]*/) == undefined) {
        userY = null
    }

}

// get data from json
fetch('countries.json')
    .then(function(response) { return response.json(); })
    .then(function(json) {
        countries = json.countries.slice();
});

// finding country function
    function findClosestCountry() {
        minValue = null;
        countryNumber = null;
        if(userX && userY) { /*if userX and userY have value*/
            for(var i = 0; i < countries.length; i++) {
                let a = Math.sqrt(Math.pow(userX - countries[i].x, 2) + Math.pow(userY - countries[i].y, 2))
                if(a < minValue || minValue == null) {
                    minValue = a;
                    countryNumber = i;
                }
            }
        }
        
        if(userX == null) { /*if userX has not value*/
            console.log("userX")
            for(var i = 0; i < countries.length; i++) {
                let a = Math.abs(userY - countries[i].y);
                if (a < minValue || minValue == null) {
                    minValue = a;
                    countryNumber = i;
                }
            }
            
        }
        if(userY == null) { /*if userY has not value*/
            console.log("userY")
            for(var i = 0; i < countries.length; i++) {
                let a = Math.abs(userX - countries[i].x);
                if (a < minValue || minValue == null) {
                    minValue = a;
                    countryNumber = i;
                }
            }
        }
        
    }
// render result
function render() {
    return userResult.textContent = countries[countryNumber].country;
}