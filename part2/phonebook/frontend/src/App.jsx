import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  console.log(newName)

  const numberComponents = persons.map((person, index) => <p key={index}>{person.name}</p>);

  function handleChange(event) {
    setNewName(event.target.value);
  }

  function handleClick(event) {
    event.preventDefault();
    setPersons(prevPersons => {
      const newPersons = [...prevPersons];
      newPersons.push({name: newName});
      console.log(newPersons);
      return newPersons;
    })
    console.log("Pressed")
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
      <div>debug: {newName}</div>
    </div>
  )
}

export default App