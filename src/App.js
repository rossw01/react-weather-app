import React from "react";
import "./App.css";
import "./components/Today/Today";
import Today from "./components/Today/Today";
import Days from "./components/WeekForecast/Days";

function App() {
	// const [location, changeLocation] = useState("");

	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	console.log(`${location}`);
	// };

	return (
		<>
			<Today location="location" />
			<Days />
		</>
	);
}

export default App;
