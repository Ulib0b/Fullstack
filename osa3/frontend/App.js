import { useEffect, useState } from 'react'
import personComms from './persons'
import './index.css'

const Persons = (props) => {

  const { persons } = props
  return (
    <ul>
      {persons.map(name =>
        <li key={name.id}>
          {name.name} {name.number}
          <button id={name.id} onClick={props.handleDeletePerson(name.id)}>Delete</button>
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


  return (
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

const NimiAlert = ({nimi}) => {
  if(nimi === null){
    return null
  }

  return (
    <div className="successful">
      {nimi} lisätty
    </div>
  )
}

const PoistoAlert = ({nimi}) => {
  if(nimi === null){
    return null
  }

  return (
    <div className="successful">
      {nimi} poistettu
    </div>
  )
}

const ErrorAlert = ({message}) => {
  if(message === null){
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personComms
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])




  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [nimi, setNimi] = useState(null)
  const [poistettuNimi, setPoistettuNimi] = useState(null)
  const [message, setMessage] = useState(null)
  

  const addNimi = (event) => {
    event.preventDefault()

    const sama = persons.filter(person => person.name === newName)

    if (sama.length === 0) {
      const obj = {
        name: newName,
        id: Math.floor(Math.random() * 10000),
        number: newNumber
      }

      personComms
        .addPerson(obj)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNimi(newName)
        })
        .catch(error => {
          setMessage(error.response.data.error)
          console.log(error.response.data)
        })      
        
    } else {
      alert(`${newName} on jo lisätty`)
    }


    setNewName("")
    setNewNumber("")
    setTimeout(()=>{
      setNimi(null)
      setMessage(null)
    },5000)
  }

  const handleDeletePerson = (id) => {

    
    return () => {
      personComms.getAll().then(response => {
        for (let i = 0; i < response.data.length; i++) {
          if(id===response.data[i].id){
            setPoistettuNimi(response.data[i].name)
          }
          
        }
      })
      

      personComms
      .deletePerson(id)
      .then(
        setPersons(persons.filter(n => n.id !== id))
      )

      setTimeout(()=>{
        setPoistettuNimi(null)
      },5000)
    }
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
      <NimiAlert nimi={nimi}></NimiAlert>
      <PoistoAlert nimi={poistettuNimi}></PoistoAlert>
      <ErrorAlert message={message}></ErrorAlert>
      <Form
        newName={newName}
        newNumber={newNumber}
        addNimi={addNimi}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      >
      </Form>
      <h2>Numbers</h2>
      <Persons persons={persons} handleDeletePerson={handleDeletePerson}></Persons>
    </div>
  )

}

export default App
