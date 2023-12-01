import { useState } from 'react';
import { ListGroup, InputGroup, Form, Button } from 'react-bootstrap'
import './index.css'

import { Task } from '../../interfaces/common'

interface TasksProps {
  tasks: Task[],
  editTask: (taskData: { _id: string, description: string }) => void
  deleteTask: (taskId: string) => void
}

const Tasks: React.FC<TasksProps> = ({ tasks, editTask, deleteTask }) => {
  const [description, setDescription] = useState<string>('')
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)

  const handleEdit = (task: Task) => {
    if (editingTaskId) {
      editTask({ ...task, description })
      setEditingTaskId(null)
      return
    }
    setDescription(task.description)
    setEditingTaskId(task._id)
  }

  return (
    <ListGroup>
      {tasks.map((task) => {
        const currentTaskEditing = editingTaskId === task._id
        return (
          <ListGroup.Item key={task._id}>
            <InputGroup>
              <Form.Control
                className="task-input"
                style={{ border: !currentTaskEditing ? 'none' : '' }}
                disabled={!currentTaskEditing}
                value={!currentTaskEditing ? task.description : description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                variant="outline-secondary"
                onClick={() => handleEdit(task)}
              >
                {!currentTaskEditing ? '✏️' : '💾'}
              </Button>
              <Button variant="outline-secondary" onClick={() => deleteTask(task._id)}>🗑️</Button>
            </InputGroup>
          </ListGroup.Item>
        )
      }
      )}
    </ListGroup>
  );
}

export default Tasks;