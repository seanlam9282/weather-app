import React, { useEffect, useState } from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import SearchIcon from '@mui/icons-material/Search';
import WaterIcon from '@mui/icons-material/Water';
import AirIcon from '@mui/icons-material/Air';

const WeatherApp = () => {
    const APIKey = process.env.REACT_APP_API_KEY;
    const [city, setCity] = useState('CALGARY');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    
    // const fetchInitialData = async () => {
    //     try {
    //         console.log('Before initial fetch');
    //         const responseInitial = await fetch(
    //             `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    //         );
    //         console.log('After initial fetch');
    //         const jsonInitial = await responseInitial.json();
    //         setWeatherData(jsonInitial);
    //     } catch (error) {
    //         console.error('Error fetching initial weather data:', error);
    //     }
    // }

    // useEffect(() => {
    //     fetchInitialData();
    // }, []);

    const handleSearch = async () => {
      if (city === '') return;
  
      try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
        );
        const json = await response.json();
  
        if (json.cod === '404') {
            setError('Invalid location!');
            setWeatherData(null);
        } else {
            setWeatherData(json);
            setError(null);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    return (
        <div className='bg-[#06283D] h-screen flex flex-col justify-center items-center'>
            <div className='relative w-1/3 h-[95%] bg-white px-7 py-8 rounded-2xl duration-500 ease-out'>
                <div className='w-full h-min flex items-center justify-between'>
                    <PlaceIcon className='absolute text-[#06283D] text-3xl translate-x-1'/>
                    <input type='text' placeholder='Enter your location' value={city} onChange={(e) => setCity(e.target.value)} className='w-4/5 text-2xl font-medium uppercase pl-8 placeholder:capitalize' />
                    <button onClick={handleSearch} className='w-[50px] h-[50px] text-[#06283D] bg-[#DFF6FF] rounded-full pb-1 pl-0.5 ml-2 text-2xl duration-100 ease-in hover:text-[#FFF] hover:bg-[#06283D]'>
                        <SearchIcon />
                    </button>
                </div>

                {error && (
                    <div className='w-full text-center mt-[50px]'>
                        <p className='text-[#06283D] text-[22px] font-medium mt-3'>{error}</p>
                    </div>
                )}

                {weatherData && (
                    <div className='flex flex-col justify-center items-center'>
                        <img src={`/${weatherData.weather[0].main.toLowerCase()}.png`} alt='weather' width={100} height={100} className='w-3/5 mt-7' />
                        <p className='relative text-[#06283D] text-[4rem] font-extrabold mt-7 ml-[-16px]'>
                            {parseInt(weatherData.main.temp)}
                            <span className='absolute ml-1 text-2xl'>°C</span>
                        </p>
                        <p className='text-[#06283D] text-2xl font-[500px] capitalize'>{weatherData.weather[0].description}</p>
                    </div>
                )}

                {weatherData && (
                    <div className='w-full flex justify-between mt-2'>
                        <div className='flex items-center w-1/2 h-[100px] pl-[20px] justify-start'>
                            <WaterIcon className='text-[#06283D] text-[26px] mr-2 mt-1'/>
                            <div className='text'>
                                <span className='text-[#06283D] text-[22px] font-medium'>{weatherData.main.humidity}%</span>
                                <p className='text-[#06283D] text-[14px] font-medium'>Humidity</p>
                            </div>
                        </div>
                        <div className='flex items-center w-1/2 h-[100px] pr-[20px] justify-end'>
                            <AirIcon className='text-[#06283D] text-[26px] mr-2 mt-1'/>
                            <div className='text'>
                                <span className='text-[#06283D] text-[22px] font-medium'>{parseInt(weatherData.wind.speed)}Km/h</span>
                                <p className='text-[#06283D] text-[14px] font-medium'>Wind Speed</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WeatherApp;