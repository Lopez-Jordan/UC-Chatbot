import './Success.css';
import { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LogInContext } from '../../App.jsx';

export default function Success() {
  const { credits } = useParams();
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useContext(LogInContext);

  const handleHome = async () => {
    try {
      const addedVals = (credits === '345924567890' ? 4 : 12);

      const bodyPayload = JSON.stringify({
        email: userLoggedIn.email,
        credits: addedVals,
      });

      const updateUserCredits = await fetch('/api/addCredits', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: bodyPayload,
      });

      if (updateUserCredits.ok) {
        localStorage.setItem('UserLoggedIn', JSON.stringify(userLoggedIn));
        const addedValsNew = (credits === '345924567890' ? 4 : 12) + userLoggedIn.credits;

        setUserLoggedIn({
          loggedIn: userLoggedIn.loggedIn,
          name: userLoggedIn.name,
          pic: userLoggedIn.pic,
          email: userLoggedIn.email,
          credits: addedValsNew,
        });

        // Use replace instead of navigate
        navigate('/', { replace: true });
      } else {
        alert("Something went wrong updating the user credits on the server ://");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('UserLoggedIn'));
    if (storedUser && storedUser.loggedIn) {
      setUserLoggedIn(storedUser);
    } else {
      setUserLoggedIn({
        loggedIn: false,
        name: '',
        pic: '',
        email: '',
        credits: 0,
      });
    }
  }, []);

  return (
    <>
      <section className="successMain">
        <p className='emojis'>
          <p>🥳</p>
          <p>🎉</p>
          <p>🥂</p>
        </p>
        <h1>Thank You!</h1>
        <p className='thankYouPara'>Your support allows me to build the technology that helps ambitious students like you pursue their educational dreams. If you like this product, please tell your friends or write me an <a style={{color: "white", borderBottom: '1.25px solid yellow', textDecoration: 'none'}} href="mailto:jordanlopezemail@gmail.com">email</a> telling me how much you love it!</p>

        <button onClick={handleHome}>Activate {credits === '345924567890' ? 4 : 12} Credits</button>
      </section>
    </>
  );
}
