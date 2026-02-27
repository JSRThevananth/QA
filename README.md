# Sanitation Team Performance Measuring Program

A local full-stack application for food catering plants to record sanitation operations, verification checks, deviations/CAPA, and KPI performance.

## Proposed Project Structure

```text
.
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   ├── scripts/
│   │   └── seed.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── styles.css
│       ├── components/Layout.jsx
│       ├── pages/
│       │   ├── DashboardPage.jsx
│       │   ├── DataEntryPage.jsx
│       │   ├── DeviationsPage.jsx
│       │   ├── LoginPage.jsx
│       │   └── ReportsPage.jsx
│       └── services/api.js
├── .gitignore
└── README.md
```

## Database Schema (SQLite)

- `users`: login and ownership metadata (`role`, `team`, `supervisor`)
- `areas`: sanitation zones and threshold configuration (ATP/TPC/chemical/allergen toggle)
- `shifts`: shift windows
- `sanitation_tasks`: planned vs actual execution, area/shift/staff links, status and compliance flags
- `verification_checks`: visual/ATP/TPC outcomes + numeric values
- `deviations`: nonconformances with severity and repeat flag
- `corrective_actions`: CAPA ownership, due/closed dates, status

Relationships:
- `sanitation_tasks.staff_id -> users.id`
- `sanitation_tasks.area_id -> areas.id`
- `sanitation_tasks.shift_id -> shifts.id`
- `verification_checks.task_id -> sanitation_tasks.id`
- `deviations.task_id -> sanitation_tasks.id`
- `corrective_actions.deviation_id -> deviations.id`
- `corrective_actions.owner_id -> users.id`

## Features Implemented

- Simple local authentication (`/auth/login`)
- Data entry for sanitation tasks and verification checks
- Deviation logging and CAPA creation
- KPI dashboard with filters:
  - Pre-Op pass rate
  - ATP pass rate
  - Reclean rate
  - On-time completion
  - Deviation count
  - Average CAPA closure time
  - Repeat deviation rate
  - Chemical compliance
  - Allergen changeover pass rate (toggle)
  - Audit readiness score (weighted)
- CSV exports for raw tables and KPI summary
- Seed/demo data script

## API Routes

- `POST /auth/login`
- `GET /users`, `GET /areas`, `GET /shifts`
- `POST /tasks`, `GET /tasks`
- `POST /verifications`, `GET /verifications`
- `POST /deviations`, `GET /deviations`
- `POST /corrective-actions`, `GET /corrective-actions`
- `GET /kpis`
- `GET /exports/{tasks|verifications|deviations|corrective_actions}`
- `GET /exports/kpi-summary`

## Run Locally

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m scripts.seed
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000`.

Seed users:
- `qa1 / qa123`
- `lead1 / lead123`
- `staff1 / staff123`
- `staff2 / staff123`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Notes

- SQLite DB file is created at `backend/sanitation.db`.
- This is intended for local/demo use; auth is basic and not production hardened.
