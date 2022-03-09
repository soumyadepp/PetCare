import React, { useState, useEffect } from "react";
import image1 from "../../Assets/dogvet.png";
import CachedIcon from "@material-ui/icons/Cached";
import "./VetLogin.scss";
import axios from "axios";
function VetLogin() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("email") != null) {
      setLoading(true);
      window.location.href = "/dashboard";
    }
    if (localStorage.getItem("vet_email") != null) {
      setLoading(true);
      window.location.href = "/vet/dashboard";
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email: email,
      phone: phone,
    };
    if (email.length > 0 && phone.length > 0) {
      axios.post("http://localhost:4000/app/login/vets", data).then((res) => {
        console.log(res.data);
        if (res.data.email == null || res.data.phone == null) {
          setError("Invalid Credentials");
          setLoading(false);
        } else {
          console.log("Success");
          localStorage.setItem("vet_id", res.data._id);
          localStorage.setItem("vet_email", res.data.email);
          localStorage.setItem("vet_phone", res.data.phone);
          localStorage.setItem("vet_name", res.data.name);
          localStorage.setItem("vet_pic", res.data.image);
          localStorage.setItem("vet_degree", res.data.degree);
          localStorage.setItem("vet_clinic", res.data.clinic);
          setError("");
          window.location.href = "/vet/dashboard";
        }
      });
    } else {
      setLoading(false);
      setError("Please enter all fields");
    }
  };
  return (
    <div className="vetlogin-container">
      {loading && (
        <div className="loading-div">
          <CachedIcon className="loading-icon" />
          <h1>Loading</h1>
        </div>
      )}
      {!loading && (
        <>
          <img className="vetlogin-image" src={image1} alt="img" />
          <div className="vetlogin-form-wrapper">
            <h2>Login As A Vet</h2>
            <form className="vetlogin-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={phone}
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
              <input type="submit" className="submit-btn" value="Login" />
              {error && <span className="error-text">{error}</span>}
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default VetLogin;
