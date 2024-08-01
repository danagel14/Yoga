const axios = require("axios");

const getWeather = async () => {
  try {
    const city = "tel aviv";
    const url_location = `http://api.openweathermap.org/geo/1.0/direct?appid=${process.env.WEATHER_KEY}`;
    const url_weather = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.WEATHER_KEY}`;
    let full_url = `${url_location}&q=${city}`;
    const api_res = await axios.get(full_url);

    if (api_res.data && api_res.data.length > 0) {
      const lon = api_res.data[0].lon;
      const lat = api_res.data[0].lat;

      const weather = `${url_weather}&lon=${lon}&lat=${lat}`;

      const weather_res = await axios.get(weather);
    const  temperature = {
        temp: weather_res.data.main.temp,
        icon: weather_res.data.weather[0].icon,
      };
      return temperature;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getWeather,
};