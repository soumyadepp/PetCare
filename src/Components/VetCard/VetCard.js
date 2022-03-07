import React from "react";
import "./VetCard.css";
function VetCard({ vet }) {
  return (
    <div className="vetcard-container">
      <div className="vetcard-header">
        <div className="vetcard-header-left">
          <img src={vet.image} alt="vet" className="vetcard-image" />
        </div>
        <div className="vetcard-header-right">
          <h3 className="vetcard-name">{vet.name}</h3>
          <h4 className="vetcard-specialty">{vet.specialty}</h4>
        </div>
      </div>
    </div>
  );
}

export default VetCard;
