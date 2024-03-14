import { useState, useEffect } from 'react'
import personService from '../persons'

import Search from './Search';
import Form from './Form';
import Contacts from './Contacts';
import Notification from './Notification';


const App = () => {

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [persons, setPersons] = useState([]);

  const [newPerson, setNewPerson] = useState({name: "", number: ""})
  const [search, setSearch] = useState("");
  
  const [message, setMessage] = useState("");
  const [isGood, setIsGood] = useState(true);

  function handleFilterChange(event) {
    setSearch(event.target.value);
  }

  function handleChange(event) {
    setNewPerson(prevNewPerson => {
      const nextPerson = {
        ...prevNewPerson,
        [event.target.name]: event.target.value
      };
      return nextPerson;
    });
  }

  function handleClick(event) {
    event.preventDefault();
    if (persons.map(person => person.name).includes(newPerson.name)) {
      const oldPerson = persons.filter(person => person.name === newPerson.name)[0]; // is a unique entry
      if (confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(oldPerson._id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person._id !== returnedPerson._id ? person : returnedPerson))
            setNewPerson({name: "", number: ""});
            setMessage(`Updated ${returnedPerson.name}`)
            setIsGood(true);
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setPersons(persons.filter(person => person._id !== oldPerson._id))
            setNewPerson({name: "", number: ""});
            setMessage(
              `Note '${persons.name}' was already removed from server`
            )
            setIsGood(false);
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewPerson({name: "", number: ""});
          setMessage(`Added ${returnedPerson.name}`)
          setIsGood(true);
          setTimeout(() => {
            setMessage(null)
          }, 5000)
      })
    }
  }

  function handleDelete(deletedPerson) {
    if (window.confirm(`Delete ${deletedPerson.name}?`)) {
      personService
        .remove(deletedPerson.id)
        setPersons(persons.filter(person => person.id !== deletedPerson.id));
        setMessage(`Deleted ${deletedPerson.name}`)
        setIsGood(true);
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isGood={isGood}/>
      <Search search={search} handleChange={handleFilterChange}/>
      <h2>add a new</h2>
      <Form newPerson={newPerson} handleChange={handleChange} handleClick={handleClick}/>
      <h2>Numbers</h2>
      <Contacts persons={persons} search={search} handleDelete={handleDelete}/>
    </div>
  )
}

export default App