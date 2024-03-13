import Part from './Part';

export default function Content(props) {

    const partComponents = props.parts.map(part => <Part part={part} key={part.id} />)
    return (
        <div>
            {partComponents}
        </div>
    )
}