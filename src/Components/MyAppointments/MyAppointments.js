import React from "react";
import Appointment from "../Appointment/Appointment";
import "./MyAppointments.scss";
function MyAppointments({ appointments }) {
  return (
    <div className="appointment-container">
      <div className="appointment-wrapper">
        <h2>My Appointments</h2>
        <div className="appointment-card-grid">
          {appointments.map((appointment) => (
            <Appointment appointment={appointment} key={appointment._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyAppointments;
