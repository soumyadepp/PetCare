import React, { useState, useEffect } from "react";
import "./Appointment.scss";
import axios from "axios";
function Appointment({ appointment }) {
  console.log(appointment);
  const [doctor, setDoctor] = useState("");
  var date = new Date(appointment.date);
  date = date.toLocaleDateString();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/app/vets/${appointment.doctorId}`)
      .then((res) => {
        setDoctor(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [appointment.doctorId]);
  return (
    <div className="appointment-card">
      <div className="appointment-card-left">
        <div className="appointment-card-left-top">
          <h2>Date :{date}</h2>
          <h2>Time : {appointment.time}</h2>
        </div>
        <div className="appointment-card-left-bottom">
          <button
            className={
              appointment.status === true ? "approved-btn" : "pending-btn"
            }
          >
            {appointment.status === true ? "Approved" : "Pending"}
          </button>
          {appointment.status === true && (
            <button className="cancel-btn">Cancel</button>
          )}
        </div>
      </div>
      <div className="appointment-card-right">
        <div className="appointment-card-right-top">
          <img src={doctor.image} alt="doctor" />
        </div>
      </div>
    </div>
  );
}

export default Appointment;
