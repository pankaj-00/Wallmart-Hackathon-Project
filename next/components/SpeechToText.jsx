import React, { useState, useEffect } from "react";
import icons from "@/icons";

const { MicIcon } = icons;

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [revealedText, setRevealedText] = useState("");
  const [reply, setReply] = useState("");
  const [isSpeaking, setIsSpeaking] = useState("");

  const gifUrl = "https://i.imgur.com/cLzMXgm.gif";

  async function llmResponse() {
    const response = await fetch("http://localhost:8000/convAI", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ query: transcript }),
    });

    return response;
  }

  function speakText() {
    if (revealedText) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(reply);
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
   if(reply){
    function speakText() {
      if (transcript) {
        setIsSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(reply);
        utterance.onend = () => {
          setIsSpeaking(false);
        };
        speechSynthesis.speak(utterance);
      }
    };

    speakText();
   }
  }, [reply]);

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

  useEffect(() => {
    if (!isListening && transcript) {
      async function getResponse() {
        const response = await llmResponse();
        setReply((await response.json()).result);
      }
      getResponse();
    }
  }, [isListening]);

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
      console.log(speechResult);
      setTranscript(speechResult);
    };
    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  console.log(reply);

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
        {reply && <p className="bg-gray-100 p-2 rounded">{reply}</p>}
        <button
          className="mt-2 bg-green-500 text-white p-2 rounded"
          onClick={speakText}
        >
          Speak Text
        </button>
      </div>
    </div>
  );
};

export default SpeechToText;
