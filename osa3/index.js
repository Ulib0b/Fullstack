const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())

app.use(morgan('tiny'))

app.use(cors())

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
  morgan.token('log',(req,res)=>{
    return req.body
  })
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
  morgan.token('log',(req,res)=>{
    return req.body
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
  
  morgan.token('log',(req,res)=>{
    return req.body
  })
})

app.delete('/api/persons/:id',(request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  morgan.token('log',(req,res)=>{
    return req.body
  })

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
  
  persons = persons.concat(request.body)

  response.json(request.body)

  morgan.token('log',(req,res)=>{
    return req.body
  })
  

})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
