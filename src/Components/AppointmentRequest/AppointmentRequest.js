import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import "./AppointmentRequest.scss";
import axios from "axios";
function AppointmentRequest({ appointment, pet }) {
  var date = new Date(appointment.date);
  const apptId = appointment._id;

  const handleApprove = (e) => {
    axios
      .put(`http://localhost:4000/app/appointments/users/${apptId}`)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleReject = (e) => {
    axios
      .delete(`http://localhost:4000/app/appointments/${apptId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };
  date = date.toLocaleDateString();
  return (
    <div className="appointment-request-container">
      <div className="appointment-request-header">
        <h1>Pending Appointment</h1>
        <img src={pet.image} alt="pet" className="pet-image" />
      </div>
      <div className="appointment-request-body">
        <h2 className="date">Date : {date}</h2>
        <h2 className="time">Time : {appointment.time}</h2>
        <p>Pet Name : {pet.name}</p>
      </div>
      <div className="appointment-request-footer">
        <div
          className="appointment-request-footer-left"
          onClick={(e) => handleApprove(e)}
        >
          <CheckCircleIcon />
          <h2>Accept</h2>
        </div>
        <div
          className="appointment-request-footer-right"
          onClick={(e) => handleReject(e)}
        >
          <CancelIcon />
          <h2>Reject</h2>
        </div>
      </div>
    </div>
  );
}

export default AppointmentRequest;
