import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import { createContext, useState, useEffect } from 'react';

export const LogInContext = createContext();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('loggedIn');
    if (storedLoginStatus) {
      setLoggedIn(storedLoginStatus === 'true');
    } else {
      setLoggedIn(storedLoginStatus === 'false');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('loggedIn', loggedIn);
  }, [loggedIn]);

  return (
    <>
      <LogInContext.Provider value={[loggedIn, setLoggedIn]}>
        <Navbar />
        <Outlet />
      </LogInContext.Provider>
    </>
  );
}