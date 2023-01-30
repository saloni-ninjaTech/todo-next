import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

// DB_URL = "mongodb+srv://saloniNinja:BRhSEb8aK8V9zWIE@cluster0.fkamxab.mongodb.net/?retryWrites=true&w=majority"

const url = `${process.env.URL}/api/task`;

export default function Home(props) {
  const [taskField, setTaskField] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [updateTaskField, setUpdateTaskField] = useState("");
  const [ tasks, setTasks ] = useState(props.tasks);
  const handleChange = ({ currentTarget: input }) => {
    setTaskField(input.value)
  }
  const handleEditChange = ({ currentTarget: input }) => {
    setUpdateTaskField(input.value)
  }

  const handleDelete = (id, index) => {
    axios.delete(`${url}/${id}`).then(res => {
      alert(res.data.message)
      axios.get(url).then(data => {
        setTasks(data.data);
      })
    })
  }


  const handleEdit = () => {
    const body = {
      "task":updateTaskField,"completed":false
    }
    axios.put(`${url}/${updateId}`, body).then(res => axios.get(url).then(data => {
      setTasks(data.data);
      setUpdateTaskField("")
      setUpdateId("");
      setIsUpdate(false)
    }))
  }

  const addTask = () => {
    const body = {
      "task":taskField,"completed":false
    }
    axios.post(url, body).then(res => axios.get(url).then(data => {
      setTasks(data.data);
      setTaskField("")

    }));

  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="To Do App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <Grid container spacing={2} sx={{width:"500px"}}>
          <Grid item xs={12}>
              <Grid container justifyContent='space-between' spacing={1}>
                <Grid item>
                <TextField type='text' variant='standard' placeholder='Add Task here...' value={taskField} onChange={handleChange} />
                </Grid>
                <Grid item>
                <Button variant='contained' name="addBtn" onClick={addTask} >add</Button>
 
                </Grid>
</Grid>

            </Grid>
            <Grid item xs={12}>
            <List dense={true}>
                {tasks && tasks?.map((task, index) => (<ListItem key={task.task} secondaryAction={
                  !(isUpdate && task._id === updateId) && <><IconButton edge="end" aria-label="edit" onClick={() => {
                    setIsUpdate(true);
                    setUpdateId(task._id);
                  }}>
                    <EditIcon />
                  </IconButton><IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task._id, index)}>
                      <DeleteIcon />
                    </IconButton></>}>
                  {isUpdate && task._id === updateId ? (
                  <Grid container justifyContent='space-between' spacing={1}>
                      <Grid item>
                  <TextField type='text' variant='standard' value={updateTaskField || task.task} onChange={handleEditChange} />
                  </Grid>
                  <Grid item>
                  <Button  name="editBtn" color='success' size='small' onClick={handleEdit} >Update</Button>
                        <IconButton name="cancelBtn" onClick={() => {
                          setIsUpdate(false);
                          setUpdateId("");
                  }}><CancelOutlinedIcon /></IconButton>
                      </Grid>
                      </Grid>
                  ) :(<ListItemText
                  primary={task.task}
                  secondary={task.completed}
                  />)}
                </ListItem>)
                
              )}
            </List>
            </Grid>
          </Grid>
         
            
          
        </div>

        
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(url);
  return {
    props: {
      tasks: data
    }
  }
}