import { useState } from 'react';
import { getResponse } from './chatbot/LLM.jsx';
import './Chatbot.css';

const MAX_CHARACTERS = 200;

export default function Chatbot() {
  const [userMessage, setUserMessage] = useState("");
  const [fullChat, setFullChat] = useState([]);
  const [isChatbotThinking, setIsChatbotThinking] = useState(false);

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= MAX_CHARACTERS) {
      setUserMessage(inputText);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Display user's message immediately
    setFullChat([
      { role: 'user', content: userMessage },
      ...fullChat,
    ]);

    setIsChatbotThinking(true);

    try {
      const result = await getResponse(userMessage);

      // Replace the user's message with the chatbot's response
      setFullChat([
        { role: 'chatbot', content: result },
        { role: 'user', content: userMessage },
        ...fullChat,
      ]);

    } catch (error) {
      console.error(error);
    }

    setIsChatbotThinking(false);
    setUserMessage("");
  };

  const charactersRemaining = MAX_CHARACTERS - userMessage.length;

  return (
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
        {fullChat.map((chat, index) => (
          <div key={index} className={`message ${chat.role}`}>
            {chat.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="input-container">
        <textarea
          onChange={handleInputChange}
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
