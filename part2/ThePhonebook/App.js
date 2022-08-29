import { useState, useEffect } from 'react'
import personServers from './servers/persons'
import { nanoid } from 'nanoid'
import { ErrorNotification, SuccessNotification } from './components/notification'
import Filter from './components/filter'
import PersonForm from './components/person-form'
import Persons from './components/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personServers
          .update(changedPerson)
          .then(returnedPerson => {
            setSuccessMessage(`${returnedPerson.name}'s number updated to ${returnedPerson.number}.`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 3000);
            const id = returnedPerson.id
            setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
          })
          .catch(error => {
            setErrorMessage(`'${changedPerson.name}' was already deleted from server.`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000);
            setPersons(persons.filter(p => p.id !== person.id))
          })
      }
    } else {
      const person = {
        name: newName,
        number: newNumber,
        id: nanoid()
      }
 
      personServers
        .add(person)
        .then(returnedPerson => {
          setSuccessMessage(`Added ${returnedPerson.name}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 3000);
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDelete = (person) => {
    const helper = () => {
      const id = person.id
      if (window.confirm(`Delete ${person.name}`)) {
        personServers
          .delete(id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id))
          })
      }
    }
    return helper
  }

  useEffect(() => {
    personServers
      .getAll()
      .then(persons => { 
        setPersons(persons)
      })
    }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMessage}/>
      <SuccessNotification message={successMessage}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
