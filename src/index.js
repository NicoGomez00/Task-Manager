import app from './app.js'
import db from './db.js'

const PORT = 3000

//Primero inicia la conexion con la db antes de crear el servidor
db

app.listen(PORT)
console.log(`Server running on port ${PORT}`)