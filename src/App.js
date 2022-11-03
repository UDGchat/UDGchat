import {useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import './App.css';

function App() {
  /* declara una constante que guardará el estado del usuario (sus credenciales) */
  const [user, setUser] = useState({});

  const {REACT_APP_GOOGLE_CLIENT} = process.env;

  //lo que pasa cuando el usuario ingresa con su cuenta de Google
  function handleCallbackResponse(response) {
    //descencripta la respuesta de Google, que contiene los datos del usuario, usando jwt_decode
    var userCredential = jwt_decode(response.credential);

    //guarda esas credenciales en la constante 'user' usando 'setUser' declarado en la línea 7
    setUser(userCredential);
    console.log(userCredential);

    //esconde el botón de ingreso con Google
    document.getElementById("signInDiv").hidden = true;
  }

  //maneja el proceso de cerrar sesión
  function handleSignOut(event) {
    //cambia lo que contiene la constante 'user' de las credenciales del usuario a contener nada
    setUser({});

    //hace que el botón de inicio de sesión sea visible de nuevo
    document.getElementById("signInDiv").hidden = false;
  }
  //lo que pasa cuando la página se carga por primera vez
  useEffect(() => {
    /* inicializa el proceso de registrarse con Google */
    /* global google */ // <-- este comentario le dice al programa que ignore cualquier instancia en la que google no este definido 
    google.accounts.id.initialize({
      //la id de cliente que Google nos otorgó (no debería de estar aquí, después la movemos)
      client_id: REACT_APP_GOOGLE_CLIENT, 

      //cuando el usuario se registra (callnack) ejecuta esta funcion (handleCallbackResponse)
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
    google.accounts.id.prompt();
  }, []);

  //regresa el siguiente código HTML
  return (
    <div className="App">
      {/* Crea el elemento para el botón de Google */}
      <div id="signInDiv"></div>
      {
        // Sí la constante 'user' no es de longitud 0, es decir, tiene algo en su interior:
        Object.keys(user).length !== 0 &&

        //Crea el botón para cerrar sesión y hace que, cuando lo presionen (onClick) ejecute 'handleSignOut, definido en la línea 22'
        <button onClick={ (e) => handleSignOut(e)}>Sign out</button>
      }
      
      { 
        user && //Sí el usuario ha ingresado a su cuenta:
        <div>
          {/* muestra su foto de perfil */}
          <img src={user.picture} alt=""></img>
          {/* y su nombre de usuario */}
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
