import { useState, useEffect } from 'react';
import axios from 'axios';
import services from './services/persons';

const Filter = ({ search }) => {
	return (
		<p>filter shown with <input onChange={search} /></p>
	)
}

const PersonForm = (props) => {
	return (
		<form onSubmit={props.addNewName}>
			<div>
				name: <input value={props.newName} onChange={props.handleNameChange} />
			</div>
			<div>
				number: <input value={props.newNumber} onChange={props.handleNumberChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

const Person = ({ person, del }) => {
	return (
		<p>
			{person.name} {person.number} <button onClick={() => del(person)}>delete</button>
		</p>
	)
}

const Persons = (props) => {
	return (
		props.persons.map(person => <Person key={person.id} person={person} del={props.del} />)
	)
}

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [showSearch, setShowSearch] = useState(persons)

	const refreshPage = (data) => {
		setPersons(data)
		setShowSearch(data)
	}

	useEffect(() => {
		services.getAll().then(returnedPersons => refreshPage(returnedPersons))
	}, [])

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}
	const handleSearch = (event) => {
		setShowSearch(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
	}
	const addNewName = (event) => {
		event.preventDefault()
		if (!persons.map(person => person.name).includes(newName)) {
			const nameObject = {
				name: newName,
				number: newNumber,
				id: persons.at(-1).id + 1
			}
			services.addPerson(nameObject).then(returnedPerson => {
				refreshPage(persons.concat(returnedPerson))
				setNewNumber('')
				setNewName('')
			})
		} else {
			alert(`${newName} is already added to phonebook`)
		}
	}

	const delP = (person) => {
		if (window.confirm(`Delete ${person.name}?`)) {
			services.deletePerson(person.id).then(response => {
				console.log(response)
				services.getAll().then(returnedPersons => refreshPage(returnedPersons))
			})
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>

			<Filter search={handleSearch} />

			<h2>add a new</h2>

			<PersonForm
				addNewName={addNewName}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>

			<h2>Numbers</h2>

			<Persons persons={showSearch} del={delP} />
		</div>
	)
}

export default App;
