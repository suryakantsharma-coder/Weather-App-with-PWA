import React from 'react';
import '../css/weatherScreen.css';
import { useHistory } from 'react-router';
import SemiCircleProgressBar from "react-progressbar-semicircle";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import WavesIcon from '@material-ui/icons/Waves';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import WbCloudyIcon from '@material-ui/icons/WbCloudy';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import SearchIcon from '@material-ui/icons/Search';
import PaletteIcon from '@material-ui/icons/Palette';



var city = 'Delhi';

const WeatherUI = (props) => {
    const history = useHistory();

    const covertTime = (time, offset) => {
        let utc = time + (new Date().getTimezoneOffset() * 60000);
        utc = new Date(utc + (3600000 * offset));
        return utc;
    }


    const spendDay = (msunrise, msunset, current) => {
        // let sunset = new Date(msunset * 1000).toString();
        let sunset = msunset.substring(16, 18);

        // let sunrise = new Date(props.sunrise * 1000).toString();
        let sunrise = msunrise.substring(16, 18);


        let percentage = 0;
        if (current > sunrise && current < sunset) {
            percentage = (current / sunset) * 100;
        } else if (current === sunset) {
            percentage = 0;
        } else if (current > sunset || current <= sunrise) {

            //(current > sunset) ? percentage = (sunrise / current) * 100 : percentage = (current / sunset) * 100;

            let totalNight = (parseInt(23 - sunset) + parseInt(sunrise));
            let currentTime = (current < sunset) ? parseInt(23 - sunset) + parseInt(current) : Math.abs(sunset - current);
            percentage = (currentTime / totalNight) * 100;

            if (currentTime === (totalNight - 1)) {
                current += 1;
                percentage = (currentTime / totalNight) * 100;
            }

            //console.log(totalNight + ", " + currentTime + ", " + percentage);
        }
        return ((percentage.toPrecision(2) === isNaN) ? 0 : percentage);
    }

    //console.log(spendDay(covertTime(new Date(props.sunrise * 1000).getTime(), ((props.gmtoffset) / 60) / 60).toString(), covertTime(new Date(props.sunset * 1000).getTime(), ((props.gmtoffset) / 60) / 60).toString(), props.currentposition));

    return (
        <div style={props.theme} className="root">
            <div className="fullscreen">
                <div className="inner_class">
                    <div className="temperature">

                        <div className="upper_section">
                            <SearchIcon style={{ width: "8vw", height: "6vh", position: "absolute", right: "22", top: "8" }} onClick={() => {
                                let city = (window.prompt("Enter Your City"));
                                props.cityfn((city !== null) ? city : "")
                            }} />
                            <PaletteIcon style={{ width: "8vw", height: "6vh", position: "absolute", left: "8", top: "8" }} onClick={() => { history.push("./theme") }} />

                            {/*Images*/}

                            <div >
                                <img src={props.img} alt="weather images" style={{ backgroundColor: "yellow" }} className="load_images" />
                            </div>

                            {/* Main Temp*/}

                            <div className="main_temp">
                                <span>{props.maintemp}</span><p>°C</p>
                            </div>

                            <div style={{ width: "100%", height: "auto", marginTop: "4vh" }}>
                                <h3>{props.weatherdescription}</h3>
                            </div>

                            {/*city*/}

                            <div className="location_section">
                                <LocationOnIcon />
                                <p>{props.city} <span style={{ backgroundColor: "yellow", borderRadius: "5px", fontSize: "2.5vh", fontWeight: "bold", color: "black", paddingLeft: "0.5vh", paddingRight: "0.5vh", fontFamily: `'Oswald', sans-serif`, letterSpacing: "0.1vh" }}> {(props.countrycode === "IN") ? "India" : props.countrycode}</span> </p>
                            </div>

                            <div className="temp_details">
                                <div>
                                    <WavesIcon />
                                    <p>{props.wind}m/s</p>
                                </div>

                                <div>
                                    <TrendingUpIcon />
                                    <p>{props.maxtemp}°C</p>
                                </div>
                                <div>
                                    <TrendingDownIcon />
                                    <p>{props.mintemp}°C</p>
                                </div>
                                <div>
                                    <WbCloudyIcon />
                                    <p>{props.cloudy}%</p>
                                </div>
                            </div>

                        </div>

                        {/* Extra Details*/}

                        <div className="lower_section">

                            <div className="extra_details">
                                <p>Humanity : {props.humidity}%</p>
                                <p>Pressure : {props.pressure}hpa</p>
                                {props.currenttimestamp && <p>Current Time : {(props.currentposition > 12) ? `${(props.currentposition - 12)}:${props.currenttimestamp.substring(3, 5)} pm` : `${(props.currentposition)}:${props.currenttimestamp.substring(3, 5)} am`} </p>}
                            </div>

                            <div >
                                {
                                    (props.Isday) ?
                                        <div style={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", marginTop: "1.5vh" }}>
                                            <WbSunnyIcon style={{ width: "3vh", height: "auto" }} />
                                            <h3 style={{ width: "auto", height: "auto", marginLeft: "1vh" }}>Day</h3>
                                        </div>
                                        :
                                        <div style={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", marginTop: "1.5vh" }}>
                                            <NightsStayIcon style={{ width: "3vh", height: "auto" }} />
                                            <h3 style={{ width: "auto", height: "auto", marginLeft: "1vh" }}>Night</h3>
                                        </div>

                                }
                            </div>

                            {/* Graph Section*/}

                            <div className="graph_section">
                                <div>
                                    <div className="sdiv">
                                        <ArrowUpwardIcon style={{ width: "3vh", height: "auto" }} />
                                        {(props.Isday) ? <WbSunnyIcon style={{ width: "3vh", height: "auto" }} /> : <NightsStayIcon style={{ width: "3vh", height: "auto" }} />}
                                    </div>
                                    <div><p style={{ width: "100%", height: "auto" }}>{(props.Isday) ? covertTime(new Date(props.sunrise * 1000).getTime(), ((props.gmtoffset) / 60) / 60).toString().substring(16, 21) : covertTime(new Date(props.sunset * 1000).getTime(), ((props.gmtoffset) / 60) / 60).toString().substring(16, 21)}</p></div>
                                </div>


                                <div className="gdiv">
                                    <SemiCircleProgressBar strokeWidth={4} background="gray" stroke={(props.Isday) ? "yellow" : `${props.theme.color}`} percentage={spendDay(covertTime(new Date(props.sunrise * 1000).getTime(), ((props.gmtoffset) / 60) / 60).toString(), covertTime(new Date(props.sunset * 1000).getTime(), ((props.gmtoffset) / 60) / 60).toString(), props.currentposition)} />
                                </div>

                                <div>
                                    <div className="ediv">
                                        {(props.Isday) ? <WbSunnyIcon style={{ width: "3vh", height: "auto" }} /> : <NightsStayIcon style={{ width: "3vh", height: "auto" }} />}
                                        <ArrowDownwardIcon style={{ width: "3vh", height: "auto" }} />
                                    </div>
                                    <div><p style={{ width: "100%", height: "auto" }}>{(props.Isday) ? covertTime(new Date(props.sunset * 1000).getTime(), ((props.gmtoffset) / 60) / 60).toString().substring(16, 21) : covertTime(new Date(props.sunrise * 1000).getTime(), ((props.gmtoffset) / 60) / 60).toString().substring(16, 21)}</p></div>
                                </div>
                            </div>

                            {/* location in latitude and longitude*/}

                            <div className="lat_lon">
                                <p>Latitude : {props.lat} <br></br> Longitude : {props.lon}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default WeatherUI;

export { city };
