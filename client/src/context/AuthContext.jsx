//Guardamos los datos de autentificacion del usuario
import { createContext, useContext, useEffect, useState } from 'react';
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import PropTypes from 'prop-types';
//Permite leer las cookies desde el frontend
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const signup = async (user) => {
    try {
      const result = await registerRequest(user);
      if (result.error) {
        setErrors(result.error.response.data);
      } else {
        setUser(result.data);
        setIsAuthenticated(true);
        setErrors([]); // Limpiar errores en caso de éxito
      }
    } catch (error) {
      setErrors(["Registration failed. Please try again."]);
    }
  };

  const signin = async (user) => {
    try {
      const result = await loginRequest(user);
      if (result.error) {
        setErrors(result.error.response.data);
        console.log(result.error.response.data);
      } else {
        setUser(result.data);
        setIsAuthenticated(true);
        setErrors([]); // Limpiar errores en caso de éxito
      }
    } catch (error) {
      setErrors(["Login failed. Please try again."]);
    }
  };

  const logout = async () => {
    try {
      Cookies.remove('token')
      setIsAuthenticated(false)
      setUser([])
    } catch (error) {
      console.log(error)
    }
  }

  //Muestra y sca de la pantalla los errores de formulario por un tiempo definido
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin(){
      const cookies = Cookies.get();
      if(cookies.token){
        try {

          const res = await verifyTokenRequest(cookies.token)
          if(!res.data) return setIsAuthenticated(false)
          setIsAuthenticated(true)
          setUser(res.data)

        } catch (error) {

          setIsAuthenticated(false)
          setUser(null)

        }
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider 
      value={{
        signup,
        signin,
        logout,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
