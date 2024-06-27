import {useForm} from 'react-hook-form'
import { useAuth } from "../context/AuthContext";
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography , Alert } from '@mui/material';


const RegisterPage = () => {

    //Genera un estado automatico
    //register: Se usa para registrar los campos del formulario en React Hook Form.
    //handleSubmit: Se usa para manejar el evento de envío del formulario. 
    //Este método valida los campos registrados y pasa los valores validados a la función proporcionada.
    const { register , handleSubmit , formState: {errors} } = useForm()
    const {signup , isAuthenticated , errors : registerErrors} = useAuth()
    const navigate = useNavigate()

    
    useEffect(() => {
      if(isAuthenticated) navigate('/tasks')
    } , [isAuthenticated , navigate])

    const onSubmit = handleSubmit(async (values) => {
        signup(values)
      })

  return (
    <Container maxWidth='xs' className='flex h-[calc(100vh - 100px)] items-center justify-center'>
        <Box className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>

      {
        registerErrors.map((error , index) => (
          <Box key={index}>
            <Alert sx={{marginBottom:1}} severity="error">{error}</Alert>
          </Box>
      ))
    }

      <Typography variant='h4' component={'h1'} className='text-2xl font-bold pb-2 text-white'>Register</Typography> 
      <Box 
      component={'form'} 
      onSubmit={onSubmit} 
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      >
        <TextField type='text' {...register("username" , {required: true})}
        className='w-full bg-zinc-700 px-4 py-2 rounded-md my-2'
        label='username'
        variant="outlined"
        InputLabelProps={{
          style: { color: 'white' , opacity: 0.4 },
        }}
        InputProps={{
          style: { color: 'white' , opacity: 0.8 },
        }}
        />
        {errors.username && <p className='text-red-500'>Username is required</p>}

        <TextField type='email' {...register("email" , {required: true})}
        className='w-full bg-zinc-700 px-4 py-2 rounded-md my-2'
        label='email'
        variant="outlined"
        InputLabelProps={{
          style: { color: 'white' , opacity: 0.4 },
        }}
        InputProps={{
          style: { color: 'white' , opacity: 0.8 },
        }}
        />
        {errors.email && <p className='text-red-500'>Email is required</p>}

        <TextField type='password' {...register("password" , {required: true})}
        className='w-full bg-zinc-700 px-4 py-2 rounded-md my-2'
        label='password'
        variant="outlined"
        InputLabelProps={{
          style: { color: 'white' , opacity: 0.4 },
        }}
        InputProps={{
          style: { color: 'white' , opacity: 0.8 },
        }}
        />
        {errors.password && <p className='text-red-500'>Password is required</p>}

        <Button variant='contained' className='rounded-md' type='submit'>Register</Button>
      </Box>

      <Box>
        <Typography sx={{color:'white'}} className='flex gap-x-2 justify-between pt-3 m-1'>
        Already have an account? <Link to='/login' className='text-sky-500'>Sign in</Link>
        </Typography>
      </Box>
      
    
      </Box>
    </Container>

  )
}

export default RegisterPage
