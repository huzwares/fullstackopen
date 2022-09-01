import { useState, useEffect } from 'react';
import axios from 'axios';
import services from './services/persons';

const Notification = ({ message }) => {
	const notificationStyle = {
		color: 'green',
		fontSize: 20,
		background: 'lightgray',
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	}
	const errorStyle = {
		color: 'red',
		fontSize: 20,
		background: 'lightgray',
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	}
	if (message === null) {
		return null
	}

	return (
		<div style={message[1] === "notification" ? notificationStyle : errorStyle}>
			{message[0]}
		</div>
	)
}

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
	const [notification, setNotification] = useState(null)
	const refreshPage = (data) => {
		setPersons(data)
		setShowSearch(data)
		setNewNumber('')
		setNewName('')
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
				setNotification([`Added ${returnedPerson.name}`, "notification"])
				setTimeout(() => {
					setNotification(null)
				}, 5000)
			}).catch(error => {
				setNotification([`please try again. error message: ${error.response.data.error}`, "error"])
				setTimeout(() => {
					setNotification(null)
				}, 5000)
			})
		} else {
			const person = persons.find(person => person.name == newName)
			const changedPerson = { ...person, number: newNumber }
			if (window.confirm(`${person.name} is already added to phonebook, replace the old one with the new one?`)) {
				services.updatePerson(person.id, changedPerson).then(returnedPerson => {
					setNotification([`${returnedPerson.name} number updated`, "notification"])
					setTimeout(() => {
						setNotification(null)
					}, 5000)
				}).catch(error => {
					setNotification([`please try again. error message: ${error.response.data.error}`, "error"])
					setTimeout(() => {
						setNotification(null)
					}, 5000)
				})
			}
		}
		services.getAll().then(returnedPersons => refreshPage(returnedPersons))
	}

	const delP = (person) => {
		if (window.confirm(`Delete ${person.name}?`)) {
			services.deletePerson(person.id).then(response => {
				console.log(response)
				setNotification([`${person.name} deleted from phonebook`, "notification"])
				setTimeout(() => {
					setNotification(null)
				}, 5000)
			}).catch(error => {
				setNotification([`Information of ${person.name} has already been removed from server. error message: ${error.message}`, "error"])
				setTimeout(() => {
					setNotification(null)
				}, 5000)
			})
			services.getAll().then(returnedPersons => refreshPage(returnedPersons))
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={notification} />
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
