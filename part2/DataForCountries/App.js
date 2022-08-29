import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ filter, handleFilterChange }) => <div>find countries <input value={filter} onChange={handleFilterChange}></input></div>

const Result = ({ countries, filter, handleShowButtonClick }) => {  
  if (filter.length === 0) {
    return <></>
  }
  
  const filtered = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  const count = filtered.length
  
  if (count > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (count === 0) {
    return <p>No match, specify another filter</p>
  } else if (count === 1) {
    return <CountryInfo country={filtered[0]}/>
  } else {
    return (
      <>
        {filtered.map(country => {
          return (
            <div key={country.flag}>{country.name.common} <button onClick={handleShowButtonClick(country.name.common)}>show</button></div>)
          })}
      </>
    )
  }
}

const CountryInfo = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <p><b>languages:</b></p>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} width='150px' alt="flag"></img>
      
      <Weather capital={country.capital} latlon={country.capitalInfo.latlng}/>
    </>
  )
}

const Weather = ({ capital, latlon }) => {
  const [weather, setWeather] = useState({})
  const [lat, lon] = latlon
  
  useEffect(() => {
    const api_key = process.env.REACT_APP_WEATHER_API_KEY
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
      .then((response) => {
        if (response.status === 200) {
          setWeather(response.data)
        }
      })
  }, [lat, lon])

  if (weather.main === undefined) {
    return <></>
  }
  return (
    <>
      <h3>Weather in {capital}</h3>
      <p>temperature {weather.main.temp} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon'></img>
      <p>wind {weather.wind.speed} m/s</p>
    </>
  )
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleShowButtonClick = (name) => () => setFilter(name)

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <Result countries={countries} filter={filter} handleShowButtonClick={handleShowButtonClick}/>
    </div>
  );
}

export default App;
