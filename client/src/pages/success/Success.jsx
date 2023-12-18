import './Success.css';
import {  useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LogInContext } from '../../App.jsx';



export default function Success () { 

  const { credits } = useParams();
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useContext(LogInContext);


  const handleHome = async () => {
    try {

      const addedVals = (credits === '345924567890' ? 4 : 12) + userLoggedIn.credits;
      
      const bodyPayload = JSON.stringify({
        email: userLoggedIn.email,
        credits: addedVals
      })

      const updateUserCredits = await fetch('/api/addCredits', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: bodyPayload
      })

      if (updateUserCredits.ok){
        alert("successful update");
        localStorage.setItem('UserLoggedIn', JSON.stringify(userLoggedIn));

        const addedValsNew = (credits === '345924567890' ? 4 : 12) + userLoggedIn.credits;

        setUserLoggedIn({
          loggedIn: userLoggedIn.loggedIn,
          name: userLoggedIn.name,
          pic: userLoggedIn.pic,
          email: userLoggedIn.email,
          credits: addedValsNew
        });
        navigate('/');
      } else {
        alert("something went wrong updating the user credits on the server ://")
      }




    } catch (error) {
      console.error(error.message);
    }
  }


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('UserLoggedIn'));
    if (storedUser && storedUser.loggedIn) {
      setUserLoggedIn(storedUser);
    } else {
      setUserLoggedIn({
        loggedIn: false,
        name: "",
        pic: "",
        email: "",
        credits: 0
      });
    }
    console.log(storedUser);
    console.log(userLoggedIn);
  
  },[])

  return (
    <>
      <section className="successMain">
        <p>Success!</p>
        <h2> {credits === '345924567890' ? 4 : 12} credits have been added to your account!</h2>
        <button onClick={handleHome}>Go Home</button>
      </section>
    </>
  );
}
