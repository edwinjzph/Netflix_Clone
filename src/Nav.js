import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./Nav.css";

function Nav() {
    const [show,handleShow] =useState(false);
    const history = useHistory()
    const transitionNarbar = () => {
        if (window.scrollY > 100){
            handleShow(true);
        }else{
            handleShow(false);
        }
    }
 useEffect(() =>{
window.addEventListener("scroll",transitionNarbar);
return () => window.removeEventListener("scroll",transitionNarbar);
 },[])
    return (
        <div className={`nav ${show  && 'nav_black'}`}>
            <div className="nav_contents">
            <img className="nav_logo"
                   onClick={() => history.push("/")}
             src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" 
            alt=""/>
            <img 
            onClick={() => history.push("/profile")}

            className="nav_avatar"
             src="https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg"
             alt=""/>
            </div>
        </div>
    )
}

export default Nav
