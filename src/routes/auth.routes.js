import { Router } from "express";
import { login , register , logout , profile, verifyToken } from "../controllers/auth.controller.js";
import { loginSchema , registerSchema } from "../schemas/auth.schema.js";
import { authRequired } from '../middlewares/validateToken.js'
//Validacion de datos que se ingresan antes de guardarlos o compararlos con la base de datos
import { validatorSchema } from "../middlewares/validator.middlewares.js";

const router = Router()

router.post('/register' , validatorSchema(registerSchema) ,register )
router.post('/login' , validatorSchema(loginSchema) ,login )
router.post('/logout' , logout)
router.get('/profile' , authRequired ,  profile)
router.get('/verify' , verifyToken)

export default router