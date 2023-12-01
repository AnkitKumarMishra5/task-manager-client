import { useState, useEffect } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'react-bootstrap'

import NavbarComponent from './components/Navbar';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import AlertComponent from './components/Alert';

import { Task } from './interfaces/common'

const { REACT_APP_API_URL } = process.env

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [alertText, setAlertText] = useState<string | null>(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/tasks`)
      setTasks(res.data.data)
    } catch (error) {
      console.error(error)
    }
  }
  
  const addTask = async (taskData: { description: string }) => {
    try {
      const res = await axios.post(`${REACT_APP_API_URL}/tasks`, taskData)
      setTasks([
        ...tasks,
        res.data.data
      ])
      showAlert('Task added successfully!')
    } catch (error) {
      console.error(error)
    }
  }

  const editTask = async (taskData: Task) => {
    try {
      await axios.patch(`${REACT_APP_API_URL}/tasks/${taskData._id}`, taskData)
      let newTasks = tasks.map(task => {
        if(task._id !== taskData._id) return task
        else return taskData
      })
      setTasks(newTasks)
      showAlert('Task updated successfully!')
    } catch (error) {
      console.error(error)
    }
  }

  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`${REACT_APP_API_URL}/tasks/${taskId}`)
      let newTasks = tasks.filter(task => task._id !== taskId)
      setTasks(newTasks)
      showAlert('Task deleted successfully!')
    } catch (error) {
      console.error(error)
    }
  }

  const showAlert = (message: string) => {
    setAlertText(message)
    setTimeout(() => {
      setAlertText(null)
    }, 3000)
  }

  return (
    <div className="App">
      <NavbarComponent />
      <Container id='main'>
        <AddTask addTask={addTask} />
        <Tasks tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
        <AlertComponent alertText={alertText} setAlertText={setAlertText} />
      </Container>
    </div>
  );
}

export default App;
