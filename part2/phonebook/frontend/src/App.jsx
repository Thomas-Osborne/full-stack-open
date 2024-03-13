import { useState } from 'react'
import axios from 'axios'

import Search from './Search';
import Form from './Form';
import Contacts from './Contacts';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newPerson, setNewPerson] = useState({name: "", number: ""})
  const [search, setSearch] = useState("");

  const numberComponents = persons.filter(person => person.name.includes(search)).map(person => <p key={person.name}>{person.name} {person.number}</p>);

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
      alert(`${newPerson.name} is already added to phonebook`);
    } else {
      setPersons(prevPersons => {
        const newPersons = [...prevPersons];
        newPersons.push({name: newPerson.name, number: newPerson.number});
        return newPersons;
      })
      axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        console.log(response)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} handleChange={handleFilterChange}/>
      <h2>add a new</h2>
      <Form newPerson={newPerson} handleChange={handleChange} handleClick={handleClick}/>
      <h2>Numbers</h2>
      <Contacts persons={persons} search={search}/>
    </div>
  )
}

export default App