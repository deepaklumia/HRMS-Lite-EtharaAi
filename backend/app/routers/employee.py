# app/routers/employee.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..schemas.employee import (
    EmployeeCreate,
    EmployeeResponse,
    AttendanceCreate,
    AttendanceResponse,
)
from ..crud.employee import (
    create_employee,
    get_all_employees,
    delete_employee,
    mark_attendance,
    get_attendance_records,
)

router = APIRouter()


@router.post("/employees", response_model=EmployeeResponse, status_code=status.HTTP_201_CREATED)
def create_employee_endpoint(employee: EmployeeCreate, db: Session = Depends(get_db)):
    return create_employee(db, employee)


@router.get("/employees", response_model=List[EmployeeResponse])
def get_all_employees_endpoint(db: Session = Depends(get_db)):
    return get_all_employees(db)


@router.delete("/employees/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_employee_endpoint(employee_id: str, db: Session = Depends(get_db)):
    delete_employee(db, employee_id)
    return None


@router.post("/attendance", response_model=AttendanceResponse, status_code=status.HTTP_201_CREATED)
def mark_attendance_endpoint(attendance: AttendanceCreate, db: Session = Depends(get_db)):
    return mark_attendance(db, attendance)


@router.get("/attendance/{employee_id}", response_model=List[AttendanceResponse])
def get_attendance_records_endpoint(employee_id: str, db: Session = Depends(get_db)):
    records = get_attendance_records(db, employee_id)
    return records