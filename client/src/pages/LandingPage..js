import Navbar from '../components/PrimaryNavbar'
import React from "react";
import Landingphoto from "../images/photo.png"
import "../App.css"


function Landing(){
    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            await axios.post("http://localhost:3001/auth/register",{
                //complete this
            })
        }
        catch(err){
            console.log(err);

        }
    }
    return (
    <div>
        {/* <Navbar/> */}
        <div>
            <img className="LandingPhoto" src={Landingphoto} alt=''></img>

            <div className='LoginSection'>
                <form method='' class="LoginDetail" onSubmit={onSubmit}>
                    <input id="LoginEmail" className='SignUpInput' type="email" placeholder='Email Id' required/><br></br>

                    <input id="LoginPassword" className='SignUpInput' type="password" placeholder='Password' required/><br/>
                </form>
                <button type="submit" className='btn'>Login</button>

                <h4 className="RegisterNowText">Not a member? <a>Register Now!</a></h4>
            </div>

            
        </div>
    </div>)
}

export default Landing
