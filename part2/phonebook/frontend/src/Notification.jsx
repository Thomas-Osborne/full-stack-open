export default function(props) {
    return (
        props.message && <div style={{background: 'lightgrey', fontSize: '20px', padding: '10px', marginBottom: '10px', borderRadius: '5px', borderStyle: 'solid', borderColor: props.isGood ? 'green' : 'red'}}>
            {props.message}
        </div>
    )
}