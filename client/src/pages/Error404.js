import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/error404.css";
import ErrorImg from "../assets/images/error.png";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div className="errorContainer">
      <h1>404</h1>
      <img src={ErrorImg} alt="404" loading="lazy" />
      <h2>WHOOPS!?</h2>
      <h3>
        You didn't break the internet, but we can't find what you are looking
        for.
      </h3>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </button>
    </div>
  );
};

export default Error404;
