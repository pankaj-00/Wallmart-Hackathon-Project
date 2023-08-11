"use client";
import React, { useState } from 'react';
import Popup from './Popup';
import icons from "@/icons";

const { PhoneIcon } = icons;

const Contact: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <button className="fixed bottom-4 right-4 w-16 h-16 rounded-full flex items-center justify-center bg-[#0072E1] hover:bg-[#406ed0] transition-colors duration-300" onClick={togglePopup}>
        <PhoneIcon className="text-white text-3xl" />
      </button>
      <Popup showPopup={showPopup} togglePopup={togglePopup} />
    </div>
  );
};

export default Contact;
