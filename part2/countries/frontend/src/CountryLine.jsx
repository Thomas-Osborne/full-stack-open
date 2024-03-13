import { useState, useEffect } from 'react';
import Country from './Country';


export default function CountryLine(props) {

    const [toggle, setToggle] = useState(false);

    function handleClick() {
        setToggle(prevToggle => !prevToggle);
    }

    return (
        <div>
            <p>{props.country.name.common}</p>
            <button onClick={handleClick}>Show</button>
            {toggle && <Country country={props.country} />}
        </div>
    )
}