require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())

app.use(morgan('tiny'))

app.use(cors())



const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.find({ _id: request.params.id }).then(persons => {
    response.json(persons)
  }).catch(error => next(error))
})



app.delete('/api/persons/:id',(request, response, next) => {
  Person.findByIdAndRemove({ _id: request.params.id }).then(result => {
    response.status(204).end()
  }).catch(error => next(error))
})



app.post('/api/persons', (request, response, next) => {

  const person = new Person ({
    name: request.body.name,
    id: Math.floor(Math.random() * 1000),
    number: request.body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => {
      next(error)
    })

})

app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})