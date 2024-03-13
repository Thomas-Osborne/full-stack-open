export default function Country(props) {
    const values = Object.values(props.country.languages);
    const languages = Object.values(props.country.languages).map(language => <li key={language}>{language}</li>)

    return (
        <div>
            <h1>{props.country.name.common}</h1>
            <p>capital {props.country.capital}</p>
            <p>area {props.country.area}</p>
            <strong>languages: </strong>
            <ul>
                {languages}
            </ul>
            <img src={props.country.flags.png}/>
        </div>
    )
}