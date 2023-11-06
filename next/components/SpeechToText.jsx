"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { updateChat, fetchChat, llmResponse } from "@/utils/utils";
import React, { useState, useEffect, useRef } from "react";
import icons from "@/icons";
import axios from "axios";
import ChatMsg from "./ChatMsg";

const { MicIcon, SpeakerIcon } = icons;

const SpeechToText = ({ session }) => {
  const [isListening, setIsListening] = useState(false);
  const [revealedText, setRevealedText] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isSpeaking, setIsSpeaking] = useState("");
  const [reply, setReply] = useState("");
  const [chat, setChat] = useState([]);
  const [url, setUrl] = useState("");

  const supabase = createClientComponentClient();
  const user = session?.user;

  const audioRef = useRef(null);
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // Set the scrollTop property to its maximum value
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  // Animated GIF for MIC isListening state
  const gifUrl = "/loading.gif";

  // listen Function
  function startListening() {
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
  }

  // Lovo API call
  const callAPI = async () => {
    console.log("init");
    const options = {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-API-KEY": process.env["NEXT_PUBLIC_VOICE_AI_KEY"],
      },
    };

    const body = JSON.stringify({
      speed: 1.25,
      text: reply,
      speaker: process.env["NEXT_PUBLIC_SPEAKER_ID"],
    });
    const response = await axios.post(
      process.env["NEXT_PUBLIC_VOICE_AI_URL"],
      body,
      options
    );
    const responseURL = response.data.data[0].urls[0];
    console.log(responseURL);
    setUrl(responseURL);
  };

  // fetching the chat history
  useEffect(() => {
    async function fetchChats() {
      try {
        const chatHistory = await fetchChat(user, supabase);
        setChat(chatHistory);
        console.log(chatHistory);
      } catch (error) {
        alert("Error loading user data!");
      }
    }
    fetchChats();
  }, []);

  //saving the user chat to database
  useEffect(() => {
      if (transcript && user.id) {
        const newChat = [...chat, { sender: "user", msg: transcript }];
        setChat(newChat);
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
          const response = await llmResponse(transcript);
          setReply(response.data.result);
        } catch (e) {
          console.log("Error in getResponse! \n", e);
        }
      }
      getResponse();
    }
  }, [isListening]);

  // triggering the voice AI after the response is received and save AI chat.
  useEffect(() => {
    if (reply) {
      callAPI();
      const newChat = [...chat, { sender: "AI", msg: reply }];
      setChat(newChat);
      updateChat(newChat, user, supabase);
    }
  }, [reply]);

  useEffect(() => {
    if (url) {
      playAudio();
    }
  }, [url]);

  console.log(user.id);

  return (

    

    <div className="flex flex-row h-[450px]">
      <div className="w-1/3 p-10 flex justify-center items-center">
        <div className="flex items-center justify-center">
          {isListening ? <img src={gifUrl} alt="Playing GIF" /> : null}
        </div>
        {!isListening && (
          <div className="flex items-center justify-center">
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

      <div className="mt-4 mx-6 w-2/3 overflow-auto flex flex-col" ref={containerRef}>
        {/* <div className="flex justify-end">
          {revealedText && (
            <p className="bg-[#D9FDD3] mb-3 p-2 rounded max-w-fit">
              {revealedText}
            </p>
          )}
        </div> */}

        {chat &&
          chat.map((cht, index) => {
            return (
              <div key={index}>
                <ChatMsg transcript={cht.msg} sender={cht.sender}/>
              </div>
            );
          })}

        {/* Lovo AI Speech */}
        {/* <button onClick={callAPI}>Call API</button> */}
        <div id="output">
          {url ? (
            <div>
              {/* <button onClick={playAudio}>Play Audio</button> */}
              <audio className="hidden" ref={audioRef} controls>
                <source src={url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : null}
        </div>

        <div className="flex justify-end">
          {reply && (
            <button
              className="my-3 bg-green-500 text-white p-2 rounded max-w-fit text-2xl"
              onClick={playAudio}
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
