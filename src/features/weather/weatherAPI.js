import axios from "axios";

export const fetchWeather = async ({ latitude, longitude }) => {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;
  const response = await axios.get(API_URL);
  const result = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      icon: response.data.weather[0].icon,
      description: response.data.weather[0].description,
      temperature: response.data.main.temp,
    },
  };
  console.log("weather " + JSON.stringify(result.body));
  return result.body;
};
