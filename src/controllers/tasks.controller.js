import Task from "../models/task.model.js";

export const getTasks = async (req , res) => {
    const userLogged = req.user.id
    const tasks = await Task.find({user: userLogged}).populate('user')
    res.json(tasks)
}

export const getTask = async (req , res) => {
    try {
        //Params es obtiene la informacion de la url que le pasemos
        //populate ordena los datos encontrados en un objeto "user"
        const taskFound = await Task.findById(req.params.id).populate('user')
        if(!taskFound) return res.status(404).json({message: 'Task not found'})
        res.json(taskFound)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

export const createTask = async (req , res) => {
    const { title , description , date } = req.body

    try {
        const task = new Task({
            title,
            description,
            date,
            user: req.user.id
        })
    
        const taskSave = await task.save()
        res.json(taskSave) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateTask = async (req , res) => {
    //El segundo parametro de findbyidandupdate son los datos que actualiza.
    // el new hace que devuelva los datos actualizados y no los anteriores
    const taskFound = await Task.findByIdAndUpdate(req.params.id , req.body , {
        new: true
    })
    if(!taskFound) return res.status(404).json({message: 'Task not found'})
    res.json(taskFound)
}

export const deleteTask = async (req , res) => {
    try {
        //Params es obtiene la informacion de la url que le pasemos
        const taskFound = await Task.findByIdAndDelete(req.params.id)
        if(!taskFound) return res.status(404).json({message: 'Task not found'})
        return res.sendStatus(204)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}