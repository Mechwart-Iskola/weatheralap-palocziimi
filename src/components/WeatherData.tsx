import React, { useEffect, useState } from "react"

type User = {
  id: number
  cityName: string
  temperature: number
  weather: string
  icon: string
}

const WeatherData = () => {

  const [searchCity, setSearchCity] = useState("")
  const [cities, setCities] = useState<User[]>()
  const [city, setCity] = useState<User|null>()
  const [error, setError] = useState("")
  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchCity(e.target.value)
  }
  const fetchCities = async () => {
    try {
      const res = await fetch('/Weather.json')
      if (!res.ok) {
        throw new Error
      }
      const data = await res.json()
      setCities(data.weather)
      console.log(cities)
    } catch (error) {
      console.error(error)
    }
  }

  const findCity = () => {
    const found = cities?.find(u => u.cityName.toLowerCase().includes(searchCity.toLowerCase()))
    if (found) {
      setCity(found)
      setError("")
    } else {
      setCity(null)
      setError("No city found with the given name")
    }
  }

  useEffect(() => {
    fetchCities()
  }, [])
  

  return (
    <div className="user-card">
      <div className="search-section">
        <label htmlFor="">Enter City</label>
        <input type="text" value={searchCity} onChange={handleSearch}/>
        <button onClick={findCity}>Search</button>
      </div>
      <div className="result-section">
        {error && <p>{error}</p>}
        {city && (
          <div className="user-info">
            <img src={city.icon} alt="" className="icon"/>
            <div className="user-details">
              <p>ID: {city.id}</p>
              <p>Name: {city.cityName}</p>
              <p>Temperature: {city.temperature} °C</p>
              <p>Weather: {city.weather}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherData