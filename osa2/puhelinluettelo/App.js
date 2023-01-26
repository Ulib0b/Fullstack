import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      id: 1
    }
  ])
  const [newName, setNewName] = useState('')

  const addNimi = (event) => {
    event.preventDefault()

    const sama = persons.filter(person => person.name === newName)

    if (sama.length === 0) {
      const obj = {
        name: newName,
        id: persons.length + 1
      }

      setPersons(persons.concat(obj))
    }else{
      alert(`${newName} on jo lisätty`)
    }


    setNewName("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNimi}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(name =>
          <li key={name.id}>
            {name.name}
          </li>
        )}
      </ul>
    </div>
  )

}

export default App
