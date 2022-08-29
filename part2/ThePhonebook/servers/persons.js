import axios from "axios";
const baseurl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseurl).then(response => response.data)
}

const add = newPerson => {
  return axios.post(baseurl, newPerson).then(response => response.data)
}

const deletePerson = id => {
  return axios.delete(`${baseurl}/${id}`)
}

const update = (person) => {
  return axios.put(`${baseurl}/${person.id}`, person).then(response => response.data)
}

const api = { getAll, add, delete: deletePerson, update }

export default api
