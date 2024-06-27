import mongoose from "mongoose";

//Objeto de validacion de usuarios

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, 
{ 
    //Crea una propiedad similar a date
    timestamps: true 
});
//Interactua los metodos con la base de datos
const User = mongoose.model('User' , userSchema)

export default User