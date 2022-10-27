import axios from "axios";
import React, { useEffect, useState } from "react";
import DayForecast from "./DayForecast";
import "./Days.css";

const kelvinToCelcius = (kelvin) => {
	return parseFloat(kelvin - 273.15).toFixed(1);
	// TODO: Try limit decimal to .5
};

const Days = (props) => {
	const [days, changeDays] = useState([]);
	const [lat, changeLat] = useState(props.lat);
	const [lon, changeLon] = useState(props.lon);

	const apiKey = process.env.REACT_APP_API_KEY;
	let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

	const fetchWeatherRequest = async () => {
		let fetched = await axios.get(url);
		// console.log(fetched);
		changeDays(fetched.data.list);
	};

	// Date/Day Picture SummaryText Max/Min temp Windspeed
	const buildDays = () => {
		let existingDays = days
			.filter((day) => {
				// Get the dateTime string, then check the last 8 chars (the time) against midday "12:00:00"
				return day.dt_txt.slice(-8) === "12:00:00";
				// Filter out all results besides midday results
				// TODO: This is going to show the same day as today if the program is run before midday :(
			})
			.map((day, i) => {
				return (
					<DayForecast
						key={i}
						date={day.dt_txt.substring(0, 10)}
						high={kelvinToCelcius(day.main.temp_max)}
						low={kelvinToCelcius(day.main.temp_min)}
						summary={day.weather[0].description}
						iconId={day.weather[0].icon}
						wind={day.wind.speed}
						className="day-forecast"
					/>
				);
			});
		return existingDays;
	};

	const setNewLatLon = () => {
		changeLat(props.lat);
		changeLon(props.lon);
	};

	useEffect(() => {
		fetchWeatherRequest();
	}, []);

	useEffect(() => {
		// FIXME: Not being activated on props.currentLocation change

		// On inputted location change by the user, fetch again...
		setNewLatLon();
		fetchWeatherRequest();
	}, [props.lat]);

	return (
		<div>
			<div className="day-forecast-display">{buildDays()}</div>
		</div>
	);
	// return <div></div>;
};

export default Days;
