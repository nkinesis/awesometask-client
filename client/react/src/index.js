import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import TaskNav from './components/TaskNav.js';

function TaskManager() {
  return (
    <TaskNav >
    </TaskNav>
  );
}

ReactDOM.render(<TaskManager />, document.getElementById('root'));

export default TaskManager;