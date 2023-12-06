
import { FaWind } from "react-icons/fa";
import Image from 'next/image';
import React from 'react';
import { FaTemperatureArrowDown, FaTemperatureArrowUp  } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";

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


const Weather: React.FC<WeatherProps> = ({ data }) => {
  
  return (
    <div className='relative flex flex-col justify-between max-w-[500px] w-full xl:h-[90vh] m-auto p-4 text-gray-300 z-10'>
      {/* Top */}
      <div className='relative justify-between items-center flex mb-2'>
    <div className='flex  items-center'>
        {data.weather && data.weather[0] && data.main && (
            <>
                <Image
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt='Weather Icon'
                    width='100'
                    height='100'
                />
                <p className='text-xl xl:text-2xl'>{data.weather[0].main}</p>
                
            
           
            </>
        )}
         
    </div>
    <div>
              <p className='text-4xl xl:text-6xl'>{data.main.temp.toFixed(0)}&#176;</p>
    </div>
</div>
 
      {/* Bottom */}

<div className='bg-slate-700/70 relative p-8 rounded-xl border border-white/20'>
    <p className='text-3xl text-center pb-10 md:underline underline-offset-8'>Weather in {data.name}</p>
    <div className='flex flex-col bg-slate-700/80 justify-between text-center px-8 rounded-xl border border-white/20'>
        <div className='flex justify-between gap-7 p-2'>
            <p className='text-2xl'>Feels Like</p>
            <p className='font-bold text-2xl'>{data.main.feels_like.toFixed(0)}&#176;</p>
            
        </div>
        <div className='flex justify-between gap-7 p-2'>
            <p className='text-2xl'>Humidity</p>
            <p className='font-bold text-2xl items-center flex text-center justify-center gap-1'>{data.main.humidity} <WiHumidity className='text-3xl' /></p>
            
        </div>
        <div className='flex gap-7 p-2 justify-between'>
            <p className='text-2xl'>Winds</p>
            <p className='font-bold text-2xl items-center flex text-center justify-center gap-2'>{data.wind.speed.toFixed(0)} MPH <FaWind /></p>            
        </div>
        <div className='flex justify-between gap-7 p-2'>
            <p className='text-2xl'>Min Temp</p>
            <p className='font-bold text-2xl items-center flex text-center justify-center gap-3'>{data.main.temp_min.toFixed(0)} <FaTemperatureArrowDown className='text-blue-500'/></p>
            
            
        </div >
        <div className='flex justify-between gap-7 p-2'>
            <p className='text-2xl'>Max Temp</p>
            <p className='font-bold text-2xl items-center flex text-center justify-center gap-3'>{data.main.temp_max.toFixed(0)} <FaTemperatureArrowUp className='text-red-500'/></p>
           
        </div>
        </div>
    </div>
   


    </div>
  );
};

export default Weather;