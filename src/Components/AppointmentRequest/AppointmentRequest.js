import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import "./AppointmentRequest.scss";
function AppointmentRequest({ appointment, userEmail }) {
  return (
    <div className="appointment-request-container">
      <div className="appointment-request-header">
        <h1>{appointment.petName}</h1>
      </div>
      <div className="appointment-request-body">
        <h2 className="date">Date : {appointment.date}</h2>
        <h2 className="time">Time : {appointment.time}</h2>
        <p>from : {userEmail}</p>
      </div>
      <div className="appointment-request-footer">
        <div className="appointment-request-footer-left">
          <CheckCircleIcon />
          <h2>Accept</h2>
        </div>
        <div className="appointment-request-footer-right">
          <CancelIcon />
          <h2>Reject</h2>
        </div>
      </div>
    </div>
  );
}

export default AppointmentRequest;
