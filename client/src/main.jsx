import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import Home from './pages/Home/Home.jsx';
import App from './App.jsx'
import Success from "./pages/success/Success.jsx";
import Purchase from './pages/Purchase/Purchase.jsx'
import Terms from './pages/Terms/Terms.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/purchase',
        element: <Purchase />
      },
      {
        path: '/successfulPurchase/:credits/4235632',
        element: <Success />
      }, 
      {
        path: '/terms',
        element: <Terms />
      }, 
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <GoogleOAuthProvider clientId="749377791474-b9gm636883982rqjpq1lfv80gi6ql2h7.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </>
)