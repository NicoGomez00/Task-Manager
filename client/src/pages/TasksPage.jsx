import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import { Grid, Typography } from "@mui/material";

const TasksPage = () => {
  const { tasks, getAllTasks } = useTasks();

  useEffect(() => {
    getAllTasks();
  }, [getAllTasks]);

  return (
    <Grid container spacing={3}>
      {Array.isArray(tasks) && tasks.length > 0 ? (
        tasks.map((task, index) => (
          <Grid item xs={12} md={4} key={task._id}>
            <TaskCard task={task} index={index} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="h1" component={'p'} sx={{textAlign:'center'}} >No task available</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default TasksPage;
