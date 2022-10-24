import axios from "axios";
import React, { useEffect, useState } from "react";

const kelvinToCelcius = (kelvin) => {
	return parseFloat(kelvin - 273.15).toFixed(1);
	// TODO: Try limit decimal to .5
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

	const apiKey = "accb7007889c6740a6b7122b6545846a";
	const lat = 43.737105140552416;
	const lon = 7.421431961679462;
	// const part = "current";
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

	const fetchWeatherRequest = async () => {
		let response = await axios.get(url);
		changeTemperature(kelvinToCelcius(response.data.main.temp));
		changeLocation(response.data.name);
		changeSummary(response.data.weather[0].description);
		changeMinmaxTemp({
			min: kelvinToCelcius(response.data.main.temp_min),
			max: kelvinToCelcius(response.data.main.temp_max),
		});
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
			<p className="current-temperature">{temperature}</p>
			<p className="selected-location">{location}</p>
			<p className="summary-text">{summary}</p>
			<p className="min-temp">Min temp: {minmaxTemp.min}</p>
			<p className="max-temp">Max temp: {minmaxTemp.max}</p>
		</div>
	);
};

export default Today;
