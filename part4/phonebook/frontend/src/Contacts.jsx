import ContactLine from './ContactLine'

export default function Contacts(props) {
    let numberComponents;
    if (props.persons) {
        numberComponents = props.persons.filter(person => person.name.includes(props.search)).map(person => <ContactLine key={person.name} person={person} handleDelete={props.handleDelete}/>);
    }

    return (
        <div>
            {props.persons && <div>
                {numberComponents}
            </div>}
        </div>
    )
}