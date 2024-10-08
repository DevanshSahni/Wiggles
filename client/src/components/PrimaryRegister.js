import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "../styles/login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconContext } from "react-icons";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react";
import dogAnimation from "../assets/animations/dog animation.json";
import { postData } from "../utils/api";
import Button from "./Button";

const Register = ({
  email,
  setEmail,
  phone,
  setPhone,
  password,
  setPassword,
  setShowPrimary,
}) => {
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleClick = () => setIsRevealPwd(!isRevealPwd);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!phone.match(/^\d{10}$/)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (
      !password.match(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,20}$/
      )
    ) {
      toast.error(
        "Password must have length between 8-20 characters and must contain atleast 1 alphabet and 1 number."
      );
      return;
    }

    if (!isTermsAccepted) {
      toast.error("You must accept the community guidelines to continue.");
      return;
    }

    try {
      const response = await postData("checkRegister", {
        email: email,
      });
      let data = response.data;
      if (data.status === "ok") {
        setShowPrimary(false);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="registerWrapper">
      <form
        className="registerSection"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h1 className="registerHeading">Create your account</h1>
        <p>
          Already a member?{" "}
          <Link to={"/login"} className="linksColor">
            Login
          </Link>
        </p>
        <div className="phoneContainer">
          <input
            autoComplete="true"
            className="pno"
            type="text"
            name="phone"
            placeholder="Phone number"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </div>
        <div className="emailContainer">
          <input
            className="email"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            autoComplete="none"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="pwdContainer">
          <input
            className="pwd"
            type={isRevealPwd ? "text" : "password"}
            name="pwd"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <IconContext.Provider value={{ className: "revealPwd" }}>
            <span onClick={handleClick}>
              {isRevealPwd ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </IconContext.Provider>
        </div>
        <div className="termsContainer">
          <input
            type="checkbox"
            id="terms"
            className="termsCheckbox"
            checked={isTermsAccepted}
            onChange={(event) => setIsTermsAccepted(event.target.checked)}
          />
          <label htmlFor="terms">
            I agree to the{" "}
            <Link
              to="/community-guidelines"
              className="linksColor"
              target="_blank"
            >
              Community Guidelines
            </Link>
          </label>
        </div>
        <div className="btnContainer">
          <Button type="button" path="/login" text="&lt; Back" />
          <Button type="submit" text="Next &gt;" />
        </div>
      </form>
      <Lottie
        className="illustration"
        animationData={dogAnimation}
        loop={true}
      />
    </div>
  );
};

export default Register;
