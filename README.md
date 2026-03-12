# HRMS Application

A full-stack Employee and Attendance Management System with a modern UI.

## 📋 Overview

This is a complete HRMS (Human Resource Management System) application for managing employees and tracking attendance. Built with FastAPI backend and React frontend.

## 🏗️ Project Structure

```
Assigment/
├── backend/           # FastAPI Backend Server
└── frontend/          # React Frontend Application
```

---

## 🔧 Backend (FastAPI)

### Tech Stack
- **Framework**: FastAPI
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Server**: Uvicorn
- **Language**: Python 3.x

### Project Structure
```
backend/
├── app/
│   ├── crud/          # Database operations
│   ├── models/        # SQLAlchemy models
│   ├── routers/       # API route handlers
│   ├── schemas/       # Pydantic schemas
│   ├── database.py    # Database configuration
│   └── main.py        # FastAPI application entry point
├── alembic/           # Database migrations
├── .env               # Environment variables
├── requirements.txt   # Python dependencies
└── alembic.ini        # Alembic configuration
```

### Installation

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables:**
Create a `.env` file with:
```env
DATABASE_URL=postgresql://username:password@host:port/database_name
```

5. **Run database migrations:**
```bash
alembic upgrade head
```

### Running the Backend

**Development mode:**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Access the API:**
- API Base URL: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Alternative Docs: http://localhost:8000/redoc

### API Endpoints

**Base URL:** `/api`

- Employee Management
- Attendance Tracking

### Dependencies
- `fastapi>=0.115.0` - Web framework
- `uvicorn>=0.30.0` - ASGI server
- `sqlalchemy>=2.0.0` - ORM
- `psycopg2-binary>=2.9.0` - PostgreSQL adapter
- `pydantic[email]>=2.8.0` - Data validation
- `python-dotenv` - Environment variables

---

## 🎨 Frontend (React)

### Tech Stack
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Language**: JavaScript (JSX)

### Project Structure
```
frontend/
├── src/
│   ├── assets/        # Static assets
│   ├── components/    # Reusable components
│   │   └── Sidebar.jsx
│   ├── constants/     # Constants and configs
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   │   ├── Employees.jsx
│   │   └── Attendance.jsx
│   ├── App.jsx        # Main application component
│   ├── main.jsx       # Application entry point
│   └── index.css      # Global styles
├── public/            # Public assets
├── index.html         # HTML template
├── package.json       # Dependencies
├── vite.config.js     # Vite configuration
└── tailwind.config.js # Tailwind configuration
```

### Installation

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

### Running the Frontend

**Development mode:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

**Access the Application:**
- Frontend URL: http://localhost:5173

### Features
- **Employee Management**: Add, edit, view, and delete employees
- **Attendance Tracking**: Mark and manage employee attendance
- **Modern UI**: Gradient design with smooth animations
- **Responsive**: Works on desktop and mobile devices

### Key Dependencies
- `react@^19.2.0` - UI library
- `react-dom@^19.2.0` - React DOM renderer
- `axios@^1.7.2` - HTTP client
- `lucide-react@^0.418.0` - Icon library
- `tailwindcss@^3.4.1` - CSS framework
- `vite@^8.0.0-beta.13` - Build tool

---

## 🚀 Running the Full Application

### Step 1: Start Backend
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Step 2: Start Frontend (in a new terminal)
```bash
cd frontend
npm run dev
```

### Step 3: Access the Application
- Frontend (Local): http://localhost:5173
- Backend API (Local): http://localhost:8000
- API Docs (Local): http://localhost:8000/docs

---

## 🌐 Live Deployment

The application is deployed and accessible online:

- **Frontend (Production)**: https://hrms-lite-ethara-ai-theta.vercel.app
- **Backend API (Production)**: https://hrms-api-r81f.onrender.com/api
- **API Documentation**: https://hrms-api-r81f.onrender.com/docs

---

## 🔑 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://username:password@host:port/database_name
```

### Frontend (Optional)
If you need to configure the backend API URL for local development:
```env
VITE_API_URL=http://localhost:8000/api
```

For production, the frontend is configured to use:
```
https://hrms-api-r81f.onrender.com/api
```

---

## 📦 Database Setup

The application uses PostgreSQL. Make sure you have:
1. PostgreSQL installed and running
2. Database created
3. Connection string configured in `.env`

**Create database:**
```sql
CREATE DATABASE hrms_db;
```

---

## 🛠️ Development

### Backend Development
- API routes are in `backend/app/routers/`
- Database models in `backend/app/models/`
- Schemas in `backend/app/schemas/`
- CRUD operations in `backend/app/crud/`

### Frontend Development
- Pages are in `frontend/src/pages/`
- Reusable components in `frontend/src/components/`
- API calls configured with Axios
- Styling with Tailwind CSS

---

## 🐛 Troubleshooting

**Backend Issues:**
- Ensure PostgreSQL is running
- Check DATABASE_URL in `.env`
- Verify all dependencies are installed
- Run migrations: `alembic upgrade head`

**Frontend Issues:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check if backend is running on port 8000
- Verify API endpoint configuration

**CORS Issues:**
- Backend has CORS enabled for all origins
- Check if frontend is making requests to correct backend URL

---

## 🚀 Deployment

### Frontend Deployment (Vercel)
The frontend is deployed on Vercel:
- **URL**: https://hrms-lite-ethara-ai-theta.vercel.app
- **Platform**: Vercel
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Backend Deployment (Render)
The backend is deployed on Render:
- **URL**: https://hrms-api-r81f.onrender.com
- **Platform**: Render
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Database**: PostgreSQL (Render managed)

---

## 📄 License

MIT

---

## 👥 Support

For issues and questions, please open an issue in the repository.
