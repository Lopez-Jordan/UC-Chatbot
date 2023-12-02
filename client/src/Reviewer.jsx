import './Reviewer.css';

export default function Reviewer (){

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
    }

    return (
        <>  
            <div className='second'>
                <h2>Get a custom, Personal Insight Question review</h2>
                <p>with our technical algorithm that provides University of California specific feedback on your draft!</p>
                <form onSubmit={handleFormSubmit}>
                    <textarea name="" id="inputEssay" ></textarea>
                    <button type='submit'>submit</button>
                </form>
            </div>
        </>
    );
}
