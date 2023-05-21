import React, { useState } from 'react';
import DropdownMenu from './Tagdropdown';
import Badge from 'react-bootstrap/Badge';

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

  const formattedDate = `${year}-${month}-${day}`;

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

  return (
    <div>
      <h2>Todo List</h2>
      <form onSubmit={handleFormSubmit}>

          <input
            type="text"
            value={taskTitleInput}
            onChange={handleTaskTitleInputChange}
            placeholder="Enter a task"
          />
          <input
            type="text"
            value={taskDescInput}
            onChange={handleTaskDescInputChange}
            placeholder="Enter task description"
          />
        <div>
        <input
          type="time"
          value={timeInput}
          onChange={handleTimeInputChange}
        />
        <input
          type="date"
          value={dateInput}
          onChange={handleDateInputChange}
        />
          <DropdownMenu onSelect={handleDropdownSelect} />
        </div>
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {sortedTasks.map((task, index) => (
          <li key={index}>
            <div className={`todo-list ${task.date === formattedDate ? `${task.tag} ${task.date}` : 'hidden'}`}>
              <div className='list-content'>
                <h3>{task.task_title}</h3>
                <p>{task.task_desc}</p>
              </div>
              <Badge bg={task.tag === 'important' ? 'danger' : task.tag === 'semi-important' ? 'warning' : 'success'} onClick={() => handleTagClick(index)} > {task.tag} </Badge>{' '}
              <p>{ task.date }</p>
              <input type='checkbox'></input>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
