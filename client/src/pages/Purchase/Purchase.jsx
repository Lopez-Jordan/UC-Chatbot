import './Purchase.css';
import { FaExclamationTriangle } from "react-icons/fa";

export default function Purchase() {

    return (
        <>
            <div className='mainPurchase'>
                <h1 className='buyCredits'>Buy Credits!</h1>
                <p className='quote'>
                    "Investing in yourself is the best investment you will ever make.
                    It will not only improve your life, it will improve the life of all those around you"    - Jim Rohn
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
                    <FaExclamationTriangle id="dangerCircle"/>
                    We do not issue refunds at this time
                </div>
            </div>
        </>
    );
}