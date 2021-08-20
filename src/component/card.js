import React from 'react';
import "../css/card.css";
import light from "../img/light.png";
import dark from "../img/dark.png";
import orange from "../img/orange.png";
import purple from "../img/purple.png";
import india from "../img/india.png";
import gradiant from "../img/gradiant.png";


const Card = (props) => {

    const showTheme = (name) => {

        switch (name) {
            case "light":
                return light;

            case "dark":
                return dark;

            case "orange":
                return orange;

            case "purple":
                return purple;

            case "gradiant":
                return gradiant;

            case "india":
                return india;

            default:
                break;
        }
    }

    return (
        <div className="root">
            <div className="img_section">
                <img src={showTheme(props.name)} alt="Theme Images"></img>
            </div>
        </div>
    )
}

export default Card;