import './Review.css';
import SingleReview from '../../components/SingleReview/SingleReview.jsx';

export default function Review () {
    return (
        <>
            <div className='mainReview'>
                <h1 id='checkOut'>Check out what our students are saying!</h1>
                <div className='cardContainer'>
                    <SingleReview name="Jordan Lopez" userName="@JORDANL123" image="/JordanPicTwo.png" comment="I love it! I found out that UC admission officers are looking for very specific criteria that I completely missed." />
                    <SingleReview name="Ryan Frederich" userName="@RYANFREDER" image="/JordanPic.png" comment="Wayyy cheaper than other sites AND it only took a few seconds to grade--I'm definitely going to use it for all my UC essays" />
                    <SingleReview name="Michelle Grewer" userName="@X_ANON" image="/Person.png" comment="The user interface is super easy to use, I really like how it showed me which categories I need to improve upon." />
                    <SingleReview name="Justin Choi" userName="@JCHOI_5" image="/JPic.png" comment="I thought my essays were great until it graded them a C. Atleast I know now what I need to work on." />
                    <SingleReview name="Chloe Meg" userName="@CHLOE_H_MEG" image="/Rose.png" comment="Best app ever!!! It told me what to keep and what to change. Now my essays are in the A range 😎" />
                    <SingleReview name="Neil Bisht" userName="@NEILBST" image="/Surf.png" comment="Cool idea. I couldn't find any other sites that had UC essay grading like this one. And it's cheap." />
                </div>
            </div>
        </>
    );
}