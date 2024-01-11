const button = document.querySelector(".button");
const input = document.querySelector(".inputValue");
const name = document.querySelector(".name");
const temp = document.querySelector(".temp");
const desc = document.querySelector(".desc");
const display = document.querySelector(".display");
const img = document.querySelector(".img");
const apiKey = "1b60cd4156c14352a4f160604241101";
let forecastContainer = document.querySelector(".forecast");


button.addEventListener("click", function(){
    // fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${input.value}`)
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${input.value}&days=3`)
        .then(response => response.json())
        //.then(data => console.log(data))
        .then(data=>{
            let nameValue = data.location.name;
            let tempValueF = data.current.temp_f;
            let tempValueC = data.current.temp_c;
            let descValue = data.current.condition.text;
            let descImg = data.current.condition.icon;

            // Update the DOM elements with the retrieved data
        name.textContent = `City: ${nameValue}`;
        temp.textContent = `Temperature: ${tempValueF}°F / ${tempValueC}°C`;
        desc.textContent = `Condition: ${descValue}`;
        img.src = `https:${descImg}`;

            // Forecast data
        const forecastDays = data.forecast.forecastday;

        // Clear previous forecast content
        forecastContainer.innerHTML = "";

        // Loop through forecast data and append to the forecast container
        forecastDays.forEach(day => {
            console.log(day);
            
            const forecastItem = document.createElement("div");
            forecastItem.classList.add("forecast-item");

            const date = new Date(day.date);
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

            forecastItem.innerHTML = `
            <p>${dayName}</p>
            <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            <p>Max Temp: ${day.day.maxtemp_f}°F / ${day.day.maxtemp_c}°C</p>
            <p>Min Temp: ${day.day.mintemp_f}°F / ${day.day.mintemp_c}°C</p>
           
          `;
          
            forecastContainer.appendChild(forecastItem);
        });
    })
    .catch(err=> {
        alert("Wrong city name!");
        console.error(err);
    });
    console.log("button-clicked")
})