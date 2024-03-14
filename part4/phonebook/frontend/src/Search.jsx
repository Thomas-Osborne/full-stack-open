export default function Search(props) {
    return (
        <div>
            filter shown with <input type="text" name="search" value={props.search} onChange={props.handleChange} />
        </div>
    )
}