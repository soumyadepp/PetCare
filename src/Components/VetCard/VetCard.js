import React, { useState, useEffect } from "react";
import "./VetCard.scss";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import BookIcon from "@material-ui/icons/Book";
import Modal from "react-modal";
import axios from "axios";
Modal.setAppElement("#root");
function VetCard({ vet, pet }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const petName = pet.name;
  const petAge = pet.age;
  const petWeight = pet.weight;
  const petImage = pet.image;
  const petBreed = pet.breed;
  const userId = localStorage.getItem("id");
  const vetId = vet._id;
  useEffect(() => {
    //if past date is selected
    if (Date.parse(date) < Date.now()) {
      setError("Please select a valid date");
    } else {
      setError("");
    }
  }, [date]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !date ||
      !time ||
      !description ||
      !petName ||
      !petAge ||
      !petWeight ||
      !petBreed ||
      !vetId ||
      !userId
    ) {
      setOpen(true);
      setError("One or more fields are missing");
      return;
    } else {
      const formData = {
        date: date,
        time: time,
        description: description,
        petDetails: {
          name: petName,
          age: petAge,
          image: petImage,
          weight: petWeight,
          breed: petBreed,
        },
        doctorId: vetId,
        userId: userId,
      };
      if (error.length === 0) {
        axios
          .post("http://localhost:4000/app/appointments/users", formData)
          .then((res) => {
            if (res.data.error) {
              setError(res.data.error);
            } else {
              setError("");
              setOpen(false);
              window.location.href = "/appointment/success";
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
      backgroundColor: "rgba(0,0,0,0.5)",
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
    padding: "8px",
    margin: "10px",
    fontSize: "3vmin",
    background: "#000",
    width: "100%",
    outline: "none",
    border: "none",
    color: "#fff",
  };
  const closeBtnStyle = {
    padding: "8px",
    margin: "10px",
    fontSize: "3vmin",
    background: "#d10023",
    width: "100%",
    outline: "none",
    border: "none",
    color: "#fff",
  };
  return (
    <div className="vetcard-container">
      <div className="vetcard-left">
        <img src={vet.image} alt="vet" className="vet-image" />
      </div>
      <div className="vetcard-right">
        <h2>{vet.name}</h2>
        <p>
          <span>Qualification:</span> {vet.degree}
        </p>
        <p>
          <span>Clinic : </span>
          {vet.clinic}
        </p>
        <p>
          <span>Address :</span> {vet.address}
        </p>
        <button
          className={pet ? "book-btn" : "inactive-btn"}
          onClick={() => (pet ? setOpen(true) : null)}
        >
          Book
          <BookIcon />
        </button>
        <button className={pet ? "call-btn" : "inactive-btn"}>
          Call
          <LocalPhoneIcon />
        </button>
      </div>
      {open && (
        <Modal
          isOpen={open}
          closeOnEsc={true}
          onRequestClose={() => setOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div style={modalDivStyle}>
            <h2>Book an Appointment</h2>

            <h3 style={{ fontSize: "2.5vmin" }}>Doctor Name : {vet.name}</h3>
            <form style={modalFormStyle} onSubmit={handleSubmit}>
              <input
                style={modalInputStyle}
                type="date"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                style={modalInputStyle}
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Time"
              />
              <textarea
                style={modalInputStyle}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                resize="none"
                type="text"
                placeholder="Decription"
              />
              <button type="submit" style={btnStyle}>
                Submit
              </button>
              <button style={closeBtnStyle} onClick={() => setOpen(false)}>
                Close
              </button>
              {error && (
                <div
                  style={{ color: "#d10023", fontWeight: "600" }}
                  className="error-div"
                >
                  {error}
                </div>
              )}
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default VetCard;
