import { useState, useEffect } from "react";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";
import AttendanceStats from "../components/AttendanceStats";
import { useApi } from "../hooks/useApi";
import api from "../lib/api";
import Alert from "../components/ui/Alert";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { CalendarCheck, ClipboardList } from "lucide-react";

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  const { execute: fetchEmployees } = useApi(api.getAllEmployees);
  const {
    execute: fetchAttendance,
    loading,
    error,
  } = useApi(() =>
    selectedEmployeeId
      ? api.getAttendance(selectedEmployeeId)
      : Promise.resolve([]),
  );

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployeeId) {
      loadAttendance();
    }
  }, [selectedEmployeeId]);

  const loadEmployees = async () => {
    try {
      const data = await fetchEmployees();
      setEmployees(data);
      if (data.length > 0) {
        setSelectedEmployeeId(data[0].employee_id);
      }
    } catch (err) {
      console.error("Failed to load employees:", err);
    }
  };

  const loadAttendance = async () => {
    try {
      const data = await fetchAttendance();
      setAttendance(data);
    } catch (err) {
      console.error("Failed to load attendance:", err);
    }
  };

  const handleMarkSubmit = async (formData) => {
    const result = await api.markAttendance(formData);
    return result;
  };

  const handleMarkSuccess = () => {
    setSuccessMsg("Attendance marked successfully!");
    loadAttendance();
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className="space-y-8">
      {error && <Alert type="error" message={error} />}
      {successMsg && <Alert type="success" message={successMsg} />}

      {/* Page Header */}
      <div className="mb-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
            <CalendarCheck size={28} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
            Attendance Management
          </h2>
        </div>
        <p className="text-gray-600 ml-14">
          Track and manage employee attendance records with detailed insights
        </p>
      </div>

      {/* Today's Attendance Stats */}
      <AttendanceStats
        stats={{
          totalPresent: 42,
          totalAbsent: 8,
          onLeave: 5,
          late: 3,
        }}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mark Attendance Card */}
        <div className="lg:col-span-1">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 h-fit sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ClipboardList size={24} className="text-indigo-600" />
              Mark Attendance
            </h3>
            <AttendanceForm
              onSubmit={handleMarkSubmit}
              onSuccess={handleMarkSuccess}
              employees={employees}
            />
          </div>
        </div>

        {/* Attendance Records Card */}
        <div className="lg:col-span-2">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                🔍 Select Employee to View Records
              </label>
              <select
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium bg-white hover:border-gray-300 transition-all duration-200 cursor-pointer"
              >
                <option value="">-- Choose an employee --</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.employee_id}>
                    {emp.full_name} ({emp.employee_id})
                  </option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="py-12">
                <LoadingSpinner />
              </div>
            ) : attendance.length === 0 ? (
              <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border-2 border-dashed border-indigo-300 py-20 text-center shadow-lg">
                <div className="text-6xl mb-4">📅</div>
                <p className="text-gray-800 font-bold text-lg mb-2">
                  No attendance records found
                </p>
                <p className="text-gray-600">
                  Select an employee to view their attendance history
                </p>
              </div>
            ) : (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                  Attendance History
                </h4>
                <AttendanceTable records={attendance} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
