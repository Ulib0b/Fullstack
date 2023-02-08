import axios from "axios";

const getAll = () => {
  return axios.get('http://localhost:3001/persons')
}

const addPerson = (obj) => {
  return axios.post('http://localhost:3001/persons', obj)
}

const deletePerson = (id) => {
  return axios.delete(`http://localhost:3001/persons/${id}`)
}

export default {
  getAll,
  addPerson,
  deletePerson
}