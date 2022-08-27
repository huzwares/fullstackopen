import { useState } from 'react';

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
			setNewNumber('')
			setNewName('')
		} else {
			alert(`${newName} is already added to phonebook`)
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<p>filter shown with <input onChange={handleSearch} /></p>
			<h2>add a new</h2>
			<form onSubmit={addNewName}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{showSearch.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
		</div>
	)
}

export default App;
