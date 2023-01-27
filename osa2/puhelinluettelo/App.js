import { useState } from 'react'

const Persons = (props) => {

  const { persons } = props
  return (
    <ul>
      {persons.map(name =>
        <li key={name.id}>
          {name.name} {name.number}
        </li>
      )}
    </ul>
  )
}

const Form = (props) => {

  const newName = props.newName
  const newNumber = props.newNumber
  const addNimi = props.addNimi
  const handleNameChange = props.handleNameChange
  const handleNumberChange = props.handleNumberChange

  
  return(
    <form onSubmit={addNimi}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameChange}
        />

      </div>
      <div>
        number: <input
          type="number"
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
  
}

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      id: 1,
      number: "0432853259325"
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")

  const addNimi = (event) => {
    event.preventDefault()

    const sama = persons.filter(person => person.name === newName)

    if (sama.length === 0) {
      const obj = {
        name: newName,
        id: persons.length + 1,
        number: newNumber
      }

      setPersons(persons.concat(obj))
    } else {
      alert(`${newName} on jo lisätty`)
    }


    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Form 
      newName={newName} 
      newNumber={newNumber} 
      addNimi={addNimi} 
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      >
      </Form>
      <h2>Numbers</h2>
      <Persons persons={persons}></Persons>
    </div>
  )

}

export default App
