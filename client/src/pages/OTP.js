import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import "../styles/resetPassword.css";
import "../styles/login.css";
import { useLocation, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";

const OTP = () => {
  const location = useLocation();
  const email = location.state;
  const [otp, setOTP] = useState();
  const [userotp, setUserOTP] = useState([, , , , ,]);
  const [counter, setCounter] = useState(60);

  const navigate = useNavigate();

  // Setting OTP at load time
  useEffect(() => {
    setOTP(Math.floor(100000 + Math.random() * 900000));
  }, []);

  // Sending otp when otp is changed
  useEffect(() => {
    if (!otp) return;
    const templateParams = {
      email: email,
      otp: otp,
    };
    emailjs
      .send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID_OTP,
        templateParams,
        process.env.REACT_APP_PUBLIC_API_KEY
      )
      .then(
        (result) => {
          toast.success("OTP Sent Successfully!");
        },
        (error) => {
          toast.error("Error sending the OTP, Please try again");
        }
      );
  }, [otp]);

  // A 60s timer for expiry
  useEffect(() => {
    counter >= 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === -1) {
      const exp = document.getElementsByClassName("OTPLinkExpiry");
      exp[0].style.visibility = "hidden";
      setOTP(0);
    }
    if (counter === 0) {
      const resendLink = document.getElementsByClassName("OTPResend");
      resendLink[0].addEventListener("click", handleResend);
      resendLink[0].style.cursor = "pointer";
      resendLink[0].style.opacity = "1";
      toast.warn("Click Resend code to get new OTP.");
    }
  });

  const handleResend = () => {
    const exp = document.getElementsByClassName("OTPLinkExpiry");
    exp[0].style.visibility = "visible";
    setCounter(60);
    setOTP(Math.floor(100000 + Math.random() * 900000));
    const resendLink = document.getElementsByClassName("OTPResend");
    resendLink[0].style.cursor = "default";
    resendLink[0].removeEventListener("click", handleResend);
    resendLink[0].style.opacity = "0.5";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      toast.warn("OTP has expired. Click Resend code to get new OTP.");
      return;
    }
    let input = "";
    userotp.map((num) => {
      input = input + num;
      return input;
    });
    if (otp == input) {
      navigate("/verify/ChangePassword", { state: email });
    } else {
      toast.error("Wrong OTP entered.");
    }
  };

  return (
    <div className="resetPasswordWrapper">
      <Base />
      <div className="OTP">
        <h1 className="OTPHeading">Verify OTP</h1>
        <p className="OTPText">Please enter the OTP sent on your email</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="OTPBox">
            <OTPContainer index={0} userotp={userotp} setUserOTP={setUserOTP} />
            <OTPContainer index={1} userotp={userotp} setUserOTP={setUserOTP} />
            <OTPContainer index={2} userotp={userotp} setUserOTP={setUserOTP} />
            <OTPContainer index={3} userotp={userotp} setUserOTP={setUserOTP} />
            <OTPContainer index={4} userotp={userotp} setUserOTP={setUserOTP} />
            <OTPContainer index={5} userotp={userotp} setUserOTP={setUserOTP} />
          </div>
          <div className="OTPLink">
            <p className="OTPLinkExpiry">
              Expires in <span>{counter}</span>
            </p>
            <span className="OTPResend" disabled>
              Resend code
            </span>
          </div>
          <div className="OTPBtn">
            <Button type="submit" text="Verify" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTP;

const OTPContainer = ({ index, userotp, setUserOTP }) => {
  const arr = userotp;

  const handleChange = (e) => {
    arr[index] = e.target.value;
    setUserOTP(arr);
    document.activeElement.nextElementSibling &&
      document.activeElement.nextElementSibling.focus();
  };
  return (
    <>
      <input
        onChange={handleChange}
        placeholder="_"
        type="number"
        className="OTPContainer"
        maxLength={1}
        onInput={(e) => {
          if (e.target.value.length > e.target.maxLength)
            e.target.value = e.target.value.slice(e.target.maxLength, 2);
        }}
      />
    </>
  );
};
