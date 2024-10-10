import React, { useState } from "react";
import axios from 'axios';
import moment from 'moment-timezone';

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");
    const [backgroundStyle, setBackgroundStyle] = useState({ backgroundImage: 'url(./assets/sky.jpg)' });

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ad3b64db46831b89249b19e1f366a547`;

    const searchLocation = (event) => {
        if (event.key === "Enter") {
            axios.get(url).then((response) => {
                setData(response.data);
                setWeatherBackground(response.data);
                console.log(response.data);
            }).catch((error) => {
                console.error("Error fetching the weather data", error);
            });
            setLocation("");
        }
    }

    const setWeatherBackground = (data) => {
        if (!data.weather || data.weather.length === 0) return;
        const weatherDescription = data.weather[0].main.toLowerCase();
        let backgroundImage = 'url(./assets/sky.jpg)'; // Default background

        switch (weatherDescription) {
            case 'clear':
                backgroundImage = 'url(./assets/clearsky.jpg)';
                break;
            case 'clouds':
                backgroundImage = 'url(./assets/sky.jpg)';
                break;
            case 'rain':
                backgroundImage = 'url(./assets/rainysky.jpg)';
                break;
            case 'snow':
                backgroundImage = 'url(./assets/snow.jpg)';
                break;
            case 'sunny':
                backgroundImage = 'url(./assets/sunnysky.jpg)';
                break;
            case 'mist':
                backgroundImage = 'url(./assets/mistysky.jpg)';
                break;
            case 'thunderstorm':
                backgroundImage = 'url(./assets/thunderstormsky.jpg)';
                break;
            case 'drizzle':
                backgroundImage = 'url(./assets/rainysky.jpg)';
                break;
            default:
                backgroundImage = 'url(./assets/sky.jpg)';
                break;
        }

        setBackgroundStyle({ backgroundImage });
    }

    const getCityDateTime = () => {
        if (!data.timezone) return { date: "", time: "" };
        const timezoneOffset = data.timezone;
        const cityDateTime = moment().utcOffset(timezoneOffset / 60);
        return {
            date: cityDateTime.format('MMMM Do YYYY'),
            time: cityDateTime.format('HH:mm')
        };
    };

    const cityDateTime = getCityDateTime();

    return (
        <div className="app" style={backgroundStyle}>
            <div className="search">
                <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    placeholder="Enter (city, country code)"
                    type="text" />
            </div>
            <div className="container">
                <div className="top">
                    <div className="location-time">
                        <div className="location">
                            <h2>{data.name}{data.sys ? `, ${data.sys.country}` : ""}</h2>
                        </div>
                        <div className="time">
                            <h3>{cityDateTime.date}</h3>
                            <h2>{cityDateTime.time}</h2>
                        </div>
                    </div>
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