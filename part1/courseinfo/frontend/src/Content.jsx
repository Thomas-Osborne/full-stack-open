import Part from './Part';

export default function Content(props) {

    const partComponents = props.parts.map(part => <Part part={part} />)
    return (
        <div>
            {partComponents}
        </div>
    )
}