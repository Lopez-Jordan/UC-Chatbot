import './SingleReview.css';

export default function SingleReview({ name, userName, image, comment }) {
    return (
        <>
            <div className='cardReview'>
                <div style={{padding: '20px'}}>
                    <div className='userContent'>
                        <img className='userImage' src={image} alt="user reviews for our product" />
                        <div style={{display: 'flex', flexDirection: "column", marginLeft : '10px'}}>
                            <h3 className='reviewName'>{name}</h3>
                            <h3 className='reviewUserName'>{userName}</h3>
                        </div>
                    </div>
                    <p className='reviewStars'>⭐⭐⭐⭐⭐</p>
                    <p className='reviewPara'>{comment}</p>
                </div>
            </div>
        </>
    );
}