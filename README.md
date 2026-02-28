# Department Performance Management System

A local full-stack application you can run on a laptop to track department performance, log deviations, and document corrective actions with person initials.

## Departments Included

The seeded system includes the 10 departments you requested:

1. Final Assembly
2. Make and Pack
3. Wash and Pack
4. Pick and Pack
5. Inbound
6. Commissary International
7. Commissary Domestic
8. Warehouse and Receiving
9. Hot Kitchen
10. Central Recipe Assembly

## Main Features

- Department-based task tracking
- Deviation log per department
- Corrective action log with:
  - action description
  - owner
  - due date
  - status
  - **performed-by initials**
- KPI dashboard and CSV exports
- Local authentication

## Tech Stack

- Backend: FastAPI + SQLite
- Frontend: React + Vite

## Run Locally (Development)

### 1) Backend

```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
# source .venv/bin/activate
pip install -r requirements.txt
python -m scripts.seed
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Open: `http://localhost:5173`

## Login (Seed Users)

- `qa1 / qa123`
- `lead1 / lead123`
- `staff1 / staff123`
- `staff2 / staff123`

## How to Use for Your Workflow

1. Go to **Data Entry** to create daily records.
2. Go to **Deviations**:
   - Create a deviation and choose the department.
   - Add corrective action with **initials** of the person who performed the action.
3. Go to **Dashboard** and **Reports** for performance review and export.

## Build for Laptop Installation (Windows)

You already have Python, VS Code, and Inno Setup. Use this flow:

1. Build frontend files:
   ```bash
   cd frontend
   npm install
   npm run build
   ```
2. (Optional) Package backend with PyInstaller into a single executable.
3. Use Inno Setup to include backend executable + frontend build and create installer.

> This repository is ready for local use now. If you want, I can next generate a full PyInstaller + Inno Setup script set for one-click installation/startup.
