import React, { useState } from "react";
import Base from "./Base";
import "../index.css";
import "../CSS/Login.css"
import ProfilePhoto from "../images/profilephoto.png"
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IconContext } from "react-icons";
import Footer from "./Footer";

function LandingPage(){
    const navigate  = useNavigate();
    const[email, setEmail]=useState("");
    const[password, setPassword]=useState("");
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const handleCLick = () => setIsRevealPwd(!isRevealPwd); 


    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response= await fetch('http://localhost:3001/login',{
            method:"POST",
            body : JSON.stringify({
                email,
                password,
            }),
            credentials:"include",
            headers: {
                'Content-type': 'application/json',
            },
        })
        .catch((err) => {
            console.log(err.message);
        });
        const data = await response.json();
        if(data.status==="ok"){
            navigate("/Profile");
        }
        else{
            alert(data.message);
        }
    };

    const handleForgot=async(e)=>{
        if(!email){
            alert("Please enter the email first.")
            return;
        }
        const response= await fetch('http://localhost:3001/login',{
            method:"POST",
            body : JSON.stringify({
                email,
                password:"wiggles",
            }),
            credentials:"include",
            headers: {
                'Content-type': 'application/json',
            },
        })
        .catch((err) => {
            console.log(err.message);
        });
        const data = await response.json();
        if(data.status==="forgot"){
            navigate("/OTPverification", {state : email});
        }
        else{
            alert("Email not found");
        }
    }

    return(
        <>
        <Base />
        <div className="loginContainer">
            <img className='landingImg' src={ProfilePhoto} alt="" />
            <div className="loginInfo">
                <h1>LOGIN</h1>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="emailContainer">
                        <input 
                            type="email" 
                            name="email" 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder="Email" 
                        />
                    </div>
                    <div className="pwdContainer">
                        <input  
                            type={isRevealPwd ? "text" : "password"} 
                            name="pwd" 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder="Password" 
                        />
                        <IconContext.Provider value={{ className:"revealpwd" }}>
                        <span onClick={handleCLick}>
                            {isRevealPwd ? (<FaRegEye/>) : (<FaRegEyeSlash/>)}
                        </span>
                        </IconContext.Provider>
                    </div>
                    <div className="secondary-login">
                        <span onClick={handleForgot}>Forgot password?</span>
                        <div>
                            <button type="submit" className="btn">Login</button>
                        </div>
                    </div>
                    <p className="not-register">Don't have an account? <Link to={"/Register"} className="links-color"> Register</Link> </p> 
                </form>
            </div>
        </div>
        <Footer/>
        </>
    )
}
export default LandingPage;