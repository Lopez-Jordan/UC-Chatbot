import './Purchase.css';
import { FaExclamationCircle, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


export default function Purchase() {

  const navigate = useNavigate();


    return (
        <>
            <div className='mainPurchase'>
                <h1 className='buyCredits'>Buy Credits!</h1>
                <p className='quote'>
                    <FaQuoteLeft className='quoteIcon'/>
                    If you're not willing to risk the usual, you will have to settle for the ordinary<FaQuoteRight className='quoteIcon' />   <span className='aut'>- Jim Rohn</span>
                </p>
                <div className='cards'>
                    <div id="card1">
                        <h4 className='title'>Basic</h4>
                        <h2 className='money'>$5</h2>
                        <p className='buyPara'>Have each of your PIQ essays reviewed and graded atleast once</p>
                        <button className='buyButton'>Buy 4 Credits</button>
                    </div>
                    <div id="card2">
                        <h4 className='title'>Professional</h4>
                        <h2 className='money'>$10</h2>
                        <p className='buyPara'>Have each of your 4 essays reviewed and graded multiple times</p>
                        <button className='buyButton'>Buy 12 Credits</button>
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