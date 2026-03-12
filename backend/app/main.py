# app/main.py
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
from .routers import employee_router  # ← we'll create this next

# Create tables (only for dev / initial setup – prefer Alembic in production)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Employee & Attendance Management API",
    description="RESTful API built with FastAPI + PostgreSQL",
    version="1.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(employee_router, prefix="/api", tags=["employees & attendance"])


# Global exception handlers (optional – can move to separate file later)
@app.exception_handler(Exception)
async def general_exception_handler(request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )