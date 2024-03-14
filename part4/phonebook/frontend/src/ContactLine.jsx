export default function ContactLine(props) {
    return (
        <div>
            <p key={props.person.name}>{props.person.name} {props.person.number}</p>
            <span><button onClick={() => props.handleDelete(props.person)}>Delete</button></span>
        </div>
    )
}