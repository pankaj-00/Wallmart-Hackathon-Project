import React from "react";

interface ChatMsgProps {
  transcript: string;
  sender: string;
}

const ChatMsg: React.FC<ChatMsgProps> = ({ transcript, sender }) => {

  return (
    (sender === "user" ? <div className="flex justify-end">
      {transcript && (
        <p className="bg-[#D9FDD3] mb-4 p-2 rounded max-w-[500px]">
          {transcript}
        </p>
      )}
    </div> :
      <div className="flex justify-start">
        {transcript && (
          <p className="bg-[#FFF7EE] mb-4 p-2 rounded max-w-[500px]">
            {transcript}
          </p>
        )}
      </div>
    )
  )
}

export default ChatMsg;