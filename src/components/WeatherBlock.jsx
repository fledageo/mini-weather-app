import React, { useState, useEffect } from 'react'
import { IoMdSearch } from "react-icons/io";
import "./style/style.css"

import ShowWeather from './ShowWeather'

export default function WeatherBlock() {
    const [inputValue, setInputValue] = useState("")
    const [chooseCity, setChooseCity] = useState(null)
    const [cityList, setCityList] = useState(null)
    const [dropDown, setDropDown] = useState({ render: false, cities: [] })

    useEffect(() => {
        const fetchCityNames = async () => {
            const responseJSON = await fetch("../../armeniaCities.json")
            const response = await responseJSON.json()
            setCityList(response)
        }
        fetchCityNames()
    }, [])

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
        if (e.target.value !== "") {
            setDropDown(prev => {
                const value = new RegExp(`^${e.target.value.trim().toLowerCase()}`)
                const filterByValue = cityList.filter(elm => value.test(elm.name.toLowerCase())).slice(0, 5)
                return { render: true, cities: [...filterByValue] }
            })
        } else {
            setDropDown({ render: false, cities: [] })
        }
    }

    const handleSearchCity = (city) => {
        if(inputValue !== ""){
            setDropDown({ ...dropDown,render:false })
            setInputValue("")
            if (city) {
                setChooseCity(city)
            } else {
                const findByValue = cityList.find(elm => elm.name.toLowerCase() == inputValue.trim().toLowerCase())
                if (findByValue) {
                    setChooseCity(findByValue)
                }else{
                    console.log("City not found!") //ERROR******************
                }
            }
        }
    }
    

    return (
        <div className='weather-container'>
            <div className="weather-content-wrapper">
                <div className="weather-actions">
                    <div className="weather-actions-input-btn">
                        <input
                            onChange={(e) => handleInputChange(e)}
                            value={inputValue}
                            className='searchCity-input'
                        />
                        <button onClick={() => handleSearchCity()} className='searchCity-btn'><IoMdSearch /></button>
                    </div>
                    {
                        dropDown.render && <div className="dropDown-bar">
                            {
                                dropDown.cities.map((elm, i) => {
                                    return <div className='dropDown-elm' key={i} onClick={() => handleSearchCity(elm)} ><span>{elm.name}</span></div>
                                })
                            }
                        </div>
                    }
                </div>

                <div className="weather-show">
                    {
                        <ShowWeather chooseCity={chooseCity} />
                    }
                </div>
            </div>
        </div>
    )
}
