import React, { useState } from 'react';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.error('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.onstart = () => {
      setIsListening(true);
      setRecorderState(initReacording);
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
    <div className="p-4">
      <button
        className={`px-4 py-2 rounded ${isListening ? 'bg-gray-500' : 'bg-blue-500'} text-white`}
        onClick={startListening}
        
        disabled={isListening}
      >
        {isListening ? 'Listening...' : 'Start Listening'}
      </button>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Transcript:</h2>
        <p className="mt-2">{transcript}</p>
      </div>
    </div>
  );
};

export default SpeechToText;
