import React from "react";
import icons from "@/icons";
import SpeechToText from "./SpeechToText";
import { motion, AnimatePresence } from "framer-motion";
import { Session } from '@supabase/auth-helpers-nextjs'

const { CloseIcon, PhoneIcon } = icons;

interface PopupProps {
  showPopup: boolean;
  togglePopup: () => void;
  session: Session | null ;
}

const Popup: React.FC<PopupProps> = ({ showPopup, togglePopup, session }) => {
  return (
    <div>
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 1, scaleY: 0, transformOrigin: "center" }}
              animate={{ opacity: 1, scaleY: 1 }} 
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-lg relative h-fit w-2/3 rounded-3xl"
            >
              <div className="bg-[#0072E1] text-white text-center py-4 rounded-t-3xl">
                <button
                  className="absolute top-3 right-2 text-gray-200 hover:text-gray-400"
                  onClick={togglePopup}
                >
                  <CloseIcon className="text-4xl" />
                </button>
                <PhoneIcon className="absolute top-5 left-2 text-2xl ml-2" />
                <h2 className="text-2xl font-normal tracking-widest">
                  TALK WITH US
                </h2>
              </div>
              <SpeechToText session = {session}/>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Popup;
