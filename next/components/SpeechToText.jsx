import React, { useState, useEffect } from "react";
import icons from "@/icons";
import { emit } from "process";

const { MicIcon, SpeakerIcon } = icons;

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [revealedText, setRevealedText] = useState("");
  const [reply, setReply] = useState("");
  const [isSpeaking, setIsSpeaking] = useState("");

  // Animated GIF for MIC isListening state
  const gifUrl = "https://i.imgur.com/cLzMXgm.gif";


  // API call to the Flask (or Node) server
  async function llmResponse() {
    const response = await fetch(process.env.NEXT_PUBLIC_FLASK_API_URL, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ query: transcript }),
    });

    return response;
  }

  function speakText() {
    if (reply) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(reply);
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      speechSynthesis.speak(utterance);
    }
  }


  // Effect for triggering the sound of the AI after the response is received.
  useEffect(() => {
    if (reply) {
      function speakText() {
        if (revealedText) {
          setIsSpeaking(true);
          const utterance = new SpeechSynthesisUtterance(reply);
          utterance.onend = () => {
            setIsSpeaking(false);
          };
          speechSynthesis.speak(utterance);
        }
      }

      speakText();
    }
  }, [reply]);


  // Word by word text reveal effect
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


  // Getting the Response from the LLM 
  useEffect(() => {
    if (!isListening && transcript) {
      async function getResponse() {
        try {
          const response = await llmResponse();
          setReply((await response.json()).result);
        } catch (e) {
          console.log("Error in getResponse! \n", e);
        }
      }
      getResponse();
    }
  }, [isListening]);


  // Listen Function
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

  // console.log(reply);

  return (
    <div>
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
      </div>

      <div className="mt-4 mx-6 flex flex-col ">
        <div className="flex justify-end">
          {/* <h2 className="text-xl font-semibold mb-2">Transcript:</h2> */}
          {revealedText && (
            <p className="bg-[#D9FDD3] mb-3 p-2 rounded max-w-fit">
              {revealedText}
            </p>
          )}
        </div>
        <div>
          {reply && (
            <p className="bg-[#FFF7EE] mt-4 p-2 rounded max-w-fit">{reply}</p>
          )}
        </div>
        <div className="flex justify-end">
          {reply && (
            <button
              className="my-3 bg-green-500 text-white p-2 rounded max-w-fit text-2xl"
              onClick={speakText}
            >
              <SpeakerIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
