import { useState } from 'react'

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
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input type="text" name="search" value={search} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input type="text" name="name" value={newPerson.name} onChange={handleChange}/>
        </div>
        <div>
          number: <input type="text" name="number" value={newPerson.number} onChange={handleChange}/>
        </div>
        <div>
          <button onClick={handleClick} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {numberComponents}
    </div>
  )
}

export default App