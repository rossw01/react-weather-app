import "./App.css";
import "./components/Today/Today";
import Today from "./components/Today/Today";
import Days from "./components/WeekForecast/Days";

function App() {
	return (
		<>
			<div class="row-fb">
				<h1>Weather App</h1>
				<form>
					<label>
						Location:
						<input type="text" name="location" />
					</label>
					<input type="submit" value="Search" />
				</form>
			</div>
			<Today />
			<Days />
		</>
	);
}

export default App;
