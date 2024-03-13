import ContactLine from './ContactLine'

export default function Contacts(props) {
    const numberComponents = props.persons.filter(person => person.name.includes(props.search)).map(person => <ContactLine key={person.name} person={person} handleDelete={props.handleDelete}/>);

    return (
        <div>
            {numberComponents}
        </div>
    )
}