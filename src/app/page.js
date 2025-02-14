import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import { getWaitUntilPromiseFromEvent } from 'next/dist/server/web/spec-extension/fetch-event';
import getFormattedWeatherData from '@/services/weatherService';
export default function Home() {
     const fetchWeather = async () => {
      const data = await getFormattedWeatherData({ q: "london "});
      console.log(data);
     };

    fetchWeather();

  return (
    <div className='mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl
     shadow-gray-400'>
      <TopButtons />
      <Inputs />

      <TimeAndLocation />
      <TemperatureAndDetails />

      <Forecast title="hourly forecast" />
      <Forecast title="daily forecast" />
    </div>
  );
}
 
