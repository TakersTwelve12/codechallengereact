import React, { useEffect, useState } from 'react';
import * as TasksAPI from './api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const emptyForm = { title: '', description: '', status: 'Started', dueDateTime: '' };
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setLoading(true);
    setError(null);
    try {
      const data = await TasksAPI.getTasks();
      setTasks(data || []);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }

  function toInputDateTime(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    const pad = (n) => String(n).padStart(2, '0');
    const s = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    return s;
  }

  function fromInputDateTime(value) {
    if (!value) return null;
    const dt = new Date(value);
    return dt.toISOString();
  }

  async function handleSubmit(e) {
    e && e.preventDefault();
    setError(null);
    const payload = {
      title: form.title,
      description: form.description,
      status: form.status,
      dueDateTime: fromInputDateTime(form.dueDateTime),
    };

    try {
      if (editingId) {
        await TasksAPI.editTask(editingId, form.status);
      } else {
        await TasksAPI.addTask(payload);
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Save failed');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this task?')) return;
    try {
      await TasksAPI.deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Delete failed');
    }
  }

  async function handleEdit(task) {
    setEditingId(task.taskId);
    setForm({
      title: task.title || '',
      description: task.description || '',
      status: task.status || 'Started',
      dueDateTime: toInputDateTime(task.dueDateTime),
    });
    setSelectedTask(null);
  }

  async function handleView(id) {
    try {
      const t = await TasksAPI.getTask(id);
      setSelectedTask(t);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load task');
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Case Worker Tasks(Demo)</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <div>
          <label>Title: </label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div>
          <label>Status: </label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option>Started</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <div>
          <label>Due: </label>
          <input
            type="datetime-local"
            value={form.dueDateTime}
            onChange={(e) => setForm({ ...form, dueDateTime: e.target.value })}
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <button type="submit">{editingId ? 'Update Task' : 'Add Task'}</button>{' '}
          <button type="button" onClick={() => { setForm(emptyForm); setEditingId(null); }}>Clear</button>
        </div>
      </form>

      <div>
        <h3>All Tasks</h3>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Due</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.taskId}>
                  <td>{t.title}</td>
                  <td>{t.description}</td>
                  <td>{t.status}</td>
                  <td>{t.dueDateTime ? new Date(t.dueDateTime).toLocaleString() : ''}</td>
                  <td>
                    <button onClick={() => handleView(t.taskId)}>View</button>{' '}
                    <button onClick={() => handleEdit(t)}>Edit</button>{' '}
                    <button onClick={() => handleDelete(t.taskId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedTask && (
        <div style={{ marginTop: 16, border: '1px solid #ccc', padding: 8 }}>
          <h4>Task Details</h4>
          <div><strong>Title:</strong> {selectedTask.title}</div>
          <div><strong>Description:</strong> {selectedTask.description}</div>
          <div><strong>Status:</strong> {selectedTask.status}</div>
          <div><strong>Due:</strong> {selectedTask.dueDateTime ? new Date(selectedTask.dueDateTime).toLocaleString() : ''}</div>
          <div style={{ marginTop: 8 }}>
            <button onClick={() => { setSelectedTask(null); }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;