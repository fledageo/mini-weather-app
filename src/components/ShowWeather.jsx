import { TiWeatherSunny } from "react-icons/ti";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TiWeatherCloudy } from "react-icons/ti";
import { TiWeatherShower } from "react-icons/ti";
import { TiWeatherStormy } from "react-icons/ti";
import { TiWeatherSnow } from "react-icons/ti";



import React, { useEffect, useState } from 'react'

import "./style/style.css"
export default function ShowWeather({ chooseCity }) {
    const [data, setData] = useState(null)
    const [icon, setIcon] = useState(null)
    const [error, setError] = useState(null);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    getWeatherBylocation(latitude, longitude)
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };
    const getWeatherBylocation = async (latitude, longitude) => {
        const apiKey = '8f4fb066d4257f9be45c3917d597f288';
        const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
        const cityFetch = await fetch(apiUrl)
        const cityResult = await cityFetch.json()
        const city = cityResult[0].name.split(" ")[0]
        
        const apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
        const weatherFetch = await fetch(apiUrlCity)
        const weatherResult = await weatherFetch.json()
        setData(weatherResult)
    }
    const getWeather = () => {
        const apiKey = "8f4fb066d4257f9be45c3917d597f288";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&id=${chooseCity.id}&appid=${apiKey}`

        fetch(apiUrl)
            .then(response => response.json())
            .then(result => setData(result))
    }
    useEffect(() => {
        if (chooseCity) {
            getWeather()
        } else {
            getLocation()
        }
    }, [chooseCity])

    useEffect(() => {
        if (data) {
            switch (data.weather[0].description) {
                case "clear sky":
                    setIcon(<TiWeatherSunny className="weather-icon" />)
                    break;
                case "few clouds":
                    setIcon(<TiWeatherPartlySunny className="weather-icon" />)
                    break;
                case "scattered clouds":
                    setIcon(<TiWeatherCloudy className="weather-icon" />)
                    break;
                case "shower rain":
                    setIcon(<TiWeatherShower className="weather-icon" />)
                    break;
                case "thunderstorm":
                    setIcon(<TiWeatherStormy className="weather-icon" />)
                    break;
                case "snow":
                    setIcon(<TiWeatherSnow className="weather-icon" />)
                    break;
                default:
                    setIcon(<TiWeatherPartlySunny className="weather-icon" />)
            }
        }
    }, [data])



    return (
        <>
            {
                data && <div className='showWeather-block'>
                    <span>{data.name}</span>
                    {icon}
                    <span>{Math.floor(data.main.temp) + "\u00B0"}</span>
                </div>
            }
        </>
    )
}
