import React from "react";
import Logo from '../images/Logo.png'
import {Link} from "react-router-dom"


function PrimaryNavbar(){
    return(
        <div className="PrimaryNavbar"> 
            <img className="Logo" src={Logo} alt={Logo}></img>
            <h1 className="Logoheading">Wiggles</h1>
            <div className="Links">
                <Link to="/"><h2>Home</h2></Link>
                <Link to="/about"><h2>About</h2></Link>
                <Link to="/contact"><h2>Contact Us</h2></Link>
                {/* <h2>About</h2>
                <h2>Contact Us</h2> */}
            </div>
        </div>
    )
}


export default PrimaryNavbar;