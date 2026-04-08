const API_URL = 'http://localhost:3001/api';

export async function fetchTasks() {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function createTask(taskData) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function updateTask(id, updateData) {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData)
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return true;
}
