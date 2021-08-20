import React from 'react';
import { darkTheme } from './theme';

const DialogUI = (props) => {

    const appTheme = {
        width: "100%",
        height: "auto",
        backgroundColor: (props.theme !== null) ? `${props.theme.backgroundColor}` : `${darkTheme.backgroundColor}`,
        color: (props.theme !== null) ? `${props.theme.color}` : "",
        backgroundImage: (props.theme !== null) ? `${props.theme.backgroundImage}` : `${darkTheme.color}`,
        padding: "2vh",
        border: `1px solid ${(props.theme !== null) ? `${props.theme.color}` : ""}`,
        borderRadius: "16px"
    }


    return (
        <div style={(props.theme !== null) ? appTheme : darkTheme}>
            <div style={{ display: "flex", justifyContent: "center", position: "absolute", top: "40%", left: "10%", right: "10%" }}>
                <div style={appTheme}>
                    <p style={{ width: "100%", height: "auto", fontSize: "3vh", fontWeight: "bold", textAlign: "left", paddingLeft: "0vh", paddingTop: "0vh" }}>Please Wait</p>
                    <progress />
                    <p style={{ width: "100%", height: "auto", fontSize: "2.5vh", fontWeight: "bold", textAlign: "center" }}>Applying Theme</p>
                </div>
            </div>
        </div>
    )
}

export default DialogUI;