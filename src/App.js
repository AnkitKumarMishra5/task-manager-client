import { useState, useEffect } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'react-bootstrap'

import NavbarComponent from './components/Navbar';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';

const App = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/tasks')
      setTasks(res.data.data)
    } catch (error) {
      console.error(error)
    }
  }
  
  const addTask = async (taskData) => {
    try {
      const res = await axios.post('http://localhost:4000/api/tasks', taskData)
      setTasks([
        ...tasks,
        res.data.data
      ])
    } catch (error) {
      console.error(error)
    }
  }

  const editTask = async (taskData) => {
    try {
      await axios.patch(`http://localhost:4000/api/tasks/${taskData._id}`, taskData)
      let newTasks = tasks.map(task => {
        if(task._id !== taskData._id) return task
        else return taskData
      })
      setTasks(newTasks)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:4000/api/tasks/${taskId}`)
      let newTasks = tasks.filter(task => task._id !== taskId)
      setTasks(newTasks)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="App">
      <NavbarComponent />
      <Container id='main'>
        <AddTask tasks={tasks} addTask={addTask} />
        <Tasks tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
      </Container>
    </div>
  );
}

export default App;
