import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ country }) => {
	const [weather, setWeather] = useState({})
	const api_key = process.env.REACT_APP_API_KEY
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}&units=metric`
	try {
		axios.get(url).then(response => setWeather(response.data))
		if (weather) {
			return (
				<div>
					<h2>Weather in {country.capital[0]}</h2>
					<p>temprature: {weather.main.temp} Celcius</p>
					<img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
					<p>wind: {weather.wind.speed} m/s</p>
				</div>
			)
		}
	}
	catch {
		return (
			<p>cannot fetch weather information</p>
		)
	}
}

const Country = ({ country }) => {
	return (
		<div>
			<h2>{country.name.common}</h2>
			<p>Capital: {country.capital[0]}</p>
			<p>Area: {country.area}</p>
			<h3>languages:</h3>
			<ul>
				{Object.entries(country.languages).map((lang, i) => <li key={i}>{lang[1]}</li>)}
			</ul>
			<img src={country.flags.png} alt="flag" />
		</div>
	)
}

const CountriesList = ({ country }) => {
	const [show, setShow] = useState(false)
	const showHandler = () => {
		setShow(!show)
	}
	if (show) {
		return (
			<div>
				<p>{country.name.common}
					<button onClick={showHandler}>{show ? "hide" : "show"}</button>
				</p>
				<Country country={country} />
			</div>
		)
	} else {
		return (
			<div>
				<p>{country.name.common}
					<button onClick={showHandler}>{show ? "hide" : "show"}</button>
				</p>
			</div>
		)
	}
}

const Countries = ({ countries }) => {
	if (countries.length > 10) {
		return (
			<p>Too many matches, specify another filter</p>
		)
	} else if (countries.length === 1) {
		return (
			<div>
				<Country country={countries[0]} />
				<Weather country={countries[0]} />
			</div>
		)
	} else if (countries.length > 1) {
		return (
			countries.map((country, i) => <CountriesList key={i} country={country} />)
		)
	} else {
		return (
			<p>Nothing to show here</p>
		)
	}

}

const App = () => {
	const [countries, setCountries] = useState([])
	const [search, setSearch] = useState('')
	const searchHandler = (event) => {
		setSearch(event.target.value)
	}
	useEffect(() => { axios.get(`https://restcountries.com/v3.1/name/${search}`).then(response => setCountries(response.data)) })
	return (
		<div>
			<p>find countries <input value={search} onChange={searchHandler} /></p>
			<Countries countries={countries} />
		</div>
	)
}

export default App;
