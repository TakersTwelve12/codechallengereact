const BASE = 'http://localhost:5000/Task/';

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.status === 204 ? null : res.json();
}

export async function getTasks() {
  const res = await fetch(BASE + "GetTasks");
  return handleResponse(res);
}

export async function getTask(id) {
  const res = await fetch(`${BASE}GetSingleTask/${id}`);
  return handleResponse(res);
}

export async function addTask(task) {
  const res = await fetch(BASE + "AddTask", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return handleResponse(res);
}

export async function editTask(id, status) {
  let payload = `
  {
  "taskId": ${id},
  "status": "${status}"
  }
  `
  console.log(payload);
  const res = await fetch(`${BASE}EditTask`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: payload //JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function deleteTask(id) {
  const res = await fetch(`${BASE}DeleteTask/${id}`, { method: 'DELETE' });
  return handleResponse(res);
}

export default { getTasks, getTask, addTask, editTask, deleteTask };
