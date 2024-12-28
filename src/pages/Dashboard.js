import React, { useState, useEffect } from 'react';
import { fetchTasks } from '../services/taskAPI'; // Your provided API
import './Dashboard.css'; // Add styles based on the UI in the image
import Navbar from '../components/Navbar';
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState({
    totalTasks: 0,
    tasksCompleted: 0,
    tasksPending: 0,
    avgTimePerTask: 0,
  });
  const [pendingTaskSummary, setPendingTaskSummary] = useState({
    pendingTasks: 0,
    totalTimeLapsed: 0,
    totalTimeToFinish: 0,
    prioritySummary: [],
  });

  useEffect(() => {
    const getTasks = async () => {
      try {
        const { data } = await fetchTasks();
        setTasks(data);
        calculateSummary(data);
        calculatePendingTaskSummary(data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    getTasks();
  }, []);

  const calculateSummary = (tasks) => {
    const totalTasks = tasks.length;
    const tasksCompleted = tasks.filter((task) => task.status === 'finished').length;
    const tasksPending = totalTasks - tasksCompleted;

    const completedTasks = tasks.filter((task) => task.status === 'finished');
    const avgTimePerTask =
      completedTasks.length > 0
        ? completedTasks.reduce((sum, task) => {
            const time = (new Date(task.endTime) - new Date(task.startTime)) / 3600000; // Convert to hours
            return sum + time;
          }, 0) / completedTasks.length
        : 0;

    setSummary({
      totalTasks,
      tasksCompleted,
      tasksPending,
      avgTimePerTask: avgTimePerTask.toFixed(1),
    });
  };

  const calculatePendingTaskSummary = (tasks) => {
    const pendingTasks = tasks.filter((task) => task.status === 'pending');
    const totalTimeLapsed = pendingTasks.reduce((sum, task) => {
      const time = (Date.now() - new Date(task.startTime)) / 3600000; // Convert to hours
      return sum + time;
    }, 0);

    const totalTimeToFinish = pendingTasks.reduce((sum, task) => {
      const time = (new Date(task.endTime) - Date.now()) / 3600000; // Convert to hours
      return time > 0 ? sum + time : sum;
    }, 0);

    const prioritySummary = [1, 2, 3, 4, 5].map((priority) => {
      const filteredTasks = pendingTasks.filter((task) => task.priority === priority);
      const count = filteredTasks.length;
      const timeLapsed = filteredTasks.reduce((sum, task) => {
        const time = (Date.now() - new Date(task.startTime)) / 3600000; // Convert to hours
        return sum + time;
      }, 0);

      const timeToFinish = filteredTasks.reduce((sum, task) => {
        const time = (new Date(task.endTime) - Date.now()) / 3600000; // Convert to hours
        return time > 0 ? sum + time : sum;
      }, 0);

      return { priority, count, timeLapsed: timeLapsed.toFixed(0), timeToFinish: timeToFinish.toFixed(0) };
    });

    setPendingTaskSummary({
      pendingTasks: pendingTasks.length,
      totalTimeLapsed: totalTimeLapsed.toFixed(0),
      totalTimeToFinish: totalTimeToFinish.toFixed(0),
      prioritySummary,
    });
  };

  return (
    <div className="dashboard-container">
       <Navbar />
      <h4>Dashboard</h4>
      <div className="summary-container">
        <div>
          <h5>{summary.totalTasks}</h5>
          <p>Total tasks</p>
        </div>
        <div>
          <h5>{((summary.tasksCompleted / summary.totalTasks) * 100).toFixed(0)}%</h5>
          <p>Tasks completed</p>
        </div>
        <div>
          <h5>{((summary.tasksPending / summary.totalTasks) * 100).toFixed(0)}%</h5>
          <p>Tasks pending</p>
        </div>
        <div>
          <h5>{summary.avgTimePerTask} hrs</h5>
          <p>Average time per completed task</p>
        </div>
      </div>
      <div className="pending-summary-container">
        <h5>Pending task summary</h5>
        <div>
          <div>
            <h5>{pendingTaskSummary.pendingTasks}</h5>
            <p>Pending tasks</p>
          </div>
          <div>
            <h5>{pendingTaskSummary.totalTimeLapsed} hrs</h5>
            <p>Total time lapsed</p>
          </div>
          <div>
            <h5>{pendingTaskSummary.totalTimeToFinish} hrs</h5>
            <p>Total time to finish</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Task priority</th>
              <th>Pending tasks</th>
              <th>Time lapsed (hrs)</th>
              <th>Time to finish (hrs)</th>
            </tr>
          </thead>
          <tbody>
            {pendingTaskSummary.prioritySummary.map((item) => (
              <tr key={item.priority}>
                <td>{item.priority}</td>
                <td>{item.count}</td>
                <td>{item.timeLapsed}</td>
                <td>{item.timeToFinish}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
