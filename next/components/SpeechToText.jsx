"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { updateChat, fetchChat, llmResponse } from "@/utils/utils";
import React, { useState, useEffect } from "react";
import icons from "@/icons";

const { MicIcon, SpeakerIcon } = icons;

const SpeechToText = ({ session }) => {

  const [isListening, setIsListening] = useState(false);
  const [revealedText, setRevealedText] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isSpeaking, setIsSpeaking] = useState("");
  const [reply, setReply] = useState("");
  const [chat, setChat] = useState("");
  
  const supabase = createClientComponentClient();
  const user = session?.user;

  // Animated GIF for MIC isListening state
  const gifUrl = "https://i.imgur.com/cLzMXgm.gif";

  // speak function
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
  
  // listen Function
  function startListening(){
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
    recognition.onresult = async (event) => {
      const speechResult = event.results[0][0].transcript;
      console.log(speechResult);
      setTranscript(speechResult);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };

  // fetching the chat history
  useEffect(() => {
    async function fetchChats() {
      try {
        const chatHistory = await fetchChat(user, supabase);
        setChat(chatHistory);
        // console.log(chatHistory);
      } catch (error) {
        alert("Error loading user data!");
      }
    }
    fetchChats();
  }, [chat]);

  //saving the user chat to database
  useEffect(() => {
    if (transcript) {
      const newChat = [...chat, { msg: transcript, sender: "user" }];
      updateChat(newChat, user, supabase);
    }
  }, [transcript]);

  // word by word text reveal effect
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

  // getting the response from the LLM
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

  // triggering the sound of the AI after the response is received.
  useEffect(() => {
    if (reply) {
      const newChat = [...chat, { sender: "AI", msg: reply }];
      updateChat(newChat);
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



  console.log(user.id);

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
