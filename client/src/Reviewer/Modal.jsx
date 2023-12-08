import './Modal.css';
import { convertToGrade } from '../../utils.js';

export default function Modal({ setIsModalOpen, commentary, JSONscoreArr }) {

    return (
        <>
            <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className='LeftScore'>
                        <h2 className='scores'>Scores</h2>
                        <h4>Impact: {JSONscoreArr[0]}</h4>
                        <h4>Self: {JSONscoreArr[1]}</h4>
                        <h4>Examples: {JSONscoreArr[2]}</h4>
                        <h4>Prompt: {JSONscoreArr[3]}</h4>
                        <h4>Grammar: {JSONscoreArr[4]}</h4>
                        <h4>Grade: {convertToGrade(JSONscoreArr[5])}</h4>
                    </div>
                    <div className='RightScore'>
                        <h2 className='commentary'>Commentary</h2>
                        <p>{commentary}</p>
                    </div>


                </div>
            </div>
        </>
    );
}
