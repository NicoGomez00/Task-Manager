import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';

const Navbar = () => {

    const { isAuthenticated , logout , user } = useAuth();
    const theme = useTheme()

  return (
    <Box sx={{
        bgcolor: theme.palette.primary.main,
        borderRadius: 1,
        color: 'white',
        marginBottom: 3,
        }}>
    <nav className=' my-3 flex justify-between py-5 px-10 rounded-lg items-center' >
        <Link to='/tasks'>
            <Typography variant='h3' component='h1'>
                Task Manager
            </Typography>
        </Link>

        <List sx={{
            display:'flex'
        }}>
            {isAuthenticated ? (
            <>
            <ListItem alignItems='flex-start'>
                <ListItemButton>
                    <ListItemText primary={`Welcome ${user.username}`} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <Link to='/add-task'style={{display:'flex' , alignItems:'center'}} >
                    <ListItemButton>
                        Add Task
                        <ListItemIcon sx={{color:'white'}}>
                            <InboxIcon/>
                        </ListItemIcon>
                    </ListItemButton>
                </Link>
            </ListItem>
            <ListItem>
            <Link onClick={logout} to='/'>
                <ListItemButton>
                    Logout 
                </ListItemButton>
            </Link>
            </ListItem>
            </>
            ) : (
                <>
                <ListItem>
                <Link to='/login'>
                    <ListItemButton>
                        Login
                    </ListItemButton>
                </Link>
                </ListItem>
                <ListItem>
                <Link to='/register'>
                    <ListItemButton>
                        Register
                    </ListItemButton>
                </Link>
                </ListItem>
                </>
            )}
            
        </List>
    </nav>
    </Box>
  )
}

export default Navbar
