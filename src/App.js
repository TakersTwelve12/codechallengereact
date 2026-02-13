import React, { useState } from 'react';

function App() {
  // State to hold the list of todos
  const [todos, setTodos] = useState([]);
  // State to hold the input value
  const [input, setInput] = useState('');
  // State to track if we are editing a particular todo
  const [editId, setEditId] = useState(null);

  // Create or Update
  const handleAddOrUpdate = () => {
    if (input.trim() === '') return;

    if (editId === null) {
      // Add new todo
      setTodos([...todos, { id: Date.now(), text: input }]);
    } else {
      // Update existing todo
      setTodos(
        todos.map(todo =>
          todo.id === editId ? { ...todo, text: input } : todo
        )
      );
      setEditId(null);
    }

    setInput('');
  };

  // Read is just rendering the todos list

  // Delete
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Set todo to edit mode
  const handleEdit = (todo) => {
    setInput(todo.text);
    setEditId(todo.id);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Todo List CRUD App</h2>
      <input
        type="text"
        placeholder="Enter todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAddOrUpdate}>
        {editId === null ? 'Add' : 'Update'}
      </button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}{' '}
            <button onClick={() => handleEdit(todo)}>Edit</button>{' '}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;