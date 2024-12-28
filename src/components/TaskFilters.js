import React from 'react';
import './TaskFilters.css';

const TaskFilters = ({ setFilters }) => {
  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="task-filters-container">
      <select name="priority" onChange={handleFilterChange} defaultValue="">
        <option value="">All Priorities</option>
        {[1, 2, 3, 4, 5].map((priority) => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </select>
      <select name="status" onChange={handleFilterChange} defaultValue="">
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="Finished">Finished</option>
      </select>
      <button className="clear-filters-btn" onClick={() => setFilters({})}>
        Clear Filters
      </button>
    </div>
  );
};

export default TaskFilters;
