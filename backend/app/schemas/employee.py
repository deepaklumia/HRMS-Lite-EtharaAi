# app/schemas/employee.py
from pydantic import BaseModel, EmailStr, ConfigDict, Field
from typing import Literal
from datetime import date


class EmployeeCreate(BaseModel):
    employee_id: str = Field(..., min_length=1, max_length=50)
    full_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    department: str = Field(..., min_length=1, max_length=50)

    model_config = ConfigDict(from_attributes=True)


class EmployeeResponse(EmployeeCreate):
    pass


class AttendanceCreate(BaseModel):
    employee_id: str
    date: date
    status: Literal["Present", "Absent"]

    model_config = ConfigDict(from_attributes=True)


class AttendanceResponse(BaseModel):
    id: int
    employee_id: str
    date: date
    status: str

    model_config = ConfigDict(from_attributes=True)