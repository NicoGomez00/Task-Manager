import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'

export function createAccessToken(payload){
    return new Promise((resolve, reject) => {
        //metodo para generar un token
        jwt.sign(
            payload, 
            TOKEN_SECRET, 
            {
                //Indica que el token expirará en 1 día.
                expiresIn: "1d"
            },
            (err , token) => {
                if(err) reject(err)
                resolve(token)
            }
        )
    })
}
