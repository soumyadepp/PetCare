import React from "react";
import { useState, useEffect } from "react";
import "./Signup.scss";
import { Link } from "react-router-dom";
import image2 from "../../Assets/image1.svg";
import CachedIcon from "@material-ui/icons/Cached";
import Axios from "axios";
function Signup() {
  //equivalent to document.ready
  useEffect(() => {
    if (
      localStorage.getItem("vet_email") != null &&
      localStorage.getItem("vet_email").length > 0
    ) {
      setLoading(true);
      window.location.href = "/vet/dashboard";
    } else if (localStorage.getItem("email") != undefined) {
      setLoading(true);
      window.location.href = "/dashboard";
    }
  }, []);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const validateForm = () => {
    if (
      email.length == 0 ||
      username.length == 0 ||
      password.length == 0 ||
      repeatPassword.length == 0
    ) {
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      setError("Please fill out all fields");
      setLoading(false);
      return;
    }
    if (password != repeatPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    } else {
      Axios.post("http://localhost:4000/app/signup", {
        fullName: username,
        email: email,
        password: password,
      })
        .then((response) => {
          console.log(response);
          if (response.data.error === null) window.location.href = "/login";
          else {
            setLoading(false);
            setError("User already exists.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="signup-container">
      {loading && (
        <div className="loader">
          <CachedIcon className="loading-icon" />
          <h1>Loading</h1>
        </div>
      )}
      {!loading && (
        <>
          <div className="signup-left">
            <img src={image2} className="signup-image" alt="image" />
          </div>
          <div className="signup-right">
            <h2>Sign Up To Cure</h2>
            <form className="signup-form">
              <input
                type="email"
                name="email"
                required="required"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                name="username"
                required="required"
                placeholder="Full Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                id="password"
                type="password"
                required="required"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                required="required"
                placeholder="Enter Password"
                name="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <button
                type="submit"
                className="submit-btn"
                onClick={(e) => handleSubmit(e)}
              >
                Register
              </button>
              {error && <p className="error-div">{error}</p>}
              <p className="signup-link"> Already have an account?</p>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "#000",
                  fontSize: "3vmin",
                }}
              >
                Login
              </Link>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Signup;
