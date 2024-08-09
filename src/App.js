import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAddTask = () => {
    if (task.trim() === '') return;

    setTasks([...tasks, task]);
    setTask('');
  };

  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setEditValue(tasks[index]);
  };

  const handleSaveEdit = () => {
    if (editValue.trim() === '') return;

    const updatedTasks = tasks.map((t, i) => (i === editingIndex ? editValue : t));
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                {task}
                <button onClick={() => handleEditTask(index)}>Edit</button>
                <button onClick={() => handleRemoveTask(index)}>Remove</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
