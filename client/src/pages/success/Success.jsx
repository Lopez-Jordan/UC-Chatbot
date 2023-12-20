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
        <p className='thankYouPara'>
          I'm a young developer who built this technology to help ambitious students like yourself pursue their educational dreams. By using my product, you now have a huge edge over other applicants -- something I wish existed when I applied back in 2019.
        </p>

        <button onClick={handleHome}>Activate {credits === '345924567890' ? 4 : 12} Credits</button>
      </section>
    </>
  );
}
