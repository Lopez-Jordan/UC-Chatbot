import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import { useState, createContext, useEffect } from 'react';

export const LogInContext = createContext();

export default function App() {

  const [userLoggedIn, setUserLoggedIn] = useState({
    loggedIn: false,
    name: "",
    pic: ""
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('UserLoggedIn'));
    if (storedUser && storedUser.loggedIn) {
      setUserLoggedIn(storedUser);
    } else {
      setUserLoggedIn({
        loggedIn: false,
        name: "",
        pic: ""
      });
    }
  }, []);
  
  
  
  useEffect(() => {
    localStorage.setItem('UserLoggedIn', JSON.stringify(userLoggedIn));
  }, [userLoggedIn]);
  
  

  return (
    <>
      <LogInContext.Provider value={[userLoggedIn, setUserLoggedIn]}>
        <Navbar />
        <Outlet />
      </LogInContext.Provider>
    </>
  );
}