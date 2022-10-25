import React from "react";

const DayForecast = (props) => {
	return (
		<div>
			<p>High: {props.high}</p>
			<p>Low: {props.low}</p>
		</div>
	);
};

export default DayForecast;
