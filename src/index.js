import app from './app.js'
import { connectDB } from './db.js'

const PORT = 3000

//Primero inicia la conexion con la db antes de crear el servidor
connectDB()

app.listen(PORT)
console.log(`Server running on port ${PORT}`)