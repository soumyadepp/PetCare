import React from "react";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { Link } from "react-router-dom";
import "./SuccessAppointment.scss";
function SuccessPage() {
  return (
    <div className="success-container">
      <div className="success-top">
        <h2>Your Appointment request was successfully sent.</h2>
        <CheckCircleOutlineIcon className="verify" />
      </div>
      <Link to="/dashboard">
        <button className="btn">Back to Dashboard</button>
      </Link>
    </div>
  );
}

export default SuccessPage;
