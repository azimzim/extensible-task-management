# Extensible Task Management Platform

Full‑stack task management system built as a technical assignment.  
The system demonstrates clean architecture, extensible workflow rules, and separation between generic task handling and task‑type‑specific logic.

---

## Project Structure

This repository contains **both backend and frontend**:

```
.
├─ backend/
│  ├─ src/
│  │  ├─ domain/
│  │  │  └─ task/
│  │  │     ├─ Task.entity.ts
│  │  │     └─ TaskTypes/
│  │  │        ├─ TaskType.ts
│  │  │        ├─ ProcurementTaskType.ts
│  │  │        └─ DevelopmentTaskType.ts
│  │  ├─ infra/
│  │  │  └─ db.ts
│  │  ├─ scripts/
│  │  │  └─ seed/
│  │  │     └─ seed.ts
│  │  └─ index.ts
│  └─ package.json
│
└─ client/
   └─ (React + Vite frontend)
```

---

## Architecture Overview

### Backend
- **Node.js + TypeScript**
- **Express**
- **TypeORM**
- **PostgreSQL**
- Clean separation between:
  - Generic task workflow logic
  - Task‑type‑specific rules (via `TaskType` implementations)

Each task type defines:
- Valid status range
- Final status
- Required custom fields per status

This allows adding new task types without changing existing workflow logic.

### Frontend
- **React**
- **Vite**
- Runs independently from the backend
- Uses a hard‑coded user ID (as allowed by the assignment)

---

## Database

### Schema
- Single generic `Task` table
- No `User` table (users are represented by numeric IDs only, per assignment instructions)

### Migrations
- TypeORM migrations are included as a baseline
- Schema is defined via entities
- Migrations enable reproducible database setup

### Seed Data
A seed script inserts demo tasks in different lifecycle stages, including tasks with required custom data.

---

## Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL
- npm

---

## Backend Setup

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure database
Create a PostgreSQL database and update connection details in:

```
backend/src/infra/db.ts
```

### 3. Run migrations
```bash
npm run migration:run
```

(If migrations are empty, this step will complete with no changes — this is expected.)

### 4. Seed demo data
```bash
npm run seed
```

This will insert demo tasks with different statuses and custom data.

### 5. Start the server
```bash
npm run dev
```

Backend will run on:
```
http://localhost:3000
```

---

## Frontend Setup

### 1. Install dependencies
```bash
cd client
npm install
```

### 2. Start the client
```bash
npm run dev
```

Frontend will run on:
```
http://localhost:5173
```

---

## Demo Behavior

- Tasks are assigned using numeric user IDs
- Workflow transitions are validated per task type
- Custom fields are enforced per status using task‑type logic
- No authentication or user management (intentionally simplified)

---

## Key Design Decisions

- **Extensible task types** without conditional branching
- **Single generic Task entity**
- **Task‑type‑specific rules encapsulated in classes**
- **JSON custom data** for flexible, future‑proof extensions

---

## Notes

This project focuses on architecture clarity, extensibility, and correctness rather than UI completeness or authentication flows.

---

## Author

Ariel Zimmer

Technical assignment submission.
