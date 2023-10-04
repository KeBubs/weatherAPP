
// Object to store key weather information returned by API.
const database = {
    dailyFigures: {
        // Current Day, Day 2, Day 3
        currentWeather: "",
        minimum: ["","",""],
        maximum: ["", "", "",],
        sunrise: ["", "", "",],
        sunset: ["", "", "",],
        weatherCode: ["", "", "",],
    },
}

// Will be used to store the Latitude and Longitude from the users entered postcode. 
let latitude = ""
let longitude = ""

// URL to retrieve weather information, using the latitude and longitude (above), which was returned from the Postcode API
const userLocation = `"https://api.open-meteo.com/v1/forecast?${latitude}&${longitude}&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=auto&past_days=1&forecast_days=3"`

// When the refresh button is clicked, the function "getPostcode" will run.
// let userPostcodeField = document.getElementById("postcode");
// let refreshButton = document.getElementById("submit");
// refreshButton.addEventListener("click", getPostcode)

// Function to take postcode from search field and store into a variable
async function getPostcode(){
    // Where the users postcode will be stored -- userPostcodeField.value
    let userPostcode = "B261HL"
    // Log the userPostcode to check its captured correctly.
    console.log(userPostcode);
    // Fetch command to API to request Postcode information 
    let postcodeObj = await fetch(`http://api.getthedata.com/postcode/${userPostcode}`, 
    { method: 'GET',
    headers: { 'Origin': "http://127.0.0.1:5500"},
    })
    // Log the retrieved information 
    console.log(postcodeObj)
    /*
    // Parse the returned object and find the latitude and logitude.
    // Add the latitude and longitude to variables ready to use in the other API. 
    latitude = postcodeObj.result.latitude;
    longitude = postcodeObj.result.longitude;
    console.log(latitude, longitude);
    */
} 

// GET request to return post code information, such as latitude and longitude
// Retrieve latitude and longitude from file, insert into URL request


// document.addEventListener("DOMContentLoaded", getWeatherInfo)

async function getWeatherInfo(){
    const response = await fetch(userLocation);
    let data = await response.json();
    // console.log(data)
    database.dailyFigures.currentWeather = data.current_weather.temperature
    // console.log(database.currentWeather)
    for (i = 0; i < data.daily.temperature_2m_min.length; i++){
        database.dailyFigures.minimum[i] = data.daily.temperature_2m_min[i]
    }
    for (i = 0; i < data.daily.temperature_2m_max.length; i++){
        database.dailyFigures.maximum[i] = data.daily.temperature_2m_max[i]
    }
    for (i = 0; i < data.daily.sunrise.length; i++){
        database.dailyFigures.sunrise[i] = new Date(data.daily.sunrise[i]);
    }
    for (i = 0; i < data.daily.sunset.length; i++){
        database.dailyFigures.sunset[i] = new Date(data.daily.sunset[i]);
    }
    for (i = 0; i < data.daily.weathercode.length-1; i++){
        database.dailyFigures.weatherCode[i] = data.daily.weathercode[i]
    }

    // console.log(database)
}

async function changeText() {
    console.log(formData)
    await getPostcode
    await getWeatherInfo()
    let location = document.getElementById("location")

    for (let i = 0; i < database.dailyFigures.weatherCode.length; i++){
        let weatherCode = document.getElementById(`weatherCode${[i]}`);
        let sunrise = document.getElementById(`sunrise${[i]}`);
        let sunset = document.getElementById(`sunset${[i]}`);
        weatherCode.textContent = `Weather Code: ${database.dailyFigures.weatherCode[i]}`;
        sunrise.textContent = `Sunrise: ${database.dailyFigures.sunrise[i]}`;
        sunset.textContent = `Sunset: ${database.dailyFigures.sunset[i]}`;
    }
    for (let i = 0; i < database.dailyFigures.minimum.length-1; i++){
        if (i == 1){
            // Select the centre div and assign to a variable
            let divCentre = document.getElementById("centre-box");
            // Create a new P element to add to the centre div
            let p = document.createElement("p");
            // Target the current "temp1" file, so we can append above it.
            let temp1 = document.getElementById("temp1")
            // Create a new class in the newly created p element 
            p.setAttribute("id", "currentTemp");
            // Insert new P element.
            divCentre.insertBefore(p, temp1)
            // Target the newly created element
            p = document.getElementById("currentTemp");
            // Add text to the new element
            p.textContent = `Current Temperature: ${database.dailyFigures.currentWeather}`
            // Targets the P element for "Temperatures", this specifically targets based on the index. 
            let currentTemp = document.getElementById(`temp${[i]}`);
            currentTemp.textContent = `Minimum Temperature: ${database.dailyFigures.minimum[i]}. Maximum Temperature: ${database.dailyFigures.maximum[i]}`;
            continue
        } else {
            let currentTemp = document.getElementById(`temp${[i]}`);
            currentTemp.textContent = `Minimum Temperature: ${database.dailyFigures.minimum[i]}, Maximum Temperature: ${database.dailyFigures.maximum[i]}`;
        }
    }
}


// Next - format the date and time and only show the time in each panel.

// Then - Change styling to make the centre box larger than the left and right. Add text styling!

// Button to convert data from Celsius - Fahrenheit? */
