import React from 'react';
import './Modal.css';
import { convertToGrade, addLineBreaks } from '../../utils.js';

export default function Modal({ setIsModalOpen, commentary, JSONscoreArr }) {
  const getScoreColorClass = (score) => {
    if (score >= 0 && score < 79) {
      return 'red';
    } else if (score >= 79 && score <= 89) {
      return 'yellow';
    } else {
      return 'green';
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className='LeftScore'>
            <h2 className='scores'>Scores</h2>
            <div style={{marginTop: "5%"}} className='flexNew'>
                <h4 className='tooltip'>Impact<span class="tooltip-text">Essay focuses on impact of individual on community/self through the unique experience/perspective of writer</span></h4>
                <div className={getScoreColorClass(JSONscoreArr[0])}>
                    <div className='innerCircle'>
                        <p>{JSONscoreArr[0]}</p>
                    </div>
                </div>
            </div>
            <div className='flexNew'>
                <h4 className='tooltip'>Self<span className="tooltip-text">Essay is written in first person point of view (uses "I" and "my" words etc.)</span></h4>
                <div className={getScoreColorClass(JSONscoreArr[1])}>
                    <div className='innerCircle'>
                        <p>{JSONscoreArr[1]}</p>
                    </div>
                </div>
            </div>
            <div className='flexNew'>
                <h4 className='tooltip'>Examples<span class="tooltip-text">Provides MANY specific/tangible examples that focus on decision, action and impact of writer</span></h4>
                <div className={getScoreColorClass(JSONscoreArr[2])}>
                    <div className='innerCircle'>
                        <p>{JSONscoreArr[2]}</p>
                    </div>
                </div>
            </div>
            <div className='flexNew'>
                <h4 className='tooltip'>Prompt<span class="tooltip-text">Effectively and directly answers prompt without use of figurative language, creative writing, similes or metaphors</span></h4>
                <div className={getScoreColorClass(JSONscoreArr[3])}>
                    <div className='innerCircle'>
                        <p>{JSONscoreArr[3]}</p>
                    </div>
                </div>
            </div>
            <div className='flexNew'>
                <h4 className='tooltip'>Grammar<span class="tooltip-text">Writing Quality, grammar and punctuation</span></h4>
                <div className={getScoreColorClass(JSONscoreArr[4])}>
                    <div className='innerCircle'>
                        <p>{JSONscoreArr[4]}</p>
                    </div>
                </div>
            </div>
            <h4 className='grade'>Grade: <span>{convertToGrade(JSONscoreArr[5])}</span></h4>

          </div>
          <div className='RightScore'>
            <h2 className='commentary'>Commentary</h2>
            <p className='content'>{addLineBreaks(commentary)}</p>
          </div>
        </div>
      </div>
    </>
  );
}
