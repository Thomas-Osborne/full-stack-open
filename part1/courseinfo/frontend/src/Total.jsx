export default function Total(props) {

    const total = props.parts.map(part => part.exercises).reduce((a, b) => a + b);

    return (
        <p>Number of exercises {total}</p>
    )
}