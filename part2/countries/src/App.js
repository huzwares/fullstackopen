import { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ countries }) => {
	if (countries.length > 10) {
		return (
			<p>Too many matches, specify another filter</p>
		)
	} else if (countries.length === 1) {
		return (
			<div>
				<h2>{countries[0].name.common}</h2>
				<p>Capital: {countries[0].capital[0]}</p>
				<p>Area: {countries[0].area}</p>
				<h3>languages:</h3>
				<ul>
					{Object.entries(countries[0].languages).map(lang => <li key={lang[0]}>{lang[1]}</li>)}
				</ul>
				<img src={countries[0].flags.png} alt="flag" />
			</div>
		)
	} else if (countries.length > 1) {
		return (
			countries.map(country => <p key={country.name.common}>{country.name.common}</p>)
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
		searchApi(event.target.value)
	}
	const searchApi = (s) => {
		axios.get('https://restcountries.com/v3.1/name/' + s).then(response => {
			setCountries(response.data)
		}, [])
	}
	return (
		<div>
			<p>find countries <input value={search} onChange={searchHandler} /></p>
			<Countries countries={countries} />
		</div>
	)
}

export default App;
