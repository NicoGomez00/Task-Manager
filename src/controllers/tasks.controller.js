import Task from "../models/task.model.js";
import { ObjectId } from "mongodb";
import db from '../db.js'

const collection = await db.collection("task");


export const getTasks = async (req , res) => {
    const userLogged = new ObjectId(req.user.id)
    try {
        let results = await collection.find({user: userLogged}).toArray();
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTask = async (req , res) => {
    try {
        //Params es obtiene la informacion de la url que le pasemos
        //populate ordena los datos encontrados en un objeto "user"
        const taskId = new ObjectId(req.params.id);
        let taskFound = await collection.findOne({_id: taskId})
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
    
        const taskSave = await collection.insertOne(task)
        res.json(taskSave.ops[0]) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateTask = async (req , res) => {
    //El segundo parametro de findbyidandupdate son los datos que actualiza.
    // el new hace que devuelva los datos actualizados y no los anteriores
    const taskId = new ObjectId(req.params.id);
    const taskFound = await collection.updateOne({_id: taskId} , {$set: req.body})

    if(!taskFound) return res.status(404).json({message: 'Task not found'})
    res.json(taskFound)
}

export const deleteTask = async (req , res) => {
    try {
        //Params es obtiene la informacion de la url que le pasemos
        const taskId = new ObjectId(req.params.id);
        console.log(taskId)
        const taskFound = await collection.deleteOne({_id: taskId})
        if(!taskFound) return res.status(404).json({message: 'Task not found'})
        return res.sendStatus(204)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}