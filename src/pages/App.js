import React from 'react';
import '../App.css';
import TodoList from '../components/TodoList';
import Header from '../components/Header'

function App() {
  return (
    <div>
      <Header />
      <TodoList />
    </div>
  );
}

export default App;
