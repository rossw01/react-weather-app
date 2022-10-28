import React, { useState } from "react";
import "./App.css";
import "./components/Today/Today";
import Today from "./components/Today/Today";
import Days from "./components/WeekForecast/Days";

function App() {
	// Values are set from Today.js
	const [currentLat, changeCurrentLat] = useState(5.15);
	const [currentLon, changeCurrentLon] = useState(0.15);

	return (
		<>
			<Today
				initialLat={currentLat}
				initialLon={currentLon}
				changeCurrentLat={changeCurrentLat}
				changeCurrentLon={changeCurrentLon}
			/>
			<Days lat={currentLat} lon={currentLon} />
			<p className="footer centered"> © Diana, Ross, Viorel - 2022</p>
		</>
	);
}

export default App;
