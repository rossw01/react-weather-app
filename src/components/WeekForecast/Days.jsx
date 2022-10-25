import axios from "axios";
import React, { useEffect, useState } from "react";
import DayForecast from "./DayForecast";

const Days = () => {
	const [days, changeDays] = useState([]);

	const apiKey = process.env.REACT_APP_API_KEY;
	const lat = 51.5072;
	const lon = 0.1276;
	const requestDays = 6;
	let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${requestDays}&appid=${apiKey}`;

	const fetchWeatherRequest = async () => {
		let fetched = await axios.get(url);
		// console.log(fetched);
		changeDays(fetched.data.list);
	};

	// Date/Day Picture SummaryText Max/Min temp Windspeed
	const buildDays = () => {
		let existingDays = days.map((day, i) => {
			return (
				<DayForecast key={i} high={day.main.temp_max} low={day.main.temp_min} />
			);
		});
		return existingDays;
	};

	useEffect(() => {
		fetchWeatherRequest();
	}, []);

	return <div>{buildDays()}</div>;
	// return <div></div>;
};

export default Days;
