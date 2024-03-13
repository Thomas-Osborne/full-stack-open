import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newPerson, setNewPerson] = useState({name: "", number: ""})

  const numberComponents = persons.map(person => <p key={person.name}>{person.name} {person.number}</p>);

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