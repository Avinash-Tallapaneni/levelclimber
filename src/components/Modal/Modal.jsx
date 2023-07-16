import React from "react";
import Buttons from "../Buttons/Buttons";
import { useNavigate } from "react-router-dom";

import "./Modal.css";

const Modal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const handlExitSlide = () => {
    navigate("/");
  };

  return (
    <div className="modal">
      <div className="button-action">
        <Buttons
          className="button exit-slide-button"
          text="Exit slide"
          onClick={handlExitSlide}
        />
        <Buttons
          className="button exit-modal-button"
          text="Exit Modal"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Modal;
