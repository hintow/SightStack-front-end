import React from 'react';
import './Popup.css'; 

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const Popup : React.FC<PopupProps > = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="popup-message">{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;