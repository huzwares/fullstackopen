import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState(
		[{ name: 'arto Hellas', number: '040-123456' }]
	)
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}
	const addNewName = (event) => {
		event.preventDefault()
		if (!persons.map(person => person.name).includes(newName)) {
			const nameObject = {
				name: newName,
				number: newNumber
			}
			setPersons(persons.concat(nameObject))
			setNewName('')
		} else {
			alert(`${newName} is already added to phonebook`)
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
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
			{persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
		</div>
	)
}

export default App;
