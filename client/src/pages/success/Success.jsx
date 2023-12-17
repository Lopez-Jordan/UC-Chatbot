import './Success.css';
import { useContext, useState } from 'react';
import { LogInContext } from '../../App.jsx';
import { useParams } from 'react-router-dom';



export default function Success () {

    const { credits } = useParams();

  const [userLoggedIn, setUserLoggedIn] = useContext(LogInContext);


    
    return (
        <>
            <section className='successMain'>
                <h1>Success Page {credits}</h1>
            </section>
        </>
    );
}