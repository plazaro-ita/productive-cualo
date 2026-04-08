# LIFO Workspace

A local, distraction-free productivity app designed around cognitive science and the "Science of Self-Control." 

Features include:
- A dominant "Active Task" view to reduce peeking anxiety.
- A relaxed, deferrable LIFO task queue.
- An omnipresent "Brain Dump" bar to quickly close mental open loops.
- Intentional physical break prompts based on cognitively heavy system-2 workloads.

## Launch Instructions

The app is completely local. It has a lightweight Node backend to persist your tasks as simple JSON, and a React frontend.

To run it, you will need two separate terminal windows.

### 1. Start the Backend API
In your first terminal tab, navigate to the `backend` folder and start the server:

```bash
cd backend
node index.js
```
*The backend will run on port `3001` and create a `data/tasks.json` file on its first run.*

### 2. Start the Frontend Application
In your second terminal tab, navigate to the `frontend` folder. Since you are running this within Windows Subsystem for Linux (WSL), use the `--host` flag to ensure it's easily accessible from your Windows browsers.

```bash
cd frontend
npm run dev -- --host
```

Once running, simply click or copy the provided `http://localhost:5173/` or `http://127.0.0.1:5173/` link into your web browser to start using the app.
