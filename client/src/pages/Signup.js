import React, { useState } from "react";
import Base from "../components/Base";
import "../styles/login.css";
import PrimaryRegister from "../components/PrimaryRegister";
import SecondaryRegister from "../components/SecondaryRegister";

const Signup = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [petName, setPetName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState(null);
  const [vaccinated, setVaccinated] = useState("");
  const [image, setImage] = useState(null);
  const [bio, setBio] = useState("");

  const [showPrimary, setShowPrimary] = useState(true);

  return (
    <div>
      <Base />
      <div className="registerContainer">
        {showPrimary ? (
          <PrimaryRegister
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            setShowPrimary={setShowPrimary}
          />
        ) : (
          <SecondaryRegister
            phone={phone}
            email={email}
            password={password}
            setShowPrimary={setShowPrimary}
            petName={petName}
            setPetName={setPetName}
            dob={dob}
            setDob={setDob}
            gender={gender}
            setGender={setGender}
            breed={breed}
            setBreed={setBreed}
            vaccinated={vaccinated}
            setVaccinated={setVaccinated}
            image={image}
            setImage={setImage}
            bio={bio}
            setBio={setBio}
          />
        )}
      </div>
    </div>
  );
};

export default Signup;
