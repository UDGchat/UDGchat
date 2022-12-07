import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Main = () => {
    const [userData, setUserData] = useState({})

    useEffect( () => {
        axios({
            method: 'get',
            url: "http://localhost:5000/user",
            withCredentials: true
        } )
        .then(response => {
            if( !response.data.auth )
                window.location.href = '/login'
            else
                setUserData( response.data.user )
        })
        .catch((e) => {})
    }, []);

    return ( 
        <>
            Bienvenido a UDGchat.com, {userData.username}
        </>
     );
}
 
export default Main;