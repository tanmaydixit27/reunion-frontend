import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/taskAPI'; // Your provided API

const TaskForm = ({ task, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    status: 'pending',
    priority: 1,
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        status: task.status,
        priority: task.priority,
        startTime: task.startTime,
        endTime: task.endTime,
      });
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task) {
        await updateTask(task._id, formData); // Update task
      } else {
        await createTask(formData); // Create new task
      }
      onSave();
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  return (
    <div className="task-form">
      <h4>{task ? 'Edit Task' : 'Add Task'}</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="finished">Finished</option>
        </select>
        <input
          type="number"
          placeholder="Priority"
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          min="1"
          max="5"
        />
        <input
          type="datetime-local"
          placeholder="Start Time"
          value={formData.startTime}
          onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          placeholder="End Time"
          value={formData.endTime}
          onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
