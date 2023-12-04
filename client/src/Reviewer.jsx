import React, { useState } from 'react';
import './Reviewer.css';
import { ObjToArr, formatNicely } from '../utils.js';

export default function Reviewer() {

  const [inputEssay, setInputEssay] = useState("");
  const [prompt, setPrompt] = useState("");
  const [JSONscoreArr, setJSONscoreArr] = useState([]);
  const [commentary, setCommentary] = useState("");
  const [displayResults, setDisplayResults] = useState(false);
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const JSONscoreContainer = await fetch('/api/JSONscore', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({essayPrompt: prompt, inputEssay: inputEssay})
    });
    let JSONpromise = await JSONscoreContainer.json();  
    let fullJSONscore = await JSON.parse(JSONpromise.message);

    await setJSONscoreArr(ObjToArr(JSON.parse(JSONpromise.message)));
    
    console.log(fullJSONscore);
    // 1: Make a fetch 'POST' to the /api/JSONscore (essayPrompt, inputEssay) and get the returned JSON object
    // 2: Use score JSON object to display scores in a visually appealing way
    // 3: Make a fetch 'POST' to /api/JSON/review (essayPrompt, inputEssay, JSONscore)
    // 4: Show the results

    const commentaryContainer = await fetch('/api/commentary', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({essayPrompt: prompt, inputEssay: inputEssay, JSONscore: fullJSONscore})
    })
    let commentaryResponse = await commentaryContainer.text();
    setCommentary(formatNicely(commentaryResponse));
    
    setDisplayResults(true);
    setInputEssay("");
    setPrompt(""); // Reset the prompt after submission
  };

  return (
    <div >
      <div >
        <h2>Perfect your application essays</h2>
        <p>Gain personalized metrics and insights into how YOUR essay is evaluated in the eyes of a UC Admission Officer</p>
        <form  onSubmit={handleFormSubmit}>
          <label htmlFor="prompt">Select a prompt:</label>
          <select
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
          >
            <option value="1">1. Describe an example of your leadership experience in which you have positively influenced others, helped resolve disputes or contributed to group efforts over time.</option>
            <option value="2">2. Every person has a creative side, and it can be expressed in many ways: problem solving, original and innovative thinking, and artistically, to name a few. Describe how you express your creative side.</option>
            <option value="3">3. What would you say is your greatest talent or skill? How have you developed and demonstrated that talent over time?</option>
            <option value="4">4. Describe how you have taken advantage of a significant educational opportunity or worked to overcome an educational barrier you have faced.</option>
            <option value="5">5. Describe the most significant challenge you have faced and the steps you have taken to overcome this challenge. How has this challenge affected your academic achievement? </option>
            <option value="6">6. Think about an academic subject that inspires you. Describe how you have furthered this interest inside and/or outside of the classroom. </option>
            <option value="7">7. What have you done to make your school or your community a better place?</option>
            <option value="8">8. Beyond what has already been shared in your application, what do you believe makes you a strong candidate for admissions to the University of California?</option>
            </select>
          <textarea
            onChange={(e) => setInputEssay(e.target.value)}
            value={inputEssay}
            placeholder="Paste your essay here (max 350 words)"
          ></textarea>
          <button type='submit'>Submit</button>
        </form>
        {displayResults &&
          <>
            <h4>Impact: {JSONscoreArr[0]}</h4>
            <h4>Self: {JSONscoreArr[1]}</h4>
            <h4>Examples: {JSONscoreArr[2]}</h4>
            <h4>Prompt: {JSONscoreArr[3]}</h4>
            <h4>Grammar: {JSONscoreArr[4]}</h4>
            {commentary}
          </>
        }
      </div>
    </div>
  );
}
