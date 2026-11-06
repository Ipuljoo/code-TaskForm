import React, { useState } from 'react';
import { Container, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State untuk filter pencarian

  const handleShowForm = () => setShowForm(true);

  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  const addTask = (task) => {
    // Menambahkan id dan waktu pembuatan (createdAt)
    setTasks([...tasks, { ...task, id: Date.now(), createdAt: new Date().toLocaleString('id-ID') }]);
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const showEditForm = (task) => {
    setTaskToEdit(task);
    handleShowForm();
  };

  // Memfilter tugas berdasarkan pencarian
  const filteredTasks = tasks.filter((task) => task.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center fw-bold text-primary">My Task Board</h1>

      <Row className="mb-3">
        <Col md={8}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control placeholder="Cari tugas..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </InputGroup>
        </Col>
        <Col md={4} className="text-end">
          <Button variant="primary" onClick={handleShowForm} className="w-100 fw-bold shadow-sm">
            + Add Task
          </Button>
        </Col>
      </Row>

      <div className="mt-4">
        <TaskList
          tasks={filteredTasks} // Menggunakan data yang sudah difilter
          deleteTask={deleteTask}
          showEditForm={showEditForm}
        />
        <TaskForm show={showForm} handleClose={handleCloseForm} addTask={addTask} editTask={editTask} taskToEdit={taskToEdit} />
      </div>
    </Container>
  );
}

export default App;
