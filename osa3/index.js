const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    "name": "dwadwadwa",
    "id": 1,
    "number": "231321"
  },
  {
    "name": "oiuo",
    "id": 2,
    "number": "321321"
  },
  {
    "name": "jewajewa",
    "id": 3,
    "number": "3213213"
  },
  {
    "name": "jytkjtyk",
    "id": 4,
    "number": "321321321321"
  },
  {
    "name": "joku",
    "id": 5,
    "number": "23121321321"
  }
]

app.get('/info', (request, response) => {
  const date = new Date();
  response.send(`<p>Phonebook has info for ${persons.length} people </p>` + date)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
  
})

app.delete('/api/persons/:id',(request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {

  const sama = persons.find(person => person.name === request.body.name)

  if(request.body.name === undefined){
    return response.status(400).json({error: "nimi puuttuu"})
  }else if(request.body.number === undefined){
    return response.status(400).json({error: "numero puuttuu"})
  }else if(!(sama === undefined)){
    return response.status(400).json({error: "nimi on jo luettelossa"})
  }
  
  const person = {
    "name": request.body.name,
    "id": Math.floor(Math.random() * 1000),
    "number": request.body.number
  }

  persons = persons.concat(person)

  response.json(persons)

})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})