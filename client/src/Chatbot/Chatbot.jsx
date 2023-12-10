import { useState, useEffect } from 'react';
import './Chatbot.css';
import { formatConvHistory } from '../../utils.js';

const MAX_CHARACTERS = 200;     // CHHANGE

export default function Chatbot() {

  const [userMessage, setUserMessage] = useState("");
  const [fullChat, setFullChat] = useState([]);
  const [isChatbotThinking, setIsChatbotThinking] = useState(false);


  const handleInputChange = (e) => {
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

    let history = JSON.parse(localStorage.getItem("History")) || [];
    let temp = [...history];
    
    if (temp && temp.length < 5) {
      temp.push(userMessage);
      localStorage.setItem("History", JSON.stringify(temp));
    } else {
      temp.shift();
      temp.push(userMessage);
      localStorage.setItem("History", JSON.stringify(temp));
    }
    
    let currMessage = userMessage;
    setUserMessage("");

    setFullChat([
      { role: 'user', content: currMessage },
      ...fullChat,
    ]);
    setIsChatbotThinking(true);
    try {
      let result = await fetch(`/api/response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({message: currMessage, convHistory: formatConvHistory(history)})
      });
      if (result.ok) {
        let responseData = await result.json();
        setFullChat([
          { role: 'chatbot', content: responseData.message },
          { role: 'user', content: currMessage },
          ...fullChat,
        ]);

        let currHistory = JSON.parse(localStorage.getItem("History"));
        let tempBot = [...currHistory];
      
        tempBot.push(responseData.message);
        localStorage.setItem("History", JSON.stringify(tempBot));


      } else {
        alert('something went wrong :/');
      }
    } catch (error) {
      console.error(error);
    }
    setIsChatbotThinking(false);
  };

  const charactersRemaining = MAX_CHARACTERS - userMessage.length;


  return ( 
    <div className='main'>
      <div id='chats'>
        <img id='emblem' src='/seal-history-unofficial.jpg'></img>
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
            What can I help you with today?
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



// 1: get history from local storage (array of strings)
// 2: keep track of 6 most recent user inputs
// 2: everytime the user messages bot (add most recent one) to array
// 3: put array into a string right before message