import Part from './Part';

export default function Content(props) {

    const partComponents = props.parts.map((part, index) => <Part part={part} key={index} />)
    return (
        <div>
            {partComponents}
        </div>
    )
}