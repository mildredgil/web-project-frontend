import React from 'react';
import { axiosDefault } from "../Utils/axiosApi";

const useApp = () => {
    const [token, setToken] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const [rol, setRol] = React.useState(null);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        let token = localStorage.getItem("token");
        let username = localStorage.getItem("username");
        let rol = localStorage.getItem("rol");
        
        if( localStorage.getItem("token") ) {
          setToken(localStorage.getItem("token"));
        }

        if( localStorage.getItem("username") ) {
          setUsername(localStorage.getItem("username"));
        }

        if( localStorage.getItem("rol") ) {
          setRol(localStorage.getItem("rol"));
        }
    }, [])

    let login = (username, password)  => {
      axiosDefault.post(`/user/login`, {
        username,
        password
      })
      .then( (response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("rol", response.data.rol);
        localStorage.setItem("username", response.data.username);
        window.location.replace("/login");
      }).catch((err) => {
        setError({message: err.response.statusText});
      });
    }
  
    let logout = () => {
      localStorage.removeItem("token");
      setToken(null);
      setUsername(null);
    }

    return {
      username,
      token,
      error,
      rol,
      login, 
      logout
    }
}

export default useApp;