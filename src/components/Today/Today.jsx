import axios from "axios";
import React, { useEffect, useState } from "react";
import DownIcon from "./media/down.svg";
import SearchIcon from "./media/search.svg";
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

const Today = (props) => {
	const [inputtedLocation, changeInputtedLocation] = useState("");
	const [location, changeLocation] = useState("");
	const [temperature, changeTemperature] = useState(0);
	const [summary, changeSummary] = useState("");
	const [minmaxTemp, changeMinmaxTemp] = useState({ min: 0, max: 0 });
	const [windSpeed, changeWindSpeed] = useState(0);
	const [iconId, changeIconId] = useState(0);
	const [background, changeBackground] = useState({ backgroundImage: "" });
	const [lat, changeLat] = useState(props.initialLat);
	const [lon, changeLon] = useState(props.initialLon);
	console.log(lat);
	console.log(lon);

	const apiKey = process.env.REACT_APP_API_KEY;

	// Generate these from location...
	//

	// const part = "current";
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

	const setDynamicBackground = () => {
		// If array of summaries matches current summary...
		if (
			// CLOUDS group
			[
				"broken clouds",
				"few clouds",
				"overcast clouds",
				"scattered clouds",
			].includes(summary)
		) {
			changeBackground({
				backgroundImage: `url("https://images.pexels.com/photos/165488/pexels-photo-165488.jpeg")`,
			});
			// Set new image background for Today component
		} else if (["clear sky"].includes(summary)) {
			// CLEARSKY group
			changeBackground({
				backgroundImage: `url("https://images.pexels.com/photos/6479787/pexels-photo-6479787.jpeg")`,
			});
		} else if (
			// ATMOSPHERE group
			[
				"mist",
				"smoke",
				"haze",
				"sand/ dust whirls",
				"fog",
				"sand",
				"dust",
				"volcanic ash",
				"squalls",
				"tornado",
			].includes(summary)
		) {
			changeBackground({
				backgroundImage: `url("https://wallpaperaccess.com/full/1876175.jpg")`,
			});
		} else if (
			// SNOW group
			[
				"light snow",
				"snow",
				"heavy snow",
				"sleet",
				"light shower sleet",
				"shower sleet",
				"light rain and snow",
				"rain and snow",
				"light shower snow",
				"shower snow",
				"heavy shower snow",
			].includes(summary)
		) {
			changeBackground({
				backgroundImage: `url("https://images.pexels.com/photos/954713/pexels-photo-954713.jpeg")`,
			});
		} else if (
			// RAIN/DRIZZLE group
			[
				"light rain",
				"moderate rain",
				"heavy intensity rain",
				"very heavy rain",
				"extreme rain",
				"freezing rain",
				"light intensity shower rain",
				"shower rain",
				"heavy intensity shower rain",
				"ragged shower rain",
				"light intensity drizzle",
				"drizzle",
				"heavy intensity drizzle",
				"light intensity drizzle rain",
				"drizzle rain",
				"heavy intensity drizzle rain",
				"shower rain and drizzle",
				"heavy shower rain and drizzle",
				"shower drizzle",
			].includes(summary)
		) {
			changeBackground({
				backgroundImage: `url("https://wallpaperaccess.com/full/164284.jpg")`,
			});
		} else if (
			// THUNDERSTORM group
			[
				"thunderstorm with light rain",
				"thunderstorm with rain",
				"thunderstorm with heavy rain",
				"light thunderstorm",
				"thunderstorm",
				"heavy thunderstorm",
				"ragged thunderstorm",
				"thunderstorm with light drizzle",
				"thunderstorm with drizzle",
				"thunderstorm with heavy drizzle",
			].includes(summary)
		) {
			changeBackground({
				backgroundImage: `url("https://images.pexels.com/photos/3960211/pexels-photo-3960211.jpeg")`,
			});
		}
	};

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
		// setDynamicBackground();
	};

	const fetchNewLonLat = async (newLocation) => {
		let response = await axios.get(
			`http://api.openweathermap.org/geo/1.0/direct?q=${newLocation}&appid=${apiKey}`
		);
		if (response.status === 200 && response.data.length !== 0) {
			changeLat(response.data[0].lat);
			changeLon(response.data[0].lon);
		} else {
			if (response.data.length === 0) {
				alert(
					`${newLocation} could not be found! Please try again with a new location`
				);
			} else {
				alert(
					`${response.status}, failed to update weather forecast! Check the console for more details.`
				);
			}
			// TODO: Make this work...
		}
		// changeLon(response.data.lon)
	};

	const getLocation = () => {
		console.log(navigator);
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				changeLat(position.coords.latitude);
				changeLon(position.coords.longitude);
			});
		}
	};

	// Fetch weather on page load...
	useEffect(() => {
		fetchWeatherRequest();
	}, []);

	// When summary state is changed (during fetch), display new background
	useEffect(() => {
		setDynamicBackground();
	}, [summary]);

	// When lon is fetched from geolocation api, change Lat/Lon in App.js and fetch weather again
	useEffect(() => {
		props.changeCurrentLat(lat);
		props.changeCurrentLon(lon);
		fetchWeatherRequest();
	}, [lon]);

	const handleSubmit = (event) => {
		event.preventDefault();
		fetchNewLonLat(inputtedLocation);
	};

	return (
		<div
			className="box"
			style={{ backgroundImage: background.backgroundImage }}
			// https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg Sunny pic
		>
			<div className="col-fb centered gap">
				<div className="row-fb gap">
					<form onSubmit={handleSubmit}>
						<div className="row-fb gap">
							<input
								className="search"
								type="text"
								name="location"
								value={inputtedLocation}
								onChange={(input) => changeInputtedLocation(input.target.value)}
							/>
							<button
								disabled={inputtedLocation.length === 0 ? true : false}
								className="round-button search"
								type="submit"
							>
								<img
									style={{ height: "20px", width: "20px" }}
									src={SearchIcon}
									alt="Search"
								></img>
							</button>
						</div>
					</form>
					<button
						onClick={getLocation}
						className="round-button search location"
					>
						<img
							style={{ height: "20px", width: "20px" }}
							src="https://img.icons8.com/pastel-glyph/344/worldwide-location--v1.png"
							alt="Search"
						></img>
					</button>
				</div>

				<div className="col-fb glassbox">
					<p className="selected-location white-colour">{location}</p>
					<p className="date white-colour">
						{generateDateString().slice(0, -4)}
					</p>
					<div className="row-fb">
						<img
							className="weather-icon"
							src={`http://openweathermap.org/img/wn/${iconId}@2x.png`}
							alt={`${capitalizeFirstLetters(summary)} icon`}
						/>
						<div className="col-fb">
							<p className="current-temperature white-colour">
								{temperature}°C
							</p>
							<div className="row-fb gap centered white-colour">
								<div className="row-fb">
									<img
										className="temp-arrow-icon icon-filter inverted"
										src={UpIcon}
										alt="max-temp icon"
									/>
									<p className="max-temp mg-0">{minmaxTemp.max}°C</p>
								</div>
								<div className="row-fb">
									<img
										className="temp-arrow-icon icon-filter inverted"
										src={DownIcon}
										alt="min-temp icon"
									/>
									<p className="min-temp mg-0">{minmaxTemp.min}°C</p>
								</div>
							</div>
						</div>
					</div>
					<div className="row-fb summary-windspeed centered">
						<p className="summary-text mg-0 white-colour">
							{capitalizeFirstLetters(summary)}
						</p>
						<div className="row-fb gap">
							<img
								className="wind-icon icon-filter inverted"
								src={WindIcon}
								alt="windspeed icon"
							/>
							<p className="wind-speed mg-0 white-colour">{windSpeed} MPH</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Today;
