import { createContext , useContext, useState , useCallback } from 'react'
import { createTaskRequest, deleteTaskRequest, getTasksRequest , getTaskRequest , updateTaskRequest } from "../api/task.js";
import PropTypes from 'prop-types';

/** createContext se utiliza para crear un contexto. 
 * Un contexto en React es una forma de pasar datos a través de la jerarquía de componentes 
 * sin tener que pasar props manualmente en cada nivel */
const TaskContext = createContext()

export const useTasks = () => {
    /**useContext es un hook que permite a un componente funcional suscribirse a un contexto.
     *  Cuando un componente usa useContext, React se asegura de que 
     * el componente se vuelva a renderizar si el valor del contexto cambia. */
    const context = useContext(TaskContext)

    if(!context) {
        throw new Error('useTask must be used within a TaskProvider')
    }
    return context
}

export const TaskProvider = ({children}) => {

    const [tasks , setTasks] = useState([])

    //Obtener todas las tareas
    const getAllTasks = useCallback(async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);
        } catch (error) {
            console.error(error);
        }
    }, []); // Dependencias vacías para asegurar que la función no cambia

    const getTask = async (id) => {
        try {
           const res = await getTaskRequest(id)
           return res.data
        } catch (error) {
            console.log(error)
        }
    }

    //Crear tarea
    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task)
            console.log(res)
            setTasks(res)
        } catch (error) {
            console.log(error)
        }
    }

    const updateTask = async (id , task) => {
        try {
            await updateTaskRequest(id , task )
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id)
            if(res.status === 204){
                setTasks(tasks.filter(task => task._id !== id))
            }
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <TaskContext.Provider value={{
        tasks,
        createTask,
        getAllTasks,
        deleteTask,
        getTask,
        updateTask,
    }}>
        {children}
    </TaskContext.Provider>
  )
}

TaskProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };