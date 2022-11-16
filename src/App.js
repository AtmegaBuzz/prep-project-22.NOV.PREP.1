import React, { useEffect, useRef,useState } from "react";
import './App.css';
import logo from './mlh-prep.png'

function App() {
  const inputRef = useRef();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== 200) {
            setIsLoaded(false)
          } else {
            setIsLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [city])

  const handleKey = (e) => {
    const cityValue = inputRef.current.value;
    e.code === 'Enter' && setCity(cityValue);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return(
      <React.Fragment>
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        <div>
          <h2>Enter a city below 👇</h2>
          <div className="input-container">
            <i class="fa fa-map-marker input-icon" aria-hidden="true"></i>
            <input
              name="search"
              type="text"
              ref={inputRef}
              onKeyDown={handleKey}
              defaultValue="New York City"
              placeholder="Enter a city"
            />
          </div>
          <div className="Results">
            {!isLoaded && <h2>Loading...</h2>}
            {console.log(results)}
            {isLoaded && results && <>
              <h3>{results.weather[0].main}</h3>
              <p>Feels like {results.main.feels_like}°C</p>
              <i><p>{results.name}, {results.sys.country}</p></i>
            </>}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default App;
