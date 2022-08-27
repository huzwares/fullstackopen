import { useState } from 'react';

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

const Person = ({ person }) => {
	return (
		<p>{person.name} {person.number}</p>
	)
}

const Persons = (props) => {
	return (
		props.persons.map(person => <Person key={person.id} person={person} />)
	)
}

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [showSearch, setShowSearch] = useState(persons)
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
			setPersons(persons.concat(nameObject))
			setShowSearch(persons.concat(nameObject))
			setNewNumber('')
			setNewName('')
		} else {
			alert(`${newName} is already added to phonebook`)
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

			<Persons persons={showSearch} />
		</div>
	)
}

export default App;
