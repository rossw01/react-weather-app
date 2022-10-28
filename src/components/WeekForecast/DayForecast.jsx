import date from "date-and-time";
import React from "react";
import "./DayForecast.css";

const capitalizeFirstLetters = (string) => {
	let arr = string.split(" ").map((word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	});
	return arr.join(" ");
};

const getDayName = (dateString) => {
	// https://www.npmjs.com/package/date-and-time
	return date.parse(dateString, "YYYY-MM-DD").toString().substring(0, 11);
};

const DayForecast = (props) => {
	return (
		<div className="card">
			<p>{getDayName(props.date)}</p>
			<hr className="horizontal-line" />
			<div className="high-low">
				<p className="mg-0">High: {props.high}°C</p>
				<p className="mg-0">Low: {props.low}°C</p>
			</div>

			<p className="mg-0 wind">Wind: {props.wind}MPH</p>
			<img
				className="weather-img centered"
				src={`http://openweathermap.org/img/wn/${props.iconId}@2x.png`}
				alt={`${capitalizeFirstLetters(props.summary)} icon`}
			/>
			<p className="mg-0 minh-3">{capitalizeFirstLetters(props.summary)}</p>
			<br />
		</div>
	);
};

export default DayForecast;
