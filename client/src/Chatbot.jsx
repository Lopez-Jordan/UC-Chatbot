import { useState } from 'react';
import './Chatbot.css';

const MAX_CHARACTERS = 200;     // CHHANGE

export default function Chatbot() {
  const [userMessage, setUserMessage] = useState("");
  const [fullChat, setFullChat] = useState([]);
  const [isChatbotThinking, setIsChatbotThinking] = useState(false);

  const handleInputChange = (e) => {    // CHECKING UNDER 200 CHARACTERS FUNCTION
    if (e.target.value.length <= MAX_CHARACTERS) {
      setUserMessage(e.target.value);
    }
  };

  const handleSubmit = async (e) => {     // FORM SUBMIT FUNCTION
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (userMessage.trim() === "") {
      return;
    }

    let currMessage = userMessage;
    setUserMessage("");

    setFullChat([
      { role: 'user', content: currMessage },
      ...fullChat,
    ]);

    setIsChatbotThinking(true);

    try {
      let result = await fetch(`/api/response?message=${encodeURIComponent(currMessage)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      if (result.ok) {
        let responseData = await result.json();
        setFullChat([
          { role: 'chatbot', content: responseData.message },
          { role: 'user', content: currMessage },
          ...fullChat,
        ]);
      } else {
        alert('something went wrong :/');
      }
    } catch (error) {
      console.error(error);
    }
    

    setIsChatbotThinking(false);
  };

  const charactersRemaining = MAX_CHARACTERS - userMessage.length;


  return (  // RETURN
    <div className='main'>
      <div id='chats'>
        {isChatbotThinking && (
          <div className="message chatbot thinking">
            <div className="loader">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        {(fullChat.length == 0) && (
          <div className='message chatbot first'>
            Hello, what can I help you with today?
          </div>
        )}
        {fullChat.map((chat, index) => (
          <div key={index} className={`message ${chat.role}`}>
            {chat.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="input-container">
        <textarea
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder='Message here'
          id="inputText"
          value={userMessage}
        />
        <div style={{ height: '100%' }}>
          <div className="char-counter">{charactersRemaining}</div>
          <button
            disabled={!userMessage.length || isChatbotThinking}
            type="submit"
            id="submitButton"
            style={{ opacity: !userMessage.length || isChatbotThinking ? 0.4 : 1 }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white dark:text-black">
              <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
