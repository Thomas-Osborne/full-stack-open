import { useState, useEffect } from 'react'
import axios from 'axios'

import Country from './Country';
import CountryLine from './CountryLine';

function App() {
  
  const [countries, setCountries] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => setCountries(res.data));
  }, [])

  useEffect(() => {
    if (countries) {

    }
  }, [countries])


  function handleChange(event) {
    setSearch(event.target.value);
  }

  function renderContent() {
    let countryComponents;
    if (countries) {
      const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()));
      if (filteredCountries.length > 10) {
        countryComponents = <p>Too many countries to render.</p>
      } else if (filteredCountries.length > 1) {
        countryComponents = filteredCountries.map(country => <CountryLine key={country.name.official} country={country}/>)
      } else if (filteredCountries.length == 1) {
        countryComponents = <Country country={filteredCountries[0]}/>
      } else {
        countryComponents = "";
      }
    } else {
      countryComponents = "";
    }
    return countryComponents;
  }

  return (
    <div>
      <div>
        find countries <input type="text" name="search" value={search} onChange={handleChange}/>
      </div>
      {countries && <div>
        {renderContent()}
        {/* {countries.length > 10 ? <p>Too many</p> : {countryComponents}} */}
      </div>}
    </div>
  )
}

export default App
