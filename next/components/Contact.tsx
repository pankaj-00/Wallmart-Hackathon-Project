"use client"
import React, { useState } from "react";
import Popup from "./Popup";
import icons from "@/icons";
import styles from './style.module.css';

const { PhoneIcon } = icons;

const Contact: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <button
        className={`fixed bottom-10 right-4 w-16 h-16 rounded-full flex items-center justify-center bg-[#0072E1] hover:bg-[#406ed0] transition-colors duration-300`}
        onClick={togglePopup}
      >
        <PhoneIcon className="text-white text-3xl" />
      </button>
      <div className={`${styles.popup_container} ${showPopup ? styles.active : ""}`}>
        <Popup showPopup={showPopup} togglePopup={togglePopup} />
      </div>
    </div>
  );
};

export default Contact;
