/**Zod es una biblioteca de validación y esquemas de TypeScript/JavaScript que permite definir, 
 * analizar y validar datos de manera sencilla y segura. 
 * La principal función de Zod es garantizar que los datos cumplan con un esquema específico 
 * antes de ser procesados, lo cual es esencial para la robustez de las aplicaciones. */
import { z } from "zod";

export const registerSchema =  z.object({
    username: z.string({
        required_error: 'Username is required'
    })
    .min(6),
    email: z.string({
        required_error: 'Email is required',
    })
    //Confirmar el tipo de dato email
    .email({
        message: 'Invalid email',
    }),
    password: z.string({
        required_error: 'Password is required',
    })
    //Minimo de 6 caracteres
    .min(6 , {
        message: 'Password must be at least 6 characters'
    }),
});

export const loginSchema =  z.object({
    email: z.string({
        required_error: 'Email is required',
    })
    //Confirmar el tipo de dato email
    .email({
        message: 'Invalid email',
    }),
    password: z.string({
        required_error: 'Password is required',
    })
    //Minimo de 6 caracteres
    .min(6 , {
        message: 'Password must be at least 6 characters'
    }),
});