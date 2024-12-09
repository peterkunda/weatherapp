import { DateTime } from "luxon";

const { useSearchParams } = require("next/navigation")

const APIKEY = 'edd85938a59785a7e56af7f327f9ed8d'
const BASE_URL = "https://api.open   weathermap.org/data/2.5/weather?q=Tokyo&appid=edd85938a59785a7e56af7f327f9ed8d"

// https://api.openweathermap.org/2.5/onecall?lat=35.6895&lon=139.6917&exclude=current,minutely,hourly,alerts&appid=edd85938a59785a7e56af7f327f9ed8d&units=metric

const getweatherData = (infoType, SearchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({
        ...SearchParams, appid: API_KEY
    });

    return fetch(url)
        .then((res) => res.json())
}
const formattedCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data

    const { main: details, icon } = weather[0]

    return {
        lat, lon, temp, feels_like, temp_min, temp_max,
        humidity, name, dt, country, sunrise, sunset, details, icon, speed
    };

};
const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;
    daily = daily.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    });

    hourly = houly.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp.day,
            icon: d.weather[0].icon,
        };
    });

    return {timezone, daily, houly};
}

const getFormattedWeatherData = async (SearchParams) => {
    const formattedCurrentWeather = await getweatherData
        ('weather', SearchParams)
        .then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData('onecall', {
        lat, lon, exclude: 'current,minutely,alerts', units: searchParams.units,
    }).then(formatForecastWeather);

    return  {...formattedCurrentWeather, ...formattedForecastWeather};
};

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyy' | Local time: 'hh:mm a") => DateTime.formSeconds(secs).SetZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>`http://openweathermap.org/img/wn/${code}@2x.png`



export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };

