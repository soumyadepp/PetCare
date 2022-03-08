import React, { useState } from "react";
import "./VetCard.scss";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import BookIcon from "@material-ui/icons/Book";
import Modal from "react-modal";
function VetCard({ vet, pet }) {
  const [open, setOpen] = useState(false);
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
    padding: "5px",
    margin: "10px",
    fontSize: "2vmin",
    background: "#000",
    width: "100%",
    outline: "none",
    border: "none",
    color: "#fff",
  };
  const closeBtnStyle = {
    padding: "5px",
    margin: "10px",
    fontSize: "2vmin",
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
        <p>{vet.degree}</p>
        <p>{vet.clinic}</p>
        <p>{vet.address}</p>
        <button className="book-btn" onClick={() => setOpen(true)}>
          Book
          <BookIcon />
        </button>
        <button className="call-btn">
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
            <h3>Doctor Name : {vet.name}</h3>
            <form style={modalFormStyle}>
              <input style={modalInputStyle} type="date" placeholder="Date" />
              <input style={modalInputStyle} type="time" placeholder="Time" />
              <textarea
                style={modalInputStyle}
                resize="none"
                type="text"
                placeholder="Decription"
              />
              <button style={btnStyle}>Submit</button>
              <button style={closeBtnStyle} onClick={() => setOpen(false)}>
                Close
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default VetCard;
