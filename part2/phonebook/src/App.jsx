import { useEffect, useState } from 'react'
import personService from './services/persons'
import { copyWithout } from './utils'

const Filter = ({ filterValue, onChange }) => {
  return (
    <>
      filter shown with <input value={filterValue} onChange={onChange} />
    </>
  )
}

const PersonForm = ({ newName, newNumber, onChangeName, onChangeNumber, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={onChangeName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, onDelete }) => {
  return (
    <>
      {persons.map(person =>
        <div key={person.id}>
          {person.name} {person.number} <button onClick={() => {onDelete(person)}}>delete</button>
        </div>
      )}
    </>
  )
}

const Notification = ({ message, isError }) => {
  if (message == null || message == '') {
    return null
  }

  return (
    <div className={'notification ' + (isError ? 'error' : 'message')}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const [notificationTimeoutId, setNotificationTimeoutId] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const resetForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const displayMessage = (message, isError = false) => {
    if (notificationTimeoutId != null) {
      clearTimeout(notificationTimeoutId)
    }
    setMessage(message)
    setIsError(isError)
    setNotificationTimeoutId(setTimeout(() => {
      setMessage(null)
    }, 5000))
  }

  const addPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
      id: Math.max(...persons.map(person => person.id)) + 1
    }
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        resetForm()
        displayMessage(`Added ${returnedPerson.name}`)
      })
  }

  const updatePerson = (person) => {
    const updatedPerson = {
      ...person,
      number: newNumber
    }
    personService
      .update(updatedPerson.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
        resetForm()
        displayMessage(`Changed ${returnedPerson.name}'s number`)
      })
      .catch(error => {
        if (error.response.status === 404) {
          displayMessage(`Information of ${updatedPerson.name} has already been removed from server`, true)
          setPersons(copyWithout(persons, p => p.id === person.id))
        }
        else {
          displayMessage(`An unknown error occurred while trying to update ${updatedPerson.name}'s information`, true)
        }
        setIsError(true)
      })
  }

  const deletePerson = (person) => {
    const confirmed = confirm(`Delete ${person.name}?`)
    if (confirmed === false) return;
    personService
      .expunge(person.id)
      .then(() => {
        setPersons(copyWithout(persons, p => p.id === person.id))
        displayMessage(`Removed ${person.name}`)
      })
  }

  const handlePersonFormSubmission = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson == null) {
      addPerson()
    }
    else {
      const confirmUpdate = confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)
      if (confirmUpdate === false) return
      updatePerson(existingPerson)
    }
  }

  const personsToShow = filter !== ''
    ? persons.filter(person => new RegExp(filter, 'i').test(person.name))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
      <Filter filterValue={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onChangeName={handleNameChange}
        onChangeNumber={handleNumberChange}
        onSubmit={handlePersonFormSubmission}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  )
}

export default App