import { Router } from 'express'
import { authRequired } from "../middlewares/validateToken.js";
import { createTask , getTask , getTasks , updateTask , deleteTask } from "../controllers/tasks.controller.js";
import { createTaskSchema } from "../schemas/task.schema.js";
import { validatorSchema } from "../middlewares/validator.middlewares.js";

const router = Router()

router.get('/task' , authRequired , getTasks)
router.get('/task/:id' , authRequired , getTask)
router.post('/task' , authRequired , validatorSchema(createTaskSchema) , createTask)
router.delete('/task/:id' , authRequired , deleteTask)
router.put('/task/:id' , authRequired , updateTask)

export default router