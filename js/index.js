let searchBar = document.querySelector(".searchBar");
let userInput = document.querySelector(".userInput");
let cardHeader = document.querySelector(".cardHeader");
let ressentieCard = document.querySelector(".ressentie");
let cardFooter = document.querySelector(".cardFooter");
let apiKey = "12ccc61050d46f85a31be3a1d1c71595";

let catAPI = document.querySelector(".catAPI");

searchBar.addEventListener("submit",async event => {
    event.preventDefault();
    let city = userInput.value;
    if (city){
        try{
            let weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Veuiller rentrer une ville");
    }
});

addEventListener("DOMContentLoaded",async event => { 
    let data = await getWeatherData("Toulouse");
    displayWeatherInfo(data);
})

//Input: Object
async function getWeatherData(city) {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`
    let response = await fetch(apiURL);

    console.log(response);

    if(response.ok){
        return await response.json();
    }
    throw new Error("Impossible de récuperer les données météo")
}

function displayWeatherInfo(data){
    console.log(data);
    let {name: city,
        main: {temp, humidity, feels_like, temp_min, temp_max, pressure},
        wind: {speed, deg},
        sys: {country},
        visibility: visibility,
        weather: [{description, id}]} = data;
    
    //On enleve les décimales pour les températures
    temp = temp.toFixed(0);
    feels_like = feels_like.toFixed(0);
    temp_min = temp_min.toFixed(0);
    temp_max = temp_max.toFixed(0);
    visibility = visibility / 1000;

    /* On applique la fonction upperCase qui met des majuscules au début de chaque mot
    de l'item déscription */
    description = upperCase(description);
    
    setBGbytime();
    console.log(visibility);

    document.getElementById("error").innerHTML = "";
    document.getElementById("cityName").innerHTML = city + ",";
    document.getElementById("country").innerHTML = country;
    document.getElementById("temp").innerHTML = temp + "°";
    document.getElementById("description").innerHTML = description;
    document.getElementById("tempRessentie").innerHTML = feels_like + "°";
    document.getElementById("tempminmaxValue").innerHTML = temp_min + "°" + "/" + temp_max + "°";
    document.getElementById("humidityValue").innerHTML = humidity + "%";
    document.getElementById("visibilityValue").innerHTML = visibility  + "km";
    document.getElementById("pressureValue").innerHTML = pressure + "hPa";
    document.getElementById("windSpeed").innerHTML = speed + "m/s";
    document.getElementById("windDeg").innerHTML = deg + "°";
}

//Input: str;
function displayError(message){
    document.getElementById("error").innerHTML = message;
}

//Fonction qui met une majuscule à tous les premiers mot d'une phrase
//Input: str;
//Output: str;
function upperCase(str){
    let words = str.split(" ");
    let newStr ="";
    for(let i = 0; i < words.length; i++){
        words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
        newStr = newStr + words[i] + " ";
    }
    return newStr;
}

function setBGbytime(){
    const date = new Date();
    const hour = date.getHours();
    if(hour < 9 || hour > 19){
        cardHeader.classList.add("night");
    }
    cardHeader.classList.add("day");
}


async function getCatFact(){
    let apiURL = `https://catfact.ninja/fact`;
    let response = await fetch(apiURL);
    console.log(response);
    if(response.ok){
        return await response.json();
    }
    throw new Error("Impossible de récuper un cat fact");
}

function displayErrorCat(message){
    document.getElementById("catfactOutput").innerHTML = message;
}

function displayCatFact(data){
    let {fact: fact} = data;
    document.getElementById("catfactOutput").innerHTML = fact;
}

catAPI.addEventListener("submit", async event => {
    event.preventDefault();
    try{
        let catfact = await getCatFact();
        displayCatFact(catfact);
    }
    catch(error){
        console.error(error);
        displayErrorCat(error);
    }
})

addEventListener("DOMContentLoaded",async event => { 
    let data = await getCatFact();
    displayCatFact(data);
})