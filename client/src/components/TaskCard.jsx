import { useTasks } from "../context/TaskContext";
import { Link } from "react-router-dom";
import days from "dayjs";
import utc from 'dayjs/plugin/utc'
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Button } from "@mui/material";

days.extend(utc)


const TaskCard = ({task}) => {

    const { deleteTask } = useTasks()

      
      const card = (
        <Card>
          <CardContent>
            <Typography color="secondary" variant="h4" component="h3">
              {(task.title).charAt(0).toUpperCase() + (task.title).slice(1)}
            </Typography>
            <Typography variant="body2 h6">
              {task.description}
            </Typography>
            <Typography>
             {days(task.date).utc().format("DD/MM/YYYY")}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="outlined" onClick={() => deleteTask(task._id)}>delete</Button>
            <Button size="small" variant="contained" ><Link to={`/tasks/${task._id}`} >edit</Link></Button>
          </CardActions>
        </Card>
      );
    
  return (
      <Box sx={{ minWidth: 275 , border: 0}}>
          {card}
      </Box>
  )
}

TaskCard.propTypes = {
  task: PropTypes.object.isRequired
}

export default TaskCard
