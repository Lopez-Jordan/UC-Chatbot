import { useState, useEffect } from 'react';
import {getResponse} from './chatbot/LLM.jsx';
import './Chatbot.css';

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [fullChat, setFullChat] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await getResponse(message);
      setResponse(result);
      setFullChat(prevFullChat => [
        ...prevFullChat,
        { role: 'user', content: message },
        { role: 'chatbot', content: result },
      ]);
      setResponse("");
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // gather things from local storage
    // load the 5 array items into the chatbot window
  }, [])

    return (
        <div className='main'>
            <div id='chats'>
                {fullChat.map((chat, index) => (
                    <div key={index} className={`message ${chat.role}`}>
                        {chat.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="input-container">
                <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Message here'
                    id="inputText"
                    value={message}
                />
                <button
                    disabled={!message.length}
                    type="submit"
                    id="submitButton"
                    style={{ opacity: !message.length ? 0.4 : 1 }} // Set opacity based on message length
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white dark:text-black">
                        <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </button>
            </form>
              
        </div>
    );
}
