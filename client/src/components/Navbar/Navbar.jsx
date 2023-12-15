import './Navbar.css';
import { LogInContext } from '../../App';
import { useGoogleLogin } from '@react-oauth/google';
import { useContext, useState, useRef } from 'react';

export default function () {
  const [userLoggedIn, setUserLoggedIn] = useContext(LogInContext);
  const [isPopupVisible, setPopupVisible] = useState(false);

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
      name: '',
      pic: '',
      credit: 0
    });
    setPopupVisible(false);
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const renderProfilePopup = () => {
    if (isPopupVisible) {
      return (
        <div className="profile-popup">
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      );
    }
    return null;
  };
    return (
        <>
            <div className="navbar">
                {userLoggedIn.loggedIn ? (
                    <div className="profile" onClick={togglePopup}>
                        <img id="profileImage" src={userLoggedIn.pic} alt="" />
                        <div className="infoContainer">
                            <p className="smallText">signed in as</p>
                            <h4>{userLoggedIn.name}</h4>
                        </div>
                        {renderProfilePopup()}
                    </div>
                ) : (
                    <button className="signIn" onClick={() => login()}>
                        SIGN IN
                    </button>
                )}
            </div>
        </>
    );
}