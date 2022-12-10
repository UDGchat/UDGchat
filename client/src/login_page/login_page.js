import { useEffect } from 'react';
import axios from 'axios';

import GoogleButton from "./googleButton";

const Login = () => {

    useEffect( () => {
        axios.get( 'http://localhost:5000/user', {
            withCredentials: true
        } )
        .then(response => {
            console.log(response.data)
            if( response.data.auth )
                window.location.href = '/home'
        })
    }, []);

    return ( 
        <>
            <GoogleButton />
        </>
     );
}
 
export default Login;