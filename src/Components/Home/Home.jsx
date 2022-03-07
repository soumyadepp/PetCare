import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
function Home() {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <h2>PetCare</h2>
        <p>Vets. Pets. Care.</p>
        <Link to="/signup">
          <button className="home-button">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
