export default function Contacts(props) {
    const numberComponents = props.persons.filter(person => person.name.includes(props.search)).map(person => <p key={person.name}>{person.name} {person.number}</p>);
    return (
        <div>
            {numberComponents}
        </div>
    )
}