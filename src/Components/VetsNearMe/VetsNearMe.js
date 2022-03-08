import React from "react";
import "./VetsNearMe.scss";
import VetCard from "../VetCard/VetCard";
function VetsNearMe({ vets, pet }) {
  return (
    <div className="dashboard-middle-bottom">
      {vets.map((vet) => {
        return <VetCard key={vet.email} vet={vet} pet={pet} />;
      })}
    </div>
  );
}

export default VetsNearMe;
