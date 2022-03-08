import React, { useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import AppointmentRequest from "../AppointmentRequest/AppointmentRequest";
import "./VetDashboard.scss";
function VetDashboard() {
  const image = localStorage.getItem("vet_pic");
  const name = localStorage.getItem("vet_name");
  const email = localStorage.getItem("vet_email");
  const degree = localStorage.getItem("vet_degree");
  const clinic = localStorage.getItem("vet_clinic");
  const data = [
    { name: "January", uv: 400, pv: 2400, amt: 2400 },
    { name: "February", uv: 300, pv: 4567, amt: 2400 },
    { name: "March", uv: 200, pv: 1398, amt: 2400 },
    { name: "April", uv: 278, pv: 9800, amt: 2400 },
    { name: "May", uv: 189, pv: 5100, amt: 2900 },
    { name: "June", uv: 189, pv: 2800, amt: 3400 },
    { name: "July", uv: 189, pv: 4800, amt: 5400 },
    { name: "August", uv: 189, pv: 3800, amt: 6800 },
    { name: "September", uv: 189, pv: 4300, amt: 7800 },
    { name: "October", uv: 189, pv: 4300, amt: 8800 },
    { name: "November", uv: 189, pv: 4300, amt: 9800 },
    { name: "December", uv: 189, pv: 4300, amt: 10800 },
  ];
  useEffect(() => {
    if (
      localStorage.getItem("vet_email") == null ||
      localStorage.getItem("vet_email") == "undefined"
    ) {
      window.location.href = "/vet/login";
    }
  }, []);
  return (
    <div className="vet-dashboard">
      <div className="vet-dashboard-left">
        <h2>My Profile</h2>
        <div className="img-div">
          <img src={image} alt="img" />
          <h2>{name}</h2>
          <h3>Email : {email}</h3>
        </div>
        <div className="detail">
          <button className="detail-btn">
            <span className="label">Degree : </span>
            {degree}
          </button>
          <button className="detail-btn">
            <span className="label">Clinic : </span>
            {clinic}
          </button>
        </div>
      </div>
      <div className="vet-dashboard-right">
        <h2>My Dashboard</h2>
        <div className="vet-dashboard-right-top">
          <div className="card">
            <h2>Appointments</h2>
            <div className="card-body">
              <p>40</p>
            </div>
          </div>
          <div className="card">
            <h2>Revenue</h2>
            <div className="card-body">
              <p>40,800</p>
            </div>
          </div>
          <div className="card">
            <h2>Customers</h2>
            <div className="card-body">
              <p>120</p>
            </div>
          </div>
        </div>
        <h3>Income</h3>
        <LineChart width={600} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="uv" stroke="#114ea5" />
          <Line type="monotone" dataKey="pv" stroke="#000" />
        </LineChart>
      </div>
      <div className="vet-dashboard-appointments">
        <div className="vet-dashboard-appointments-body">
          <h2 className="appointment-header">Appointment Requests</h2>
          <div className="vet-dashboard-pending">
            <AppointmentRequest
              appointment={{
                petName: "Bobby",
                date: "10/10/2020",
                time: "10:00 AM",
                status: "Pending",
              }}
              userEmail="ghoshsoumyadeep330@gmail.com"
            />
            <AppointmentRequest
              appointment={{
                petName: "Bobby",
                date: "10/10/2020",
                time: "10:00 AM",
                status: "Pending",
              }}
              userEmail="ghoshsoumyadeep330@gmail.com"
            />
            <AppointmentRequest
              appointment={{
                petName: "Bobby",
                date: "10/10/2020",
                time: "10:00 AM",
                status: "Pending",
              }}
              userEmail="ghoshsoumyadeep330@gmail.com"
            />
            <AppointmentRequest
              appointment={{
                petName: "Bobby",
                date: "10/10/2020",
                time: "10:00 AM",
                status: "Pending",
              }}
              userEmail="ghoshsoumyadeep330@gmail.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VetDashboard;
