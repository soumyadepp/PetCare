import React from "react";
import { useState, useEffect } from "react";
import "./Login.scss";
import image1 from "../../Assets/image1.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import CachedIcon from "@material-ui/icons/Cached";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //this is equivalent to document.ready
  useEffect(() => {
    if (
      localStorage.getItem("vet_email") != null &&
      localStorage.getItem("vet_email").length > 0
    ) {
      setLoading(true);
      window.location.href = "/vet/dashboard";
    } else if (
      localStorage.getItem("email") != null &&
      localStorage.getItem("email") != "undefined"
    ) {
      setLoading(true);
      window.location.href = "/dashboard";
    }
  }, []);
  const validateForm = () => {
    if (email.length == 0 || password.length == 0) {
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email: email,
      password: password,
    };
    if (validateForm()) {
      axios
        .post("http://localhost:4000/app/login", data)
        .then((res) => {
          console.log(res);
          console.log("success");
          if (res.data.email != null) {
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("id", res.data._id);
            window.location.href = "/dashboard";
          } else {
            setLoading(false);
            setError("Invalid Credentials");
          }
        })
        .catch((err) => {
          console.log("error");
          console.log(err);
        });
    } else {
      setLoading(false);
      setError("Please fill out all the fields");
    }
  };
  return (
    <div className="login-container">
      {loading && (
        <div className="loader">
          <CachedIcon className="loading-icon" />
          <h1>Logging In...</h1>
        </div>
      )}
      {!loading && (
        <>
          <div className="login-left">
            <h2>Find a vet for your pet.</h2>
            <img
              className="login-image"
              src="https://i0.wp.com/ideasfornames.com/wp-content/uploads/2019/12/shutterstock_777196288.jpg?fit=1000%2C667&ssl=1"
              alt="image"
            />
          </div>
          <div className="login-right">
            <h2>Log In To Cure</h2>
            <form className="login-form">
              <input
                className="form-control"
                required="required"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                value={email}
                type="email"
              />
              <input
                className="form-control"
                required="required"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
              />
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="submit-btn"
              >
                Login
              </button>
              <span>
                New user?{" "}
                <Link
                  style={{ textDecoration: "none", color: "#3f3f3f" }}
                  to="/signup"
                >
                  Sign up
                </Link>
              </span>
              {error && <p className="error-div">{error}</p>}
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
