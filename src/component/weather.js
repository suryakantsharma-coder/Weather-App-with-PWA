import React, { useEffect, useState } from 'react';
import Screen from './weatherScreen';
import { darkTheme } from './theme';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MainUI = () => {

    const [data, setData] = useState();
    const [timedetail, setDate] = useState();
    const [timestamp, setTimestamp] = useState();
    const [city, setCity] = useState("");
    const [Isday, setDay] = useState('');
    const [time, setTime] = useState('');
    const [theme, setTheme] = useState(null);

    useEffect(() => {

        function getLocation() {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, denyPermission);
            } else {
                console.log("this browser is not support geoloaction");
            }
        }

        function denyPermission(error) {

            fetchData("delhi", process.env.REACT_APP_WEATHER_API_KEY);
        }


        //Show position 

        function showPosition(position) {
            let end_point = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=2f5b549442ef551ba85084f8174e3902`

            //console.log("lat : " + position.coords.latitude + "lon :" + position.coords.longitude)
            fetch(end_point).then(response => response.json()).then(data => {
                setData(data);
                getTimeZone(data);
            }).catch(error => {
                console.log(error);
            });
        }


        //getting country details or Time

        const getTimeZone = (data) => {

            if (data.message !== "city not found") {
                const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.REACT_APP_TIMEZONE_KEY}&format=json&by=position&lat=${data.coord.lat}&lng=${data.coord.lon}`;
                fetch(url).then((response) => response.json()).then((result) => {

                    //console.log("current : " + Date.parse(result.formatted) + " time " + result.formatted);

                    //code take sunrise and sunset  and convert it into searched country time.
                    const sunrise = new Date(data.sys.sunrise * 1000).getTime();
                    const convertedTime = covertTime(sunrise, ((result.gmtOffset) / 60) / 60).toString();
                    const sunriseCountryTime = convertedTime.substring(16, 18);

                    const sunset = new Date(data.sys.sunset * 1000).getTime();
                    const convertedTimesunset = covertTime(sunset, ((result.gmtOffset) / 60) / 60).toString();
                    const sunsetCountryTime = convertedTimesunset.substring(16, 18);

                    setDate(result.gmtOffset);
                    setTimestamp(result.formatted.substring(11, 17));

                    //console.log(covertTime(sunrise, ((result.gmtOffset) / 60) / 60))

                    const time = result.formatted.substring(11, 13);
                    setTime(time);
                    if (parseInt(time) >= sunsetCountryTime) {
                        setDay(false);
                    } else if (parseInt(time) >= sunriseCountryTime) {
                        setDay(true);
                    } else {
                        setDay(false);
                    }
                }).catch((error) => {
                    console.log(error);
                })
            } else {

            }
        }

        const covertTime = (time, offset) => {
            let utc = time + (new Date().getTimezoneOffset() * 60000);
            utc = new Date(utc + (3600000 * offset));
            return utc;
        }

        const fetchData = async (City, API_KEY) => {

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${API_KEY}`;;
            try {
                const response = await fetch(url);
                const result = await response.json();

                if (result.cod === 200) {
                    setData(result);
                    getTimeZone(result);
                } else {
                    toast.error(result.message, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }


                // const t = new Date(result.sys.sunset * 1000).toString();

            } catch (error) {
                console.log(error);
            }

        }

        //getting selected theme 

        const getTheme = () => {
            let obj = localStorage.getItem("selected_theme");
            setTheme(JSON.parse(obj));
        }

        if (city !== "") {
            fetchData(city, process.env.REACT_APP_WEATHER_API_KEY);
            getTheme();
        } else {
            getLocation();
            getTheme();
        }
    }, [city])



    return (
        <div style={(theme !== null) ? theme : darkTheme}>
            {
                data && <Screen
                    maintemp={(data.cod === 200) ? (data.main.temp - 273.15).toPrecision(2) : ""}
                    city={data.name}
                    countrycode={data.sys.country}
                    wind={data.wind.speed}
                    cloudy={data.clouds.all}
                    maxtemp={(data.main.temp_max - 273.15).toPrecision(2)}
                    mintemp={(data.main.temp_min - 273.15).toPrecision(2)}
                    humidity={data.main.humidity}
                    pressure={data.main.pressure}
                    Isday={Isday}
                    currentposition={time}
                    currenttimestamp={timestamp}
                    lat={data.coord.lat} lon={data.coord.lon}
                    img={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    weatherdescription={data.weather[0].description}
                    cityfn={setCity}
                    sunrise={data.sys.sunrise}
                    sunset={data.sys.sunset}
                    settheme={setTheme}
                    theme={(theme === null) ? darkTheme : theme}
                    gmtoffset={timedetail} />
            }

            <ToastContainer />
        </div>

    )
}

export default MainUI;