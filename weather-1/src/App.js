import React, {useState} from "react";
import axios from 'axios';

function App() {
    const [data,setData] = useState({});
    const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ad3b64db46831b89249b19e1f366a547`

  const searchLocation = (event) => {
      if (event.key === "Enter") {
          axios.get(url).then((response) => {
              setData(response.data);
              console.log(response.data);
          })
          setLocation("");
      }
  }

  return (
    <div className="app">
        <div className="search">
           <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter (city, country code)"
            type="text"/>
        </div>
      <div className="container">
          <div className="top"></div>
            <div className="location">
                <h2>{data.name}{data.sys ? `, ${data.sys.country}` : ""}</h2>
            </div>
          <div className="temp">
              {data.main ? <h1>{Math.round(data.main.temp - 273.15)}°C</h1> : null}
          </div>
          <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div className="bottom">
              <div className="feels">
                  <p>Apparent</p>
                  {data.main ? <p>{Math.round(data.main.feels_like - 273.15)}°C</p> : null}
              </div>
              <div className="humidity">
                  <p>Humidity</p>
                  {data.main ? <p>{data.main.humidity}%</p> : null}
              </div>
              <div className="wind">
                  <p>Wind</p>
                  {data.wind ? <p>{Math.round(data.wind.speed * 3.6)} KMH</p> : null}
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;
