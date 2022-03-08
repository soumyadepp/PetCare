import React from "react";
import { useEffect } from "react";
import "./Homepage.scss";
import AddIcon from "@material-ui/icons/AddBoxOutlined";
import Modal, { bodyOpenClassName } from "react-modal/lib/components/Modal";
import { useState } from "react";
import MedicationIcon from "@material-ui/icons/LocalHospitalOutlined";
import BookOnlineIcon from "@material-ui/icons/BookOutlined";
import CachedIcon from "@material-ui/icons/Cached";
import UpdateIcon from "@material-ui/icons/Update";
import { Link } from "react-router-dom";

import axios from "axios";
import VetCard from "../VetCard/VetCard";
import VetsNearMe from "../VetsNearMe/VetsNearMe";
function Homepage() {
  const userEmail = localStorage.getItem("email");
  const [open, setOpen] = useState(false);
  const [fileInputState, setFileInputState] = useState("");
  const [petName, setPetName] = useState("");
  const [breed, setBreedName] = useState("");
  const [userPet, setUserPet] = useState("");
  const [age, setAge] = useState();
  const [weight, setWeight] = useState();
  const [previewSource, setPreviewSource] = useState("");
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
    setPreviewSource("");
    setPetName("");
    setFileInputState("");
    setOpen(false);
  };
  const uploadImage = async (base64EncodedImage) => {
    setLoading(true);
    console.log(base64EncodedImage);
    const petData = {
      name: petName,
      image: base64EncodedImage,
      owner: userEmail,
      breed: breed,
      age: age,
      weight: weight,
    };
    try {
      axios
        .post("http://localhost:4000/app/pet", petData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
          console.log("some error occurred");
        });
      window.location.href = "/pet/success";
    } catch (error) {
      console.log(error);
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.3)",
    },
  };
  const modalDivStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };
  const modalFormStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  };
  const modalInputStyle = {
    padding: "8px",
    margin: "10px",
    border: "none",
    outline: "none",
    background: "#efefef",
    width: "100%",
  };
  const btnStyle = {
    padding: "5px",
    margin: "10px",
    fontSize: "2vmin",
    background: "#000",
    width: "100%",
    color: "#fff",
  };
  const closeBtnStyle = {
    padding: "5px",
    margin: "10px",
    fontSize: "2vmin",
    background: "#d10023",
    width: "100%",
    color: "#fff",
  };
  const handleClick = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "/login";
  };
  useEffect(() => {
    if (
      localStorage.getItem("vet_email") != null &&
      localStorage.getItem("vet_email").length > 0
    ) {
      setLoading(true);
      window.location.href = "/vet/dashboard";
    } else if (
      localStorage.getItem("email") == "undefined" ||
      localStorage.getItem("email") == null
    ) {
      setLoading(true);
      window.location.href = "/login";
    }
    axios
      .get(`http://localhost:4000/app/pet/${userEmail}`)
      .then((res) => {
        setUserPet(res.data);
      })
      .catch((err) => {
        setUserPet({ image: "", name: "Unable to fetch at this moment" });
      });
    axios
      .get("http://localhost:4000/app/vets")
      .then((res) => {
        setVets(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userPet]);
  return (
    <div className="dashboard-container">
      {loading && (
        <div className="loading-div">
          <CachedIcon className="loading-icon" />
          <h1>Loading</h1>
        </div>
      )}
      {!loading && (
        <div className="dashboard-left">
          {!userPet && (
            <div className="dashboard-left-top">
              <h2>Add your Pet</h2>
              <AddIcon className="add-icon" onClick={() => setOpen(!open)} />
            </div>
          )}
          {userPet && (
            <div className="dashboard-pet">
              <img src={userPet.image} alt="" />
              <h2>{userPet.name}</h2>
              <h3>{userPet.breed}</h3>
              <h3>{userPet.age} Years</h3>
            </div>
          )}
          <Modal
            isOpen={open}
            requestClose={() => setOpen(false)}
            style={customStyles}
          >
            <div className="modal-form-div" style={modalDivStyle}>
              <h2>
                Add your pet{" "}
                <span
                  style={{
                    color: "#d10023",
                    fontSize: "2vmin",
                    marginInlineStart: "10px",
                    padding: "10px",
                  }}
                >
                  FREE
                </span>
              </h2>
              <form
                className="modal-form"
                style={modalFormStyle}
                onSubmit={handleSubmit}
              >
                <div className="preview-div">
                  {previewSource && (
                    <>
                      <img
                        src={previewSource}
                        style={{ height: "25vmin", objectFit: "contain" }}
                      />
                    </>
                  )}
                </div>
                <input
                  type="text"
                  className="form-control"
                  required="required"
                  placeholder="Name"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  style={modalInputStyle}
                />
                <input type="hidden" value={userEmail} />
                <select
                  className="form-control"
                  style={modalInputStyle}
                  onChange={(e) => setBreedName(e.target.value)}
                >
                  <option value="Breed">Breed</option>
                  <option value="Doberman">Doberman</option>
                  <option value="BullDog">BullDog</option>
                  <option value="Shiba">Shiba</option>
                  <option value="Pug">Pug</option>
                  <option value="Labrador">Labrador</option>
                  <option value="German Shepherd">German Shepherd</option>
                </select>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="form-control"
                  placeholder="Age"
                  style={modalInputStyle}
                  required="required"
                />
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="form-control"
                  placeholder="Weight"
                  style={modalInputStyle}
                  required="required"
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleFileInputChange}
                  value={fileInputState}
                  style={modalInputStyle}
                />
                <button
                  type="submit"
                  style={btnStyle}
                  onClick={(e) => handleSubmit(e)}
                >
                  Upload
                </button>
              </form>
              <button style={closeBtnStyle} onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          </Modal>
        </div>
      )}
      {!loading && (
        <div className="dashboard-middle">
          <h2>Vets near you</h2>
          <VetsNearMe vets={vets} pet={userPet} />
        </div>
      )}
      {!loading && (
        <div className="dashboard-right">
          <div className="select-btn-container">
            <button className="select-btn">
              <MedicationIcon /> Vets Near Me
            </button>
            <button className="select-btn">
              <BookOnlineIcon /> My Appointments
            </button>
            <button className="select-btn">
              <UpdateIcon /> Upcoming
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
