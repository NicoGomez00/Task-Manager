import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt, { decode } from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config.js";
import db from '../db.js'
import { ObjectId } from "mongodb";

let collection;

(async () => {
    collection = await db.collection("users");
})();


export const register = async (req , res) => {
    const {username , email , password} = req.body
    try {
        let userFound = await collection.findOne({username})
        if(userFound) return res.status(401).json(['Username already exists'])

        let emailFound = await collection.findOne({email})
        if(emailFound) return res.status(401).json(['Email already exists'])

        const hashedPassword = await bcryptjs.hash(password , 8)

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        })

        const userSaved = await collection.insertOne(newUser);
        const userId = userSaved.insertedId; // Usamos insertedId para obtener el _id del usuario insertado
        console.log(userSaved);

        const token = await createAccessToken(userId.toString()); // Convertimos el ObjectId a string
        res.cookie('token', token);

        res.json({
            id: userId,
            username: newUser.username,
            email: newUser.email
        });
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const login = async (req , res) => {
    const {email , password} = req.body
    try {
        const userFound = await collection.findOne({email})
        if(!userFound) return res.status(400).json(["Email doesn't exist"])
        
        const passwordMatch = await bcryptjs.compare(password , userFound.password)
        if(!passwordMatch) return res.status(400).json(["Password Incorrect"])

        const token = await createAccessToken({id: userFound._id})
        res.cookie('token' , token)

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const logout = async ( req , res) => {
    try {
        res.cookie('token' , '' , {
            expires: new Date(0)
        })
        return res.sendStatus(200)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const profile = async (req , res) => {
    const taskId = new ObjectId(req.params.id);
    const userFound = await collection.findById({_id: taskId})

    if(!userFound) return res.status(400).json({message: 'User not found'})
    
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updateAt: userFound.updatedAt,
    })
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json(['Unauthorized']);

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        console.log('Decoded token:', decoded);

        // Verificar que el ID decodificado sea válido
        if (!decoded.id || !ObjectId.isValid(decoded.id)) {
            return res.status(400).json(['Invalid user ID']);
        }

        const userFound = await collection.findOne({ _id: new ObjectId(decoded.id) });

        if (!userFound) return res.status(401).json(['Unauthorized']);

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).json({ message: error.message });
    }
};