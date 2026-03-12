import axios from 'axios';

const API = axios.create({
  baseURL: 'https://hrms-api-r81f.onrender.com/api',
  timeout: 10000,
});

export const api = {
  // Employees
  getAllEmployees: () => API.get('/employees'),
  createEmployee: (data) => API.post('/employees', data),
  deleteEmployee: (id) => API.delete(`/employees/${id}`),

  // Attendance
  getAttendance: (empId) => API.get(`/attendance/${empId}`),
  markAttendance: (data) => API.post('/attendance', data),
};

export default api;
