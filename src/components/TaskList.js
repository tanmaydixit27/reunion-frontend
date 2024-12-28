import React, { useState, useEffect } from 'react';
import { fetchTasks, deleteTask } from '../services/taskAPI'; // Your provided API
import TaskForm from './TaskForm';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const getTasks = async () => {
    try {
      const { data } = await fetchTasks(filters);
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    getTasks();
  }, [filters]);

  const handleSave = () => {
    setShowForm(false);
    getTasks();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        getTasks();
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  const handleAddTask = () => {
    setSelectedTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowForm(true);
  };

  return (
    <div className="task-list-container">
      <h4>Task List</h4>
      <button className="add-task-btn" onClick={handleAddTask}>
        + Add Task
      </button>
      <div className="sort-filter-container">
        <select
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          value={filters.sort || ''}
        >
          <option value="">Sort</option>
          <option value="startTime:asc">Start time: ASC</option>
          <option value="startTime:desc">Start time: DESC</option>
          <option value="endTime:asc">End time: ASC</option>
          <option value="endTime:desc">End time: DESC</option>
        </select>
        <select
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          value={filters.priority || ''}
        >
          <option value="">Priority</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <select
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          value={filters.status || ''}
        >
          <option value="">Status</option>
          <option value="pending">Pending</option>
          <option value="finished">Finished</option>
        </select>
        <button onClick={() => setFilters({})}>Remove Filters</button>
      </div>
      <div className="task-cards-container">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <h5>Task ID: {task._id}</h5>
            <p>{task.title}</p>
            <span
              className={`status ${task.status === 'finished' ? 'finished' : 'pending'}`}
            >
              {task.status}
            </span>
            <p>Priority: {task.priority}</p>
            <p>Start: {new Date(task.startTime).toLocaleString()}</p>
            <p>End: {new Date(task.endTime).toLocaleString()}</p>
            <button onClick={() => handleEditTask(task)}>Edit</button>
            <button className="delete" onClick={() => handleDelete(task._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
  
      {/* Modal for Task Form */}
      {showForm && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h4>Add New Task</h4>
      <TaskForm
        task={selectedTask}
        onSave={handleSave}
        onClose={() => setShowForm(false)}
      />
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button className="add-task-btn" onClick={() => setShowForm(false)}>
          Add Task
        </button>
        <button className="cancel-btn" onClick={() => setShowForm(false)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
  
};

export default TaskList;
