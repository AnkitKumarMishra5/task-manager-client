import React, { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap';
import './index.css';

interface AddTaskProps {
  addTask: (taskData: { description: string }) => void
}

const AddTask: React.FC<AddTaskProps> = ({ addTask }) => {
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask({ description })
    setDescription('')
  }

  return (
    <Form id="add-task" onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Draft a technical article ..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          value={description}
        />
        <Button variant="dark" id="button-addon2" type="submit">
          Add
        </Button>
      </InputGroup>
    </Form>
  );
}

export default AddTask;