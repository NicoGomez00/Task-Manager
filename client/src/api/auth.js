import axios from "./axios";

//peticion asincrona

export const registerRequest = async (user) => {
    try {
        const res = await axios.post(`/register`, user);
        console.log('Usuario creado con éxito');
        return { success: true, data: res.data };
    } catch (error) {
        console.log(error);
        return { success: false, error: error };
    }
}

export const loginRequest = async (user) => {
    try {
        const res = await axios.post(`/login`, user);
        console.log('Usuario logeado con éxito');
        return { success: true, data: res.data };
    } catch (error) {
        console.log(error);
        return { success: false, error: error };
    }
}

export const verifyTokenRequest = async (token) => {
    return await axios.get('/verify', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
  };