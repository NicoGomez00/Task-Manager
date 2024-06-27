import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    //generamos la referencia de tareas perteciencientes a cada usaario
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
}, 
{ 
    //Crea una propiedad similar a date
    timestamps: true 
});
//Interactua los metodos con la base de datos
const Task = mongoose.model('Task' , taskSchema)

export default Task