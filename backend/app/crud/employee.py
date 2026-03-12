# app/crud/employee.py
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status

from ..models.employee import Employee, Attendance
from ..schemas.employee import EmployeeCreate, AttendanceCreate


# ── Employees ────────────────────────────────────────────────

def create_employee(db: Session, employee: EmployeeCreate) -> Employee:
    existing = db.query(Employee).filter(Employee.employee_id == employee.employee_id).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Employee ID already exists"
        )

    db_employee = Employee(
        employee_id=employee.employee_id,
        full_name=employee.full_name,
        email=employee.email,
        department=employee.department,
    )

    try:
        db.add(db_employee)
        db.commit()
        db.refresh(db_employee)
        return db_employee
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email address already exists"
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )


def get_all_employees(db: Session) -> list[Employee]:
    return db.query(Employee).all()


def delete_employee(db: Session, employee_id: str) -> None:
    employee = db.query(Employee).filter(Employee.employee_id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    db.delete(employee)
    db.commit()


# ── Attendance ───────────────────────────────────────────────

def mark_attendance(db: Session, attendance: AttendanceCreate) -> Attendance:
    employee = db.query(Employee).filter(Employee.employee_id == attendance.employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    existing = db.query(Attendance).filter(
        Attendance.employee_id == attendance.employee_id,
        Attendance.date == attendance.date,
    ).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Attendance already marked for {attendance.date}",
        )

    db_attendance = Attendance(
        employee_id=attendance.employee_id,
        date=attendance.date,
        status=attendance.status,
    )

    try:
        db.add(db_attendance)
        db.commit()
        db.refresh(db_attendance)
        return db_attendance
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )


def get_attendance_records(db: Session, employee_id: str) -> list[Attendance]:
    return db.query(Attendance).filter(Attendance.employee_id == employee_id).all()