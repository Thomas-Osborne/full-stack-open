import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const numberComponents = persons.map(person => <p key={person.name}>{person.name}</p>);

  function handleChange(event) {
    setNewName(event.target.value);
  }

  function handleClick(event) {
    event.preventDefault();
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(prevPersons => {
        const newPersons = [...prevPersons];
        newPersons.push({name: newName});
        return newPersons;
      })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input type="text" name="newName" value={newName} onChange={handleChange}/>
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