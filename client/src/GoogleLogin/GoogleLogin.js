import React, {useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie"

function GoogleLogin() {
    //inicializa el modulo de Cookies importado
    const cookie = new Cookies()

    //crea un nuevo estado que guarda la cookie con las credenciales del usuario
    const [userCookie, getUserCookie] = useState(cookie.get('userCredentials'))

    //lo que pasa cuando el usuario ingresa con su cuenta de Google
    function handleCallbackResponse(response) {

        //descencripta la respuesta de Google, que contiene los datos del usuario, usando jwt_decode
        var userCredential = jwt_decode(response.credential);

        //guarda esas credenciales en la cookie userCredentials
        cookie.set('userCredentials', userCredential, { path:'/' })
        //y actualiza el estado userCookie con esa nueva cookie
        getUserCookie(cookie.get('userCredentials'))

        //esconde el botón de ingreso con Google
        document.getElementById("signInDiv").hidden = true;
    }

    //maneja el proceso de cerrar sesión
    function handleSignOut() {
        //cambia lo que contiene la constante 'user' de las credenciales del usuario a contener nada
        cookie.remove('userCredentials', { path:'/' })
        //elimina la cookie con las credenciales del usuario
        getUserCookie(cookie.get('userCredentials'))

        //hace que el botón de inicio de sesión sea visible de nuevo
        document.getElementById("signInDiv").hidden = false;
    }

    //lo que pasa cuando la página se carga por primera vez
    useEffect(() => {

        //checa sí la cookie con las credenciales está definida, sí no, muestra el botón de inicio de sesión
        userCookie === undefined && (document.getElementById("signInDiv").hidden = false)

        /* inicializa el proceso de registrarse con Google */
        /* global google */ // <-- este comentario le dice al programa que ignore cualquier instancia en la que google no este definido 
        google.accounts.id.initialize({

            //la id de cliente que Google nos otorgó (no debería de estar aquí, después la movemos)
            client_id: process.env.REACT_APP_GOOGLE_CLIENT, 

            //cuando el usuario se registra (callback) ejecuta esta funcion (handleCallbackResponse)
            callback: handleCallbackResponse
        });

        /* este es el botón de ingresar con Google */
        google.accounts.id.renderButton(

            //se guarda dentro del elemento HTML con el nombre 'signInDiv'
            document.getElementById("signInDiv"),

            //modifica el botón cómo si fuera CSS
            {theme: "outline", size: "large"}
        );

        /* es el recuadro que aparece la primera vez que cargas la página, que te muestra todas tus cuentas */
        //google.accounts.id.prompt();
    }, []);

    return ( 
        <>
            {/* Crea el elemento para el botón de Google */}
            <div id="signInDiv"></div>
            
            { 
                userCookie !== undefined &&
                <>
                    {/* Crea el botón para cerrar sesión y hace que, cuando lo presionen (onClick) ejecute 'handleSignOut', definido en la línea 22 */}
                    <button onClick={ (e) => handleSignOut(e)}>Sign out</button>
                    <div>
                        
                        {/* muestra su foto de perfil */}
                        <img src={userCookie.picture} alt=""></img>
                        {/* y su nombre de usuario */}
                        <h3>{userCookie.name}</h3>
                    </div>
                </>
            }
        </>
    );
}

export default GoogleLogin;