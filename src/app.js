import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import taskRoutes from "./routes/taks.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    //establece las cookies a la solicitud
    credentials: true
}))
//Configura Morgan para registrar todas las solicitudes HTTP en el formato 'dev'
app.use(morgan('dev'))
//Convierte las req.body en fomato json
app.use(express.json())
//Cookie parser convierte un token en formato json
app.use(cookieParser())

app.use('/api' , authRoutes)
app.use('/api' , taskRoutes)

export default app