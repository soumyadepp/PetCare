import React, { useEffect } from "react";
import "./VetDashboard.scss";
function VetDashboard() {
  const image = localStorage.getItem("pic");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const degree = localStorage.getItem("degree");
  const clinic = localStorage.getItem("clinic");
  useEffect(() => {
    if (email == null || email == undefined) {
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
        <h2>Welcome {name}</h2>
      </div>
    </div>
  );
}

export default VetDashboard;
