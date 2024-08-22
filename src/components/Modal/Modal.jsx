import { useState } from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  if (!isOpen) return null;

  return (
    <div className="modal-overlay backdrop-brightness-75 bg-transparent " onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1>This is Modal</h1>

        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
