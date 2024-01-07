import './Purchase.css';
import { FaExclamationCircle, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { LogInContext } from '../../App.jsx';
import { Stripe1, Stripe2 } from '../../../utils.js';


export default function Purchase() {

  const navigate = useNavigate();

  const handleCheckout = async (e) => {
    if (e.target.value == 1){
        Stripe1();
    } else {
        Stripe2();
    }
  }

    return (
        <>
            <div className='mainPurchase'>
                <h1 className='buyCredits'>Buy Credits!</h1>
                <p className='quote'>
                    <FaQuoteLeft className='quoteIcon'/>
                    Investing in yourself is the best investment you will ever make. It will not only improve your life, it will improve the lives of all those around you<FaQuoteRight className='quoteIcon' />   <span className='aut'>- Robin Sharma</span>
                </p>
                <div className='cards'>
                    <div id="card1">
                        <h4 className='title'>Basic</h4>
                        <h2 className='money'>🔮 $5 🔮</h2>
                        <p className='buyPara'>Have all 4 of your essays reviewed and graded atleast once so you know what to improve, keep, and polish.</p>
                        <button style={{marginTop: '10px'}} onClick={handleCheckout} value={1} className='buyButton'>Buy 4 Credits</button>
                    </div>
                    <div id="card2">
                        <h4 className='title'>Professional</h4>
                        <h2 className='money'>💎 $10 💎</h2>
                        <p className='buyPara'>Have all 4 of your essays reviewed and graded multiple times so you can sleep well at night knowing UC admission officers are reading amazing works of art.</p>
                        <button onClick={handleCheckout} value={2} className='buyButton'>Buy 12 Credits</button>
                    </div>
                </div>
                <div className='alert'>
                    <FaExclamationCircle id="dangerCircle"/>
                    We do not issue refunds at this time. Please review our <button onClick={() => navigate('/terms')}>Terms and Conditions</button> before buying credits.
                </div>
            </div>
        </>
    );
}