import React from "react";
import icons from "@/icons";
import SpeechToText from "./SpeechToText";

const { CloseIcon, PhoneIcon } = icons;

interface PopupProps {
  showPopup: boolean;
  togglePopup: () => void;
}

const Popup: React.FC<PopupProps> = ({ showPopup, togglePopup }) => {
  return (
    <div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white shadow-lg relative h-1/2 w-1/5 rounded-3xl">
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
            <SpeechToText />
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
