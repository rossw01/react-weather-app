import axios from "axios";
import React, { useEffect, useState } from "react";
import "./today.css";

const kelvinToCelcius = (kelvin) => {
	return parseFloat(kelvin - 273.15).toFixed(1);
	// TODO: Try limit decimal to .5
};

const generateDateString = () => {
	let date = new Date();
	return date.toString().substring(0, 15);
};
// const fetchWeatherData = async (
// 	url,
// 	changeTemperature,
// 	changeLocation,
// 	changeSummary,
// 	changeMinmaxTemp
// ) => {
// 	let response = await axios.get(url);
// 	changeTemperature(kelvinToCelcius(response.data.main.temp));
// 	changeLocation(response.data.name);
// 	changeSummary(response.data.weather[0].description);
// 	changeMinmaxTemp({
// 		min: kelvinToCelcius(response.data.main.temp_min),
// 		max: kelvinToCelcius(response.data.main.temp_max),
// 	});
// };

const Today = () => {
	const [location, changeLocation] = useState("");
	const [temperature, changeTemperature] = useState(0);
	const [summary, changeSummary] = useState("");
	const [minmaxTemp, changeMinmaxTemp] = useState({ min: 0, max: 0 });
	const [windSpeed, changeWindSpeed] = useState(0);
	const [iconId, changeIconId] = useState(0);

	const apiKey = process.env.REACT_APP_API_KEY;
	const lat = 51.5072;
	const lon = 0.1276;
	// const part = "current";
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

	const fetchWeatherRequest = async () => {
		let response = await axios.get(url);
		changeWindSpeed(response.data.wind.speed);
		changeTemperature(kelvinToCelcius(response.data.main.temp));
		changeLocation(response.data.name);
		changeSummary(response.data.weather[0].description);
		changeMinmaxTemp({
			min: kelvinToCelcius(response.data.main.temp_min),
			max: kelvinToCelcius(response.data.main.temp_max),
		});
		changeIconId(response.data.weather[0].icon);
	};

	useEffect(() => {
		fetchWeatherRequest();
	}, []);

	// console.log(response.data);

	// Weather API
	// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={apiKey}

	// Geocoding API
	// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

	return (
		<div>
			<h2>Today's forecast:</h2>
			<p className="date">{generateDateString()}</p>
			<p className="current-temperature">
				Current Temperature: {temperature}°C
			</p>
			<p className="selected-location">{location}</p>
			<p className="summary-text">{summary}</p>
			<p className="min-temp">Min temp: {minmaxTemp.min}°C</p>
			<p className="max-temp">Max temp: {minmaxTemp.max}°C</p>
			<p className="wind-speed">Wind speed: {windSpeed} MPH</p>
			<img
				src={`http://openweathermap.org/img/wn/${iconId}@2x.png`}
				alt={`${summary} icon`}
			/>
		</div>
	);
};

export default Today;
