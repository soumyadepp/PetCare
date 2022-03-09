import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Homepage from "./Components/Homepage/Homepage";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import VetUpload from "./Components/VetUpload/VetUpload";
import VetLogin from "./Components/VetLogin/VetLogin";
import VetDashboard from "./Components/VetDashboard/VetDashboard";
import SuccessPage from "./Components/SuccessPage/SuccessPage";
import SuccessAppointment from "./Components/SuccessAppointment/SuccessAppointment";
function App() {
  const user =
    localStorage.getItem("email") != null ? localStorage.getItem("email") : "";
  const vetUser =
    localStorage.getItem("vet_email") != null
      ? localStorage.getItem("vet_email")
      : "";
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar user={user} />
                <Homepage />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Navbar />
                <Signup />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Navbar user={user ? user : vetUser} />
                <Home />
              </>
            }
          />
          <Route
            path="/vet/upload"
            element={
              <>
                <Navbar />
                <VetUpload />
              </>
            }
          />
          <Route
            path="/vet/login"
            element={
              <>
                <Navbar />
                <VetLogin />
              </>
            }
          />
          <Route
            path="/pet/success"
            element={
              <>
                <Navbar user={user} />
                <SuccessPage />
              </>
            }
          />
          <Route
            path="/appointment/success"
            element={
              <>
                <Navbar user={user} />
                <SuccessAppointment />
              </>
            }
          />
          <Route
            path="/vet/dashboard"
            element={
              <>
                <Navbar user={vetUser} />
                <VetDashboard />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
