# Coding Challenge Tasks React App

This is a React app built as part of the Coding Challenge which uses a Backend Tasks API.

## What it does
- Displays a list of tasks in a table fetched from a backend API.
- Allows adding a new task, viewing a single task, editing a task's /status, and deleting a task.
- Has Validation on entering blank Title, or any incomplete Date components.
- Uses the API endpoints hosted at `http://localhost:5000` (see API details below).

## Task schema
```json
{
  "taskId": 123,
  "title": "My task",
  "description": "Optional description",
  "status": "Started|In Progress|Completed",
  "dueDateTime": "2026-02-13T12:00:00.000Z"
}
```

## API endpoints the app expects
- `GET http://localhost:5000/Task/GetTasks` — returns list of tasks
- `GET http://localhost:5000/Task/GetSingleTask/{id}` — returns single task
- `POST http://localhost:5000/Task/AddTask` — create task (JSON body)
- `PUT http://localhost:5000/Task/EditTask` — edit task (JSON body)
- `DELETE http://localhost:5000/Task/DeleteTask/{id}` — delete task

Note: the repository contains `src/api/tasks.js` which wraps these endpoints; if your backend uses slightly different paths (for example `/Tasks` instead of `/Task/...`) that file should be updated.

Note that all of this information is available at http://localhost:5000/swagger when the app is running.

## Prerequisites

- Node.js
- npm
- A running backend API reachable at `http://localhost:5000` with the endpoints above. Ensure CORS is enabled on the backend so the React app (`http://localhost:3000`) can call it from the browser.

## Install

1. Open a terminal in the project root (this repository)
2. Install dependencies:

```bash
npm install
```

## Run the app (development)

```bash
npm start
```

This starts the React dev server (create-react-app) and opens the app at `http://localhost:3000` on your default browser.

## Troubleshooting
- If you see CORS errors in the browser console, enable CORS on your backend or run the frontend with a proxy that points to your API.
- If the app shows no tasks, confirm the backend is running and that `GET /Task/GetTasks` returns JSON.
- To change the API base URL or endpoint paths, edit `src/api/tasks.js`.

## Files of interest
- `src/App.js` — main UI wired to the API wrapper
- `src/api/tasks.js` — API helper; adjust endpoints here if needed
