import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const dataFile = path.join(__dirname, 'data', 'tasks.json');

app.use(cors());
app.use(express.json());

// Initialize data file if it doesn't exist
if (!fs.existsSync(path.dirname(dataFile))) {
  fs.mkdirSync(path.dirname(dataFile), { recursive: true });
}
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([]));
}

// GET all tasks
app.get('/api/tasks', (req, res) => {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Failed to read tasks' });
  }
});

// POST to add new task
app.post('/api/tasks', (req, res) => {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    const tasks = JSON.parse(data);
    const newTask = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      title: req.body.title || 'Untitled',
      type: req.body.type || 'admin',
      status: req.body.status || 'pending',
      subtasks: req.body.subtasks || []
    };
    tasks.push(newTask);
    fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2));
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add task' });
  }
});

// PUT to update task
app.put('/api/tasks/:id', (req, res) => {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    let tasks = JSON.parse(data);
    const index = tasks.findIndex(t => t.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    tasks[index] = { ...tasks[index], ...req.body };
    fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2));
    res.json(tasks[index]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    let tasks = JSON.parse(data);
    tasks = tasks.filter(t => t.id !== req.params.id);
    
    fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
