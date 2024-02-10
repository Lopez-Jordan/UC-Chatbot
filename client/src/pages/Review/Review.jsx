import './Review.css';
import SingleReview from '../../components/SingleReview/SingleReview.jsx';

export default function Review () {
    return (
        <>
            <div className='mainReview'>
                <h1 id='checkOut'>Check out what our students are saying!</h1>
                <div className='cardContainer'>
                    <SingleReview name="Jordan Lopez" userName="@JORDANL123" image="/JordanPicTwo.png" comment="I love it! I found out that UC admission officers are looking for very specific criteria that I completely missed." />
                    <SingleReview name="Ryan Frederich" userName="@RYANFREDER" image="/JordanPic.png" comment="Great price, the commentary it provides gave me a great sense on the quality of my essays" />
                    <SingleReview name="Michelle Grewer" userName="@X_ANON" image="/Person.png" comment="Super easy to use and conveniant--it told me what was already good and what needed to be fixed." />
                    <SingleReview name="Justin Choi" userName="@JCHOI_5" image="/JPic.png" comment="Much better than paying a professional who doesn't even know what UC admission officers are looking for! " />
                    <SingleReview name="Chloe Meg" userName="@CHLOE_H_MEG" image="/Rose.png" comment="I never realized that UC application essays needed to sound so different than essays I write in school." />
                    <SingleReview name="Neil Bisht" userName="@NEILBST" image="/Surf.png" comment="Definitely recommend for anyone who wants quick and specific feedback" />
                </div>
            </div>
        </>
    );
}