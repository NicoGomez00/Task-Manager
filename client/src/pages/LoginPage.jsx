import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography , TextField , Button , Container , Alert } from '@mui/material';


const LoginPage = () => {


  const {register , handleSubmit , formState: {errors}} = useForm()
  const {signin , isAuthenticated , errors : loginErrors} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    await signin(values)
  })

  return (
    <Container maxWidth='xs' className='flex h-[calc(100vh - 100px)] items-center justify-center'>
        <Box className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>

      {
        loginErrors.map((error , index) => (
          <Box key={index}>
            <Alert sx={{marginBottom:1}} severity="error">{error}</Alert>
          </Box>
        ))
      }
      <Typography className='text-2xl font-bold pb-2 text-white' component={'h1'} variant='h4'>Login</Typography>
        <Box component={'form'} onSubmit={onSubmit}>

          <TextField sx={{marginBottom:1}} type='email' {...register("email" , {required: true})}
          className='w-full bg-zinc-700 rounded-md'
          label='email'
          variant="outlined"
          InputLabelProps={{ 
            style: { color: 'white' , opacity: 0.4 },
          }}
          InputProps={{
            style: { color: 'white' , opacity: 0.8 },
          }}
          />
            {errors.email &&
              <Typography className='text-red-500 my-2'>Email is required</Typography>
            }

          <TextField sx={{marginBottom:1}} type='password' {...register("password" , {required: true})}
          className='w-full bg-zinc-700 rounded-md '
          label='password'
          variant="outlined"
          InputLabelProps={{
            style: { color: 'white' , opacity: 0.4 },
          }}
          InputProps={{
            style: { color: 'white' , opacity: 0.8 },
          }}/>
          {errors.password && <p className='text-red-500 my-2'>Password is required</p>}

          <Button variant='contained' className='rounded-md' type='submit'>Login</Button>
        </Box>
        <Box>
          <Typography sx={{color:'white'}} className='flex gap-x-2 justify-between pt-3 m-1'>
          Don&#39;t have an account? <Link to='/login' className='text-sky-500'>Sign up</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginPage
