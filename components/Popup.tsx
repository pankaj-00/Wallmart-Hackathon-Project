import React from "react";
import icons from "@/icons";

const { CloseIcon } = icons;

interface PopupProps {
  showPopup: boolean;
  togglePopup: () => void;
}

const Popup: React.FC<PopupProps> = ({ showPopup, togglePopup }) => {
  return (
    <div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={togglePopup}
            >
              <CloseIcon className="text-xl" />
            </button>
            <h2 className="text-xl font-semibold mb-2">Popup Content</h2>
            <p>This is the content of the popup.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
