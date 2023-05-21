import React, { useState } from 'react';
import DropdownMenu from './Tagdropdown';
import Badge from 'react-bootstrap/Badge';

import { Form, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';  

function TodoList() {
  const [taskTitleInput, setTaskTitleInput] = useState('');
  const [taskDescInput, setTaskDescInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const defaultFormattedDate = `${year}-${month}-${day}`;

  const [formattedDate, setFormattedDate] = useState(defaultFormattedDate);

  const handleTaskTitleInputChange = (event) => {
    setTaskTitleInput(event.target.value);
  };

  const handleTaskDescInputChange = (event) => {
    setTaskDescInput(event.target.value);
  };

  const handleTimeInputChange = (event) => {
    setTimeInput(event.target.value);
  };

  const handleDateInputChange = (event) => {
    setDateInput(event.target.value);
  };

  const handleDropdownSelect = (option) => {
    setSelectedOption(option);
  };

  const handleFormattedDateChange = (event) => {
    setFormattedDate(event.target.value);
  };


  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (taskTitleInput.trim() === '' || timeInput.trim() === '' || dateInput.trim() === '') {
      return; // Don't add incomplete tasks
    }

    const newTask = {
      task_title: taskTitleInput,
      task_desc: taskDescInput,
      time: timeInput,
      date: dateInput,
      tag: selectedOption,
      completed: false, // Add the completed property and initialize it as false
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskTitleInput('');
    setTaskDescInput('');
    setTimeInput('');
    setDateInput('');
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(a.date + 'T' + a.time);
    const dateB = new Date(b.date + 'T' + b.time);
    return dateA - dateB;
  });

  const handleTagClick = (index) => {
    const updatedTasks = [...tasks];
    const currentTag = updatedTasks[index].tag;

    if (currentTag === 'important') {
      updatedTasks[index].tag = 'semi-important';
    } else if (currentTag === 'semi-important') {
      updatedTasks[index].tag = 'unimportant';
    } else if (currentTag === 'unimportant') {
      updatedTasks[index].tag = 'important';
    }

    setTasks(updatedTasks);
  };

  const handleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };
  
  

  return (
    <div>
      <h2>Todo List</h2>
      <Form onSubmit={handleFormSubmit} className="w-75 mx-auto">
  <div className="row mb-3">
    <div className="col">
      <Form.Group controlId="taskTitleInput">
        <Form.Label>Task Title</Form.Label>
        <Form.Control
          type="text"
          value={taskTitleInput}
          onChange={handleTaskTitleInputChange}
          placeholder="Enter a task"
        />
      </Form.Group>
    </div>
    <div className="col">
      <Form.Group controlId="taskDescInput">
        <Form.Label>Task Description</Form.Label>
        <Form.Control
          type="text"
          value={taskDescInput}
          onChange={handleTaskDescInputChange}
          placeholder="Enter task description"
        />
      </Form.Group>
    </div>
  </div>
  <div className="row mb-3">
    <div className="col">
      <Form.Group controlId="timeInput">
        <Form.Label>Time</Form.Label>
        <Form.Control
          type="time"
          value={timeInput}
          onChange={handleTimeInputChange}
        />
      </Form.Group>
    </div>
    <div className="col">
      <Form.Group controlId="dateInput">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={dateInput}
          onChange={handleDateInputChange}
        />
      </Form.Group>
    </div>
  </div>
  <DropdownMenu onSelect={handleDropdownSelect} />

  <div className="text-center submit-btn">
    <Button variant="primary" type="submit">
      Add Task
    </Button>
  </div>
</Form>
      <form>
        <label htmlFor="formattedDate">Date of task:</label>
        <input
          type="date"
          id="formattedDate"
          value={formattedDate}
          onChange={handleFormattedDateChange}
        />
      </form>

      <ul>
        {sortedTasks.map((task, index) => (
          <li key={index}>
              <div
                className={`todo-list ${
                  task.date === formattedDate ? `${task.completed ? 'completed' : task.tag} ${task.date}` : 'hidden'
                }`}
              >
              <div className='list-content'>
                <h3>{task.task_title}</h3>
                <p>{task.task_desc}</p>
              </div>
              <Badge bg="primary"> {task.completed ? 'complete' : 'pending'} </Badge>
              <Badge bg={task.tag === 'important' ? 'danger' : task.tag === 'semi-important' ? 'warning' : 'success'} onClick={() => handleTagClick(index)} > {task.tag} </Badge>{' '}
              <p>{ task.date }</p>
              <input type="checkbox" checked={task.completed} onChange={() => handleTaskCompletion(index)} /> {/* Add checkbox input */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
