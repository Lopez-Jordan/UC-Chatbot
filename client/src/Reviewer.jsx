import './Reviewer.css';
import { useEffect, useState } from 'react';

export default function Reviewer (){

    const [inputEssay, setInputEssay] = useState("");
    const [prompt, setPrompt] = useState("");
    const [JSONreview, setJSONreview] = useState({});

    const handleFormSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>  
            <div className='second'>
                <h2>Get a custom, Personal Insight Question review</h2>
                <p>with our technical algorithm that provides University of California specific feedback on your draft!</p>
                <form onSubmit={handleFormSubmit}>
                    <input id="inputEssay" ></input>
                    <button type='submit'>submit</button>
                </form>
            </div>
        </>
    );
}
