export default function Form(props) {
    return (
        <form>
            <div>
            name: <input type="text" name="name" value={props.newPerson.name} onChange={props.handleChange}/>
            </div>
            <div>
            number: <input type="text" name="number" value={props.newPerson.number} onChange={props.handleChange}/>
            </div>
            <div>
            <button onClick={props.handleClick} type="submit">add</button>
            </div>
      </form>
    )
}