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
      body: JSON.stringify({ essayPrompt: prompt, inputEssay: inputEssay })
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
      body: JSON.stringify({ essayPrompt: prompt, inputEssay: inputEssay, JSONscore: fullJSONscore })
    })
    let commentaryResponse = await commentaryContainer.text();
    setCommentary(formatNicely(commentaryResponse));

    setDisplayResults(true);
    setInputEssay("");
    setPrompt(""); // Reset the prompt after submission
  };

  return (
    <div className='main2'>
      <div className='halfLeft'>
        <div className='formContainer'>
          <form className='reviewForm' onSubmit={handleFormSubmit}>
            <div className='numContainer'><span className='numSpan'>1</span>
              <h3>Select your prompt</h3>
            </div>
            <div style={{display: "Flex", justifyContent: "center"}}>
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
            <div className='numContainer'><span className='numSpan'>2</span>
              <h3>Copy and paste your essay</h3>
            </div>
            <div style={{display: "Flex", justifyContent: "center"}}>
              <textarea
                id='essay'
                onChange={(e) => setInputEssay(e.target.value)}
                value={inputEssay}
                placeholder="Paste your essay here (max 350 words)"
              ></textarea>
            </div>
            <div className='numContainer'><span className='numSpan'>3</span>
              <h3>Get Customized Results</h3>
            </div>
            <div style={{display: "Flex", justifyContent: "center"}}>
              <button id="getFeedback" type='submit'>Go!</button>
            </div>
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
      <div className='halfRight'>
        <div className='rightContent'>
          <h1>Perfect your UC essays</h1>
          <h3 className='metrics'>Gain personalized metrics and insights into how YOUR essay is evaluated through the eyes of a UC Admission Officer</h3>
          <div style={{display: "Flex", justifyContent: "center"}}>
           <div className='break'></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>blah</p>
            <p>blah</p>
            <p>blah</p>
          </div>
        </div>
      </div>
    </div>
  );
}
