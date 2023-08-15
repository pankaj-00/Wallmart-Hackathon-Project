import React, { useState, useEffect } from "react";
import icons from "@/icons";

const { MicIcon } = icons;

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [revealedText, setRevealedText] = useState("");

  const gifUrl = "https://i.imgur.com/cLzMXgm.gif";

  useEffect(() => {
    if (transcript) {
      const wordsArray = transcript.split(" ");
      let currentRevealedText = "";
      const interval = setInterval(() => {
        if (wordsArray.length === 0) {
          clearInterval(interval);
        } else {
          currentRevealedText += wordsArray.shift() + " ";
          setRevealedText(currentRevealedText);
        }
      }, 300);
    }
  }, [transcript]);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.onstart = () => {
      setIsListening(true);
    };
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
    };
    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="container mx-auto p-10 flex flex-col items-center w-full">
      <div className="flex items-center justify-center">
        {isListening ? (
          <img
            src={gifUrl}
            alt="Playing GIF"
            style={{
              width: "200px",
            }}
          />
        ) : null}
      </div>
      {!isListening && (
        <div
          className="flex items-center justify-center"
          style={{ height: "200px" }}
        >
          <button
            className={`p-4 rounded-full transition-transform duration-200 bg-blue-500 text-white`}
            onClick={startListening}
            disabled={isListening}
          >
            <MicIcon className="text-2xl" />
          </button>
        </div>
      )}
      <div className="mt-4">
        {/* <h2 className="text-xl font-semibold mb-2">Transcript:</h2> */}
        <p className="bg-gray-100 p-2 rounded">{revealedText}</p>
      </div>
    </div>
  );
};

export default SpeechToText;
