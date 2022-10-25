import "./App.css";
import "./components/Today/Today";
import Today from "./components/Today/Today";
import Days from "./components/WeekForecast/Days";

function App() {
	return (
		<>
			<h1>Weather App</h1>
			<Today />
			<Days />
		</>
	);
}

export default App;
