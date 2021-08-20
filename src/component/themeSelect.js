import React, { useState, useEffect } from 'react';
import Dialog from './dialogbox';
import Card from './card';
import "../css/themeSelect.css";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router';
import { lightTheme, darkTheme, orangeTheme, purpleTheme, gradiantTheme, indianTheme } from './theme';

const arr = ["light", "dark", "orange", "purple", "gradiant", "india"];
const ThemeUI = () => {

    const history = useHistory();

    let [next, setNext] = useState(0);
    const [theme, setTheme] = useState(null);
    const [show, setShow] = useState(false);
    const [effect, setEffect] = useState(false);

    useEffect(() => {
        const getTheme = () => {
            let obj = localStorage.getItem("selected_theme");
            setTheme(JSON.parse(obj));
        }

        getTheme();

    }, [effect])

    const nxt = () => {
        if (next < 5) {
            setNext(next += 1);
        }
    }

    const pre = () => {
        if (next > 0) {
            setNext(next -= 1);
        }
    }

    const apply = (name) => {
        var bool = false;
        switch (name) {
            case "light":
                localStorage.setItem("selected_theme", JSON.stringify(lightTheme));
                bool = true;
                break;

            case "dark":
                localStorage.setItem("selected_theme", JSON.stringify(darkTheme));
                bool = true;
                break;

            case "orange":
                localStorage.setItem("selected_theme", JSON.stringify(orangeTheme));
                bool = true;
                break;

            case "purple":
                localStorage.setItem("selected_theme", JSON.stringify(purpleTheme));
                bool = true;
                break;

            case "gradiant":
                localStorage.setItem("selected_theme", JSON.stringify(gradiantTheme));
                bool = true;
                break;

            case "india":
                localStorage.setItem("selected_theme", JSON.stringify(indianTheme));
                bool = true;
                break;

            default:
                console.log("No Theme Available Here");
                break
        }

        if (bool) {
            setTimeout(() => {
                setEffect(!effect);
            }, 4000)
        }
    }


    return (
        <div className="root" style={(theme !== null) ? theme : darkTheme}>
            <h2 style={{ textAlign: "left", marginLeft: "1vh" }}>Themes</h2>

            { /*home Icon*/}
            <HomeIcon style={{ width: "8vw", height: "6vh", position: "absolute", right: "8", top: "8" }} onClick={() => { history.push("./") }} />

            <div className="card_div" style={{ height: "82vh", marginTop: "2vh" }} >
                <Card name={arr[next]} />
            </div>

            <div className="arrow_section" style={{ display: "flex", marginTop: "2.6vh" }}>
                <div style={{ width: "50%", height: "auto" }}>
                    <ArrowUpwardIcon style={{ transform: "rotate(-90deg)", fontSize: "6vh", fontWeight: "bold", cursor: "pointer" }} onClick={() => { pre() }} />
                </div>

                <div style={{ width: "50%", height: "auto" }}>
                    <p className="btn_p" style={{ width: "auto", height: "auto", fontSize: "3vh", padding: "1.5vh", fontWeight: "bold" }} onClick={() => {
                        apply(arr[next]);
                        setShow(true);
                        setTimeout(() => {
                            setShow(false);
                        }, 4000)
                    }}>Apply</p>

                </div>

                <div style={{ width: "50%", height: "auto", textAlign: "center" }}>
                    <ArrowUpwardIcon style={{ transform: "rotate(90deg)", fontSize: "6vh", fontWeight: "bold", cursor: "pointer" }} onClick={() => { nxt() }} />
                </div>
            </div>




            <div className="inner_section">
            </div>
            {(show) ? <Dialog theme={theme} /> : null}
        </div>
    )
}

export default ThemeUI;

// {
//     <div className="root" style={theme}>


//         <h2 style={{ textAlign: "left", marginLeft: "1vh" }}>Themes</h2>
//         <div className="card_div" >
//             <Card name={arr[next]} />
//         </div>

//         <div className="arrow_section" >
//             <div style={{ width: "50%", height: "auto", color: "blue" }}>
//                 <ArrowUpwardIcon style={{ transform: "rotate(-90deg)", fontSize: "6vh", fontWeight: "bold" }} onClick={() => { pre() }} />
//             </div>

//             <div style={{ width: "50%", height: "auto", textAlign: "center" }}>
//                 <ArrowUpwardIcon style={{ transform: "rotate(90deg)", fontSize: "6vh", fontWeight: "bold" }} onClick={() => { nxt() }} />
//             </div>
//         </div>

//         <button>sdkfljsdjf</button>

//         <p className="btn_p" onClick={() => {
//             apply(arr[next]);
//             setShow(true);
//             setTimeout(() => {
//                 setShow(false);
//             }, 4000)
//         }}>Apply</p>


//         <div className="inner_section">
//         </div>
//         {(show) ? <Dialog theme={(theme === null) ? darkTheme : theme} /> : null}
//     </div >
// }