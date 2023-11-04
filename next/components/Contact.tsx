"use client"
import React, { useState } from "react";
import Popup from "./Popup";
import icons from "@/icons";
import styles from './style.module.css';
import {motion} from 'framer-motion';
import { Session } from '@supabase/auth-helpers-nextjs'

const { PhoneIcon } = icons;

const Contact = ({ session }: { session: Session | null }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <motion.button
        className={`fixed bottom-10 right-10 w-16 h-16 rounded-full flex items-center justify-center bg-[#0072E1] hover:bg-[#406ed0] transition-colors duration-300`}
        whileHover={{scale: 1.4}}
        whileTap={{scale: 1.1}}
        onClick={togglePopup}
      >
        <PhoneIcon className="text-white text-3xl" />
      </motion.button>
      <div className={`${styles.popup_container} ${showPopup ? styles.active : ""}`}>
        <Popup showPopup={showPopup} togglePopup={togglePopup} session = {session} />
      </div>
    </div>
  );
};

export default Contact;
