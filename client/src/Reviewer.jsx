import React, { useState } from 'react';
import './Reviewer.css';
import { ObjToArr } from '../utils.js';



export default function Reviewer() {
  const [inputEssay, setInputEssay] = useState("");
  const [prompt, setPrompt] = useState("");
  const [JSONscore, setJSONscore] = useState([]);
  const [displayResults, setDisplayResults] = useState(false);
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(`Selected Prompt: ${prompt}\nEssay: ${inputEssay}`);
    const JSONscoreContainer = await fetch('/api/JSONscore', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({essayPrompt: prompt, inputEssay: inputEssay})
    });
    let JSONpromise = await JSONscoreContainer.json();  

    setJSONscore(ObjToArr(JSON.parse(JSONpromise.message)));
    
    setDisplayResults(true);
    
    // 1: Make a fetch 'POST' to the /api/JSONscore (essayPrompt, inputEssay) and get the returned JSON object
    // 2: Use score JSON object to display scores in a visually appealing way
    // 3: Make a fetch 'POST' to /api/JSON/review (essayPrompt, inputEssay, JSONscore)
    // 4: Show the results

    setInputEssay("");
    setPrompt(""); // Reset the prompt after submission
  };

  return (
    <div className='reviewer-container'>
      <div className='reviewer-content'>
        <h2>Get a Custom, Personal Insight Question Review</h2>
        <p>with our technical algorithm that provides University of California specific feedback on your draft!</p>
        <form id="reviewForm" onSubmit={handleFormSubmit}>
          <label htmlFor="prompt">Select a prompt:</label>
          <select
            id="prompt"
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
          >
            <option value="">1. Describe an example of your leadership experience in which you have positively influenced others, helped resolve disputes or contributed to group efforts over time.</option>
            <option value="1">2. Every person has a creative side, and it can be expressed in many ways: problem solving, original and innovative thinking, and artistically, to name a few. Describe how you express your creative side.</option>
            <option value="2">3. What would you say is your greatest talent or skill? How have you developed and demonstrated that talent over time?</option>
            <option value="3">4. Describe how you have taken advantage of a significant educational opportunity or worked to overcome an educational barrier you have faced.</option>
            <option value="4">5. Describe the most significant challenge you have faced and the steps you have taken to overcome this challenge. How has this challenge affected your academic achievement? </option>
            <option value="5">6. Think about an academic subject that inspires you. Describe how you have furthered this interest inside and/or outside of the classroom. </option>
            <option value="6">7. What have you done to make your school or your community a better place?</option>
            <option value="7">8. Beyond what has already been shared in your application, what do you believe makes you a strong candidate for admissions to the University of California?</option>
            </select>
          <textarea
            onChange={(e) => setInputEssay(e.target.value)}
            value={inputEssay}
            id="inputEssay"
            placeholder="Paste your essay here (max 350 words)"
          ></textarea>
          <button type='submit'>Submit</button>
        </form>
        {displayResults &&
          <>
            <h4>Impact is {JSONscore[0]}</h4>
            <h4>Self is {JSONscore[1]}</h4>
            <h4>Examples is {JSONscore[2]}</h4>
            <h4>Prompt is {JSONscore[3]}</h4>
            <h4>Grammar is {JSONscore[4]}</h4>
          </>
        }
      </div>
    </div>
  );
}
