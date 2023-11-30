import { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap';
import './index.css';

const AddTask = ({ addTask }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ description })
    setDescription('')
  }

  return (
    <Form id="add-task" onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Draft a technical article ..."
          onChange={(e) => setDescription(e.target.value)}
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