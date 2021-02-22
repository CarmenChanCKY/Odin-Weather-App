async function getWeatherData(locationName) {
  let path = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=0ac1ee9e4aed1d1a8cae5ed55854547c&units=metric`;
  let response = await fetch(path, { mode: "cors" });
  if (response.status == 200) {
    return response.json();
  }

  throw new Error("Country Not Found!");
}

async function getWeatherStrcker(weatherStatus) {
  let path = `https://api.giphy.com/v1/stickers/search?api_key=tKNZiMOnHBd4e4BaM52Ns5TZDExyzh25&limit=1&q=${weatherStatus}`;
  let response = await fetch(path, { mode: "cors" });
  if (response.status == 200) {
    return response.json();
  }

  return weatherData;
}

function loadWeatherData(locationName) {
  getWeatherData(locationName)
    .then(function (data) {
      document.getElementById("error-message").style.display = "none";
      let location = data.name;
      let temp = data.main.temp;
      let imageDescription = data.weather[0].description;
      let temp_max = data.main.temp_max;
      let temp_min = data.main.temp_min;

      document.getElementById("temperature-location").innerHTML = location;
      document.getElementById("temperature-temp").innerHTML = temp + "℃";
      document.getElementById(
        "temperature-status"
      ).innerHTML = imageDescription;
      document.getElementById("temperature-min").innerHTML =
        "L: " + temp_min + "℃";
      document.getElementById("temperature-max").innerHTML =
        "H: " + temp_max + "℃";

      let img = document.getElementById("temperature-icon");
      img.alt = imageDescription;
      getWeatherStrcker(imageDescription)
        .then(function (imageData) {
          if (imageData.data[0].images.downsized.url != "undefined") {
            img.src = imageData.data[0].images.downsized.url;
          }
        })
        .catch(function () {
          let iconPath = data.weather[0].icon;
          img.src = `http://openweathermap.org/img/wn/${iconPath}@2x.png`;
        });
    })
    .catch(function (error) {
      document.getElementById("error-message").innerHTML = error;
      document.getElementById("error-message").style.display = "flex";
    });
}

function getLocation() {
  let location = document.getElementById("search-temperature-bar").value;
  if (location.length == 0) {
    document.getElementById("error-message").innerHTML =
      "Please input a city name";
    document.getElementById("error-message").style.display = "flex";
  } else {
    loadWeatherData(location);
  }
}
