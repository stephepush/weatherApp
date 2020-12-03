let weatherApp = function() {
  
  //var lat = position.coords.latitude;
  //var lon = position.coords.longitude;
  //var apiKey = "dc8dfec1388640a990b222829171407&q=";
  //var apiKey = "a7566dd2c698dae6818c938c7e6f2177";
  const apiKey = "bca6de14eec3611372e8c6957e2aa63f";
  
  if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    //console.log(lat);
    //console.log(lon);

    //now onto the weather api

    //var weatherApi = "https://api.apixu.com/v1/current.json?key=" + apiKey + lat +","+ lon;
    //var weatherApi = "http://api.weatherstack.com/current?access_key=a7566dd2c698dae6818c938c7e6f2177&query=London,%20United%20Kingdom" + apiKey + lat +","+ lon;
    //var weatherApi = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${lat},${lon}&units=f`;
    let weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

    console.log(weatherApi);
    
    
    $.getJSON(weatherApi, function(data) {
      console.log(data);
      console.log(data.main.temp);
      //var location = data.name + ", " + data.location.region;
      //^ this can be modified if you find an api that shows region/state
      let location = data.name;
      console.log(location)
      let tempKelvin = data.main.temp;
      let kelvinToCelsius = Math.round(tempKelvin - 273.15);
      let tempCelsius = `${kelvinToCelsius}°C`;
      console.log(tempCelsius)
      let tempFahrenheit = `${Math.round(kelvinToCelsius * 9/5 + 32)}°F`;
      console.log(tempFahrenheit)
      //let tempFahrenheit = Math.round(data.current.temperature) + "°F";
      //let tempCelsius = Math.round((data.current.temperature - 32) * 0.5556) + "°C";
      console.log(tempCelsius)
      console.log(tempFahrenheit + " again!")
      //var tempCelsius = Math.round(data.current.temp_c) + "°C";
      let humidity = data.main.humidity;
      console.log(humidity)
     /* var id = data.weather[0].id; //this is for parsing through openweather maps weather codes, if I ever decided to switch back to that api... corresponds with line 68*/
      //var id = data.current.condition.code; //line 68 relies on this object now that I switched to apixu
      let id = data.weather.id; //line 68 relies on this object now that I switched to apixu
      //var descr = data.current.condition.text;
      let descr = data.weather[0].description;
      console.log(descr + "for line 29!");
      /*var conditionIcon = data.current.condition.icon;
      console.log(conditionIcon);
      var imageUrl = $('#weather-img').html('<img src= "' + conditionIcon + '">'); was usable when I used open weather app since weather conditions were paired with Erik Flowers' svg iconset. Apixu only provides png's and no svgs' lines 134 and 136 will also be commented out since it relies on these variable declarations*/
      /*var sunUp = data.sys.sunrise;
      var sunDown = data.sys.sunset;*/
      let windSpeedMph = Math.round(data.wind.speed);
      let windSpeedKph = Math.round(windSpeedMph / 0.62137);
      let deg = data.wind.deg;
      //var imgAndDescr = $("#imgAndDescr").html("<p> <span id='weather-img'>"+imageUrl+ "</span><br /><span id='descr'>" +descr+ "</span></p>")
      console.log(windSpeedMph + "mph");
      console.log(windSpeedKph + "kph");
      console.log(deg + " degrees!");
      

      function degToCompass(deg) {
        var val = Math.floor((deg / 22.5) + 0.5);
        var arr = ["North", "NNE", "NE", "ENE", "East", "ESE", "SE", "SSE", "South", "SSW", "SW", "WSW", "West", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
      }

      console.log(degToCompass(deg));
      //var backgroundImage = "url(https://i.imgur.com/DgdZaiD.jpg)";

      var weatherDescId = {
        thunderStorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232, 960],
        rain: [300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 504, 520, 521, 522, 531],
        snow: [600, 601, 602, 615, 616, 620, 621, 622],
        freezingRain: [511, 611, 612],
        clearSky: [113,1000],
        clouds: [122, 802, 803],
        cloudy: [119],
        tropicalStorm: [901],
        hurricane: [902, 962],
        windy: [905],
        fog: [701, 741]
      };

      function checkAnswer(id, weatherDescId) {
        for (var p in weatherDescId) {
          if (weatherDescId[p].indexOf(id) > -1) return p;
          
        }
        return false;
      };
      //console.log(id);
      switch (checkAnswer(id, weatherDescId)) {
      
        case 'Moderate or heavy rain with thunder':
          backgroundImage = "url(https://res.cloudinary.com/dmkct6wfu/image/upload/v1500181651/weather_app/rain_cogy1e.jpg)";
          break;
        case 'rain':
          backgroundImage = "url(https://res.cloudinary.com/dmkct6wfu/image/upload/v1500181651/weather_app/rain_cogy1e.jpg)";
          break;
        case 'snow':
          backgroundImage = "url(https://res.cloudinary.com/dmkct6wfu/image/upload/v1500181653/weather_app/snow_bz1a2o.jpg)";
          break;
        case 'freezingRain':
          backgroundImage = "url(https://res.cloudinary.com/dmkct6wfu/image/upload/v1500181649/weather_app/freezingRain_vuihob.jpg)";
          break;
        case 'clearSky':
          backgroundImage = "url(https://res.cloudinary.com/dmkct6wfu/image/upload/v1500181646/weather_app/bright-sun-in-blue-skyClearSky_cjvpov.jpg)";
          break;
        case 'clouds':
          backgroundImage = "url(https://res.cloudinary.com/dmkct6wfu/image/upload/v1500181651/weather_app/overcast_dwx1hb.jpg)";
          break;
        case 'cloudy':
          backgroundImage = "url(https://res.cloudinary.com/dmkct6wfu/image/upload/v1500181653/weather_app/partlyCloudy_ie4hxo.jpg)";
          break;
        case 'tropicalStorm':
          backgroundImage = "url(https://res.cloudinary.com/dmkct6wfu/image/upload/v1500181653/weather_app/tropicalStorm_q47ih3.jpg)";
          break;
        case 'hurricane':
          backgroundImage = "url(https://res.cloudinary.com/dmkct6wfu/image/upload/v1500181654/weather_app/hurricane_q8zh6n.jpg)";
          break;
        case 'windy':
          backgroundImage = "url(https://res.cloudinary.com/dmkct6wfu/image/upload/v1500181647/weather_app/dandelion-1335575wind_kefgit.jpg)";
          break;
        case 'fog':
          backgroundImage = "url(https://res.cloudinary.com/dmkct6wfu/image/upload/v1500181650/morning-mist-1535967_1920mistFog_bwxiqw.jpg)";
          break;
          /*case objectProperty:
          	backgroundImage = "url(insertLink)";
          	break;
          case objectProperty:
          	backgroundImage = "url(insertLink)";
          	break;*/
        default:
          backgroundImage = "url(https://res.cloudinary.com/dmkct6wfu/image/upload/v1500181648/weather_app/flying-seeds-1533742wind_gug2s0.jpg)";
          break;
      };

      $("body").css({
        "background-image": backgroundImage,
        "background-repeat": "no-repeat",
        "background-size": "cover",
        "width": "100%",
        "height": "100%",
      });
      $('#location').text("Current Conditions in " + location + ":");
      $('#tempFar').text(tempFahrenheit);
      $('#tempCel').text(tempCelsius);
      $('#humidity').text("Humidity: " + humidity + "%");
      $('#descr').text(descr);
      //$('#sunUp').text(sunUp);
      //$('#sunDown').text(sunDown);
      //$('#weather-img').html("<i class='" + imageUrl + "'></i>"); relies on line 32
      $('#windSpeedMph').text("Wind Speed/Direction: " + windSpeedMph + "mph " + degToCompass(deg));
      //imgAndDescr; relies on line 32
      $('#windSpeedKph').text("Wind Speed/Direction: " + windSpeedKph + "kph " + degToCompass(deg));

      $("button").click(function() {
        //$("#tempCel, #tempFar, #textCel, #textFar, #windSpeedMph, #windSpeedKph").toggle();
        $("#tempFar, #tempCel, #textFar, #textCel, #windSpeedKph, #windSpeedMph").toggle();
      });
    }); //end of weather Api
 }); //end of geo api
}; //end of weather app
};

$(document).ready(function() {
  weatherApp();
}); //end of document.ready function