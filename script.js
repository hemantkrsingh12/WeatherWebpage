const temp = document.getElementById("temp");
const cityname = document.getElementById("cityname");
const humid = document.querySelector(".humid");
const windspeed = document.querySelector(".speed");
const inputval = document.getElementById("inputval");
const images = document.getElementById("images");
const weather = document.querySelector(".weather");
const btn = document.querySelector(".btn");
 const error=document.getElementById("invalid");

console.log(images);
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b461836ff8mshd2080d1c25e1702p12a5e6jsn2751df18275b",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

async function getWeather(city) {
  let text = city;
  cityname.innerHTML = text.toUpperCase();
  const response = await fetch(
    "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city,
    options
  );
  const jsondata = await response.json();
  console.log(jsondata);
  console.log(response.status);
  if (response.status == 400) {
    error.style.display = "block";
    weather.style.display = "none";
  } else {
    error.style.display = "none";
    weather.style.display = "block";
    showdata(jsondata, city);
  }
}

function showdata(jsondata) {
  temp.innerHTML = `${jsondata.temp} °c`;
  humid.innerHTML = jsondata.humidity;
  windspeed.innerHTML = jsondata.wind_speed;
  if (jsondata.temp < 10) {
    images.src = "weather-app-img/images/snow.png";
  } else if (jsondata.temp > 11 && jsondata.temp <= 20) {
    images.src = "weather-app-img/images/mist.png";
  } else if (jsondata.temp >= 21 && jsondata.temp <= 25) {
    images.src = "weather-app-img/images/rain.png";
  } else if (jsondata.temp >= 26 && jsondata.temp <= 30) {
    images.src = "weather-app-img/images/drizzle.png";
  } else {
    images.src = "weather-app-img/images/clear.png";
  }
}
btn.addEventListener("click", () => {
  getWeather(inputval.value);
});

inputval.addEventListener("keypress",(event)=>{
    console.log(event);
    if (event.key=== "Enter") {
        getWeather(inputval.value);
      }
   
});
