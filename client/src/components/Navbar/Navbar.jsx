import './Navbar.css';
import { useGoogleLogin } from '@react-oauth/google';

export default function () {

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo' , {
                    headers : {
                        Authorization : `Bearer ${response.access_token}`,
                    },
                });
                if (res.ok) {
                    const userData = await res.json();
                    console.log('User Information:', userData);
                } else {
                    console.error('Error fetching user information:', res.status, res.statusText);
                }
            } catch (error) {
                console.error(error);
            }
        }
    })

    return (
        <>
            <div className='navbar'>
                <button id="signIn" onClick={() => login()}>SIGN IN</button>;
            </div>
        </>
    );
}