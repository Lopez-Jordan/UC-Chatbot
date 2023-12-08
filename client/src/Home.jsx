import './Home.css';
import Chatbot from './Chatbot/Chatbot.jsx';
import Reviewer from './Reviewer/Reviewer.jsx'

export default function Home() {

  
  return (
    <>
      <section className="page1">
        <div className="half1">
          <div className="content1">
            <h2 id='message'>ask anything to a...</h2>
            <h1 id='mainHeading'>UC Admission Officer</h1>
            <h2 id="chatHeader">(ai chatbot)</h2>
          </div>
          <div style={{height: '200px'}}></div>
        </div>
        <div className="half2">
            <Chatbot />
          <p className='powered'>*powered by Chat GPT 3.5-turbo-1106*</p>
        </div>
      </section>

      <Reviewer />

    </>
  )
}
