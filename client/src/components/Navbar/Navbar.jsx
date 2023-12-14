import './Navbar.css';
import { LogInContext } from "../../App";
import { useGoogleLogin } from '@react-oauth/google';
import { useState, useContext } from 'react';

export default function () {

    const [userLoggedIn, setUserLoggedIn] = useContext(LogInContext);

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo' , {
                    headers : {
                        Authorization : `Bearer ${response.access_token}`,
                    },
                });
                if (res.ok) {
                    const resUserData = await res.json();

                    setUserLoggedIn({
                        loggedIn: true,
                        name: `${resUserData.name}`,
                        pic: `${resUserData.picture}`
                    })


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
    })

    const handleSignOut = () => {
        setUserLoggedIn({
            loggedIn: false,
            name: "",
            pic: ""
        })
    }

    return (
        <>
            <div className='navbar'>
                {(userLoggedIn.loggedIn) ? ( // Change here
                    <>
                        <div onClick={handleSignOut} className='profile'>
                            <img id="profileImage" src={userLoggedIn.pic} alt="" />
                            <div className='infoContainer'>
                                <p className='smallText'>signed in as</p>
                                <h4>{userLoggedIn.name}</h4>
                            </div>
                        </div>
                    </>
                ) : (
                    <button className="signIn" onClick={() => login()}>SIGN IN</button>
                )}
            </div>

        </>
    );
}