'use client'

import Image from 'next/image'

import axios from 'axios'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import background  from '../app/assets/background.avif'
import Weather from './components/Weather'
import Spinner from './components/Spinner'

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Array<{
    icon: string;
    main: string;
  }>;
  wind: {
    speed: number;
  };
}

interface WeatherProps {
  data: WeatherData;
}



export default function Home() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState<WeatherData | undefined>(undefined);
  const [loading, setLoading] = useState(false)



  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
  
  

  const fecthWeather =  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    axios.get(url)
    .then(res => {
      // console.log(res.data)
      setWeather(res.data)      
    })
    setCity('')
    setLoading(false)
  
  }

  if(loading) {
    return <Spinner />
  } else {

    return (

      <main className="">
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]'> </div>
        <Image src={background} alt='background' layout='fill'
        className='object-cover'
        />
  
       {/* Search */}
       <div className='relative flex justify-between items-center max-w-[500px] m-auto pt-4 text-white z-10'>
  <form onSubmit={fecthWeather} className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl'>
    <div>
      <input 
        onChange={(e) => setCity(e.target.value)}
        value={city}
        className='bg-transparent border-none text-white focus:outline-none text-2xl placeholder:text-white' 
        type="text" 
        placeholder='Search City' 
      />
    </div>
    <button type="submit">
      <BsSearch size={20}/>
    </button>
  </form>
</div>
  
        {/* Weather */}
  
        {weather?.main && <Weather data={weather} />}
  
      
      </main>
    )
  }

 
}
