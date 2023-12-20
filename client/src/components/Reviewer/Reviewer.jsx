import React, { useState, useContext } from 'react';
import './Reviewer.css';
import { ObjToArr } from '../../../utils.js';
import Modal from './Modal.jsx';
import { FaCheck } from "react-icons/fa";
import { LogInContext } from '../../App.jsx';
import { useNavigate } from 'react-router-dom';

export default function Reviewer() {

  const [userLoggedIn, setUserLoggedIn] = useContext(LogInContext);
  const [inputEssay, setInputEssay] = useState("");
  const [prompt, setPrompt] = useState("");
  const [JSONscoreArr, setJSONscoreArr] = useState([]);
  const [commentary, setCommentary] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!userLoggedIn.loggedIn) {
      alert('sorry you must be logged in to use this feature :/')
      return;
    }

    if (userLoggedIn.credits < 1) {
      alert('sorry you dont have enough credits :/');
      navigate('/purchase');
    } else {
      if (confirm("Are you sure you want to spend 1 credit?")) {
        const subtractCredits = await fetch('/api/addCredits', {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: userLoggedIn.email, credits: -1 })
        });
        if (subtractCredits.ok) {
          setUserLoggedIn({
            loggedIn: true,
            name: userLoggedIn.name,
            pic: userLoggedIn.pic,
            email: userLoggedIn.email,
            credits: userLoggedIn.credits - 1
          });
        } else {
          alert('something went wrong subtracting credits');
        }
      } else {
        return;
      }
    }

    setLoading(true);

    const JSONscoreContainer = await fetch('/api/JSONscore', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ essayPrompt: prompt, inputEssay: inputEssay })
    });
    let JSONpromise = await JSONscoreContainer.json();
    let fullJSONscore = await JSON.parse(JSONpromise.message);

    await setJSONscoreArr(ObjToArr(JSON.parse(JSONpromise.message)));

    console.log(fullJSONscore);

    const commentaryContainer = await fetch('/api/commentary', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ essayPrompt: prompt, inputEssay: inputEssay, JSONscore: fullJSONscore })
    })
    let commentaryResponse = await commentaryContainer.text();
    setCommentary(commentaryResponse);

    setIsModalOpen(true);
    setLoading(false);
    setInputEssay("");
    setPrompt("");
  };

  return (
    <div className='main2'>
      <div className='topHalf'>
        <h1 id='perfect'>Enhance Your UC Essays</h1>
        <p className='metrics'>Gain personalized metrics and insights into how YOUR essay is evaluated through the <span style={{ fontSize: '24px' }}>👀</span> of UC Admission Officers</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
        </div>
      </div>
      <div className='bottomHalf'>
        <form name='reviewForm' className='reviewForm' onSubmit={handleFormSubmit}>
          <h3>1. Select your prompt</h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <select
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
            >
              <option value="1">Describe an example of your leadership experience in which you have positively influenced others, helped resolve disputes or contributed to group efforts over time.</option>
              <option value="2">Every person has a creative side, and it can be expressed in many ways: problem solving, original and innovative thinking, and artistically, to name a few. Describe how you express your creative side.</option>
              <option value="3">What would you say is your greatest talent or skill? How have you developed and demonstrated that talent over time?</option>
              <option value="4">Describe how you have taken advantage of a significant educational opportunity or worked to overcome an educational barrier you have faced.</option>
              <option value="5">Describe the most significant challenge you have faced and the steps you have taken to overcome this challenge. How has this challenge affected your academic achievement? </option>
              <option value="6">Think about an academic subject that inspires you. Describe how you have furthered this interest inside and/or outside of the classroom. </option>
              <option value="7">What have you done to make your school or your community a better place?</option>
              <option value="8">Beyond what has already been shared in your application, what do you believe makes you a strong candidate for admissions to the University of California?</option>
            </select>
          </div>
          <h3>2. Paste your essay</h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <textarea
              id='essay'
              onChange={(e) => setInputEssay(e.target.value)}
              value={inputEssay}
              placeholder="Paste your essay here (max 350 words)"
            ></textarea>
          </div>
          <h3>3. Recieve custom feedback</h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {(loading && (commentary.length == 0)) ? (
              <div className="loading-spinner"></div>
            ) : (
              <button disabled={!inputEssay.length || loading} style={{ opacity: !inputEssay.length || loading ? 0.5 : 1 }} id="getFeedback" type='submit'>Submit</button>
            )}
          </div>
        </form>
        {(isModalOpen) &&
          <Modal setIsModalOpen={setIsModalOpen} setCommentary={setCommentary} commentary={commentary} JSONscoreArr={JSONscoreArr} />
        }
        <div className='reasons'>
          <div style={{ marginTop: "10%" }} className='reasonsCheck'>
            <p className='check'>🎯</p>
            <p className='checkPara'>Scored on range of criteria that is <span className='bold'>specific to UC's</span></p>
          </div>
          <div className='reasonsCheck'>
            <p className='check'>🔍</p>
            <p className='checkPara'>Find out what UC admission officers <span className='bold'>are and aren't looking for</span></p>
          </div>
          <div className='reasonsCheck'>
            <p className='check'>📈</p>
            <p className='checkPara'><span className='bold'>Meaningful suggestions</span> on what to improve based on our admission insights</p>
          </div>
        </div>
      </div>
      <section className='footer'>
        <a className='footerButton' style={{color: "white", borderBottom: '1px solid white', textDecoration: 'none', padding: "none"}} href="mailto:univcaliforniaai@gmail.com">UnivCaliforniaAI@gmail.com</a>
        <button className='footerButton' onClick={() => navigate('/terms')}>Terms and Conditions</button>
        <button className='footerButton' onClick={() => navigate('/privacy')}>Privacy Policy</button>


      </section>
    </div>
  );
}
