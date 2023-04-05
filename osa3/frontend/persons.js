import axios from "axios";

const getAll = () => {
  return axios.get('http://localhost:3001/api/persons')
}

const addPerson = (obj) => {
  return axios.post('http://localhost:3001/api/persons', obj)
}

const deletePerson = (id) => {
  return axios.delete(`http://localhost:3001/api/persons/${id}`)
}

export default {
  getAll,
  addPerson,
  deletePerson
}