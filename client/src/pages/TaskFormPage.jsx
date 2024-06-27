import { useForm } from "react-hook-form"
import { useTasks } from "../context/TaskContext"
//useParams obtiene un objeto de datos dinamicos de la url
import { useNavigate , useParams } from "react-router-dom"
import { useEffect } from "react"
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { Box, Typography , TextField , Button } from '@mui/material';

import '../index.css'

dayjs.extend(utc)

const TaskFormPage = () => {

  //register: Se utiliza para registrar un input y sus reglas de validación en el hook de formularios
  //handleSubmit: Se utiliza para manejar el envío del formulario. Toma una función como argumento, que se ejecutará cuando el formulario sea enviado y validado correctamente.
  //setValue: Permite establecer el valor de un campo del formulario de manera programática.
  const {register , handleSubmit , setValue , formState: { errors } } = useForm()
  const { createTask , getTask , updateTask } = useTasks()
  const navigate = useNavigate()
  const params = useParams()


  useEffect(() => {
    async function loadTask() {
      if (params.id) {
          const task = await getTask(params.id); // Espera a que la promesa se resuelva
            console.log("Task loaded:", task); // Verificación visual de los datos cargados
            setValue('title', task.title);
            setValue('description', task.description);
            setValue('date', dayjs.utc(task.date).format("YYYY-MM-DD")); // Cambiado al formato ISO para que coincida con el input de tipo date
          }
    }
    loadTask();
  }, [params.id, setValue]);


  const onSubmit = handleSubmit( async (data) => {

    const dataValue = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format()
    }

    if(params.id){
      await updateTask(params.id , dataValue)
    }else{
      await createTask(dataValue)
      console.log('Tarea creada con exito')
    }
    navigate('/tasks')
  })

  
  return (
      <Box className="flex justify-center items-center">
        <Box className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
          <Typography className='text-2xl font-bold pb-2 text-white' component={'h1'} variant='h4'>Create Task</Typography>
          <Box component='form' onSubmit={onSubmit}>

          <TextField sx={{marginBottom:1}} type='text' {...register("title" , {required: true})}
          className='w-full bg-zinc-700 rounded-md'
          label='Title'
          variant="outlined"
          InputLabelProps={{ 
            shrink: true,
            style: { color: 'white' , opacity: 0.4 },
          }}
          InputProps={{
            style: { color: 'white' , opacity: 0.8 },
          }}
          />

          {errors.title &&
            <Typography className='text-red-500 my-2'>Title is required</Typography>
          }

          <TextField
            margin='dense'
            id="description"
            label="Description"
            placeholder="Description"
            {...register('description' , {required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            multiline
            rows={3}
            variant="outlined"
            InputLabelProps={{ 
              shrink: true,
              style: { color: 'white' , opacity: 0.4 },
            }}
            InputProps={{
              style: { color: 'white' , opacity: 0.8 },
            }}
          />

          {errors.description &&
            <Typography className='text-red-500 my-2'>Description is required</Typography>
          }
          

          <TextField
            margin='dense'
            id="date"
            label="Date"
            type="date"
            {...register('date')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            InputLabelProps={{ 
              shrink: true,
              style: { color: 'white' , opacity: 0.4 },
            }}
            InputProps={{
              style: { color: 'white' , opacity: 0.8 },
            }}
            variant="outlined"
          />

      
            <Button variant="contained" className="buttonUi" type="submit">
            {params.id ? ('Update Task') : ('Create Task') }
            </Button>
          </Box>
        </Box>
      </Box>
  )
}

export default TaskFormPage
