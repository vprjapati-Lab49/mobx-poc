import React from 'react';
import logo from './resources/logo.png';
import './App.css';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <div className="app-main">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <TodoList />
    </div>
  );
}

export default App;
