import axios from "axios";
import React, { useEffect, useState } from "react";
import DownIcon from "./media/down.svg";
import UpIcon from "./media/up.svg";
import WindIcon from "./media/windspeed.svg";
import "./Today.css";

const capitalizeFirstLetters = (string) => {
	// Capitalises first letter of each words in string
	let arr = string.split(" ").map((word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	});
	return arr.join(" ");
};

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
		<div className="box">
			<div>
				<div className="col-fb centered">
					<p className="selected-location">{location}</p>
					<p className="date">{generateDateString().slice(0, -4)}</p>
					<div className="row-fb">
						<img
							className="weather-icon"
							src={`http://openweathermap.org/img/wn/${iconId}@2x.png`}
							alt={`${capitalizeFirstLetters(summary)} icon`}
						/>
						<div className="col-fb">
							<p className="current-temperature">{temperature}°C</p>
							<div className="row-fb gap centered">
								<div className="row-fb">
									<img
										className="temp-arrow-icon icon-filter"
										src={UpIcon}
										alt="max-temp icon"
									/>
									<p className="max-temp mg-0">{minmaxTemp.max}°C</p>
								</div>
								<div className="row-fb">
									<img
										className="temp-arrow-icon icon-filter"
										src={DownIcon}
										alt="min-temp icon"
									/>
									<p className="min-temp mg-0">{minmaxTemp.min}°C</p>
								</div>
							</div>
						</div>
					</div>
					<div className="row-fb summary-windspeed">
						<p className="summary-text mg-0">
							{capitalizeFirstLetters(summary)}
						</p>
						<div className="row-fb gap">
							<img
								className="wind-icon icon-filter"
								src={WindIcon}
								alt="windspeed icon"
							/>
							<p className="wind-speed mg-0">{windSpeed} MPH</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Today;
