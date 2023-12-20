import './Navbar.css';
import { LogInContext } from '../../App';
import { useGoogleLogin } from '@react-oauth/google';
import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

export default function Navbar() {

  const [userLoggedIn, setUserLoggedIn] = useContext(LogInContext);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const currPage = useLocation().pathname;
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });
        if (res.ok) {
          const resUserData = await res.json();

          const currUserRes = await fetch('/api/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              email: resUserData.email,
            })
          });

          const currUser = await currUserRes.json();

          if (currUser){
            setUserLoggedIn({
              loggedIn: true,
              name: `${resUserData.name}`,
              pic: `${resUserData.picture}`,
              email: `${resUserData.email}`,
              credits: currUser.credits
            });
          } else {
            alert(`can't find curr User ://`);
          }
          console.log('User Information:', resUserData);
        } else {
          console.error('Error fetching user information:', res.status, res.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  const handleSignOut = () => {
    setUserLoggedIn({
      loggedIn: false,
      name: "",
      pic: "",
      email: "",
      credits: 0
    });
    setPopupVisible(false);
    navigate('/');
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <>
      <div className="navbar">
        {userLoggedIn.loggedIn && currPage !== '/purchase' && currPage !== '/terms' && currPage !== '/successfulPurchase/345924567890' && currPage !== '/successfulPurchase/777648035211' ? (
          <div className='credits'>
            <p>
              <span id="number">{userLoggedIn.credits}</span>
              {userLoggedIn.credits === 1 ? ' credit' : ' credits'}
            </p>
            <button id='buyMore' onClick={() => navigate('/purchase')}>
              Buy More
            </button>
          </div>
        ) : (
          <>
            {(currPage === '/purchase' || currPage === '/terms')  && (
              <div id="goBack" onClick={() => navigate('/')}>
                <FaArrowLeft id="leftArrow" />
                <p>back</p>
              </div>
            )}
            <div></div>
          </>
        )}
        {(userLoggedIn.loggedIn && currPage !== '/successfulPurchase/345924567890' && currPage !== '/successfulPurchase/777648035211' )? (
          <div className="profile" onClick={togglePopup}>
            <img id="profileImage" src={userLoggedIn.pic} alt="" />
            <div className="infoContainer">
              <p className="smallText">signed in as</p>
              <h4>{userLoggedIn.name}</h4>
            </div>
            {isPopupVisible && (
              <div className="profile-popup">
                <button onClick={handleSignOut}>Sign Out</button>
              </div>
            )}
          </div>
        ) : (
          <>
          {(currPage === '/successfulPurchase/345924567890' || currPage === '/successfulPurchase/777648035211') ? (
            <div></div>
          ) : (
            <>
              <div></div>
              <button className="signIn" onClick={() => login()}>
                <img id="google" src='/google.png' alt="Google Logo"></img>
                Sign In
              </button>
            </>
          )}
          </>
        )}
      </div>
    </>
  );
}
