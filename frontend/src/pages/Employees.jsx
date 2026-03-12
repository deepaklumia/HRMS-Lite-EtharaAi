import { useState, useEffect } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import { useApi } from "../hooks/useApi";
import api from "../lib/api";
import Alert from "../components/ui/Alert";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { UserPlus, Users } from "lucide-react";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    employeeId: null,
    employeeName: "",
  });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const {
    execute: fetchEmployees,
    loading,
    error,
  } = useApi(api.getAllEmployees);
  const { execute: deleteEmp } = useApi(api.deleteEmployee);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to load employees:", err);
    }
  };

  const handleDeleteClick = (employeeId, employeeName) => {
    setConfirmDialog({
      isOpen: true,
      employeeId,
      employeeName,
    });
  };

  const handleConfirmDelete = async () => {
    const { employeeId } = confirmDialog;
    setDeleteLoading(true);
    try {
      await deleteEmp(employeeId);
      setEmployees(employees.filter((e) => e.employee_id !== employeeId));
      setSuccessMsg("Employee deleted successfully!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      setSuccessMsg("");
    } finally {
      setConfirmDialog({ isOpen: false, employeeId: null, employeeName: "" });
      setDeleteLoading(false);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingId(null);
    setSuccessMsg("Employee added successfully!");
    loadEmployees();
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleFormSubmit = async (formData) => {
    const result = await api.createEmployee(formData);
    return result;
  };

  return (
    <div className="space-y-6">
      {error && <Alert type="error" message={error} />}
      {successMsg && <Alert type="success" message={successMsg} />}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Employee"
        message={`Are you sure you want to delete "${confirmDialog.employeeName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setConfirmDialog({
            isOpen: false,
            employeeId: null,
            employeeName: "",
          })
        }
      />

      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <Users size={28} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
              Employees
            </h2>
          </div>
          <p className="text-gray-600 ml-14">
            Manage your company's workforce efficiently
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:via-indigo-700 hover:to-purple-700 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl active:shadow-md flex items-center gap-2 transform hover:-translate-y-0.5"
        >
          {showForm ? (
            <>
              <span className="text-lg">✕</span> Cancel
            </>
          ) : (
            <>
              <UserPlus size={20} /> Add Employee
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 animate-slide-in">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <UserPlus size={24} className="text-indigo-600" />
            Add New Employee
          </h3>
          <EmployeeForm
            onSubmit={handleFormSubmit}
            onSuccess={handleFormSuccess}
            onCancel={() => setShowForm(false)}
            editingId={editingId}
          />
        </div>
      )}

      {loading ? (
        <div className="py-20">
          <LoadingSpinner />
        </div>
      ) : employees.length === 0 ? (
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border-2 border-dashed border-indigo-300 p-20 text-center shadow-xl">
          <div className="text-7xl mb-6 animate-bounce">👥</div>
          <p className="text-gray-800 text-2xl font-bold mb-3">
            No employees found
          </p>
          <p className="text-gray-600 mb-8 text-lg">
            Create your first employee to get started
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            <UserPlus size={20} /> Create Employee
          </button>
        </div>
      ) : (
        <EmployeeList
          employees={employees}
          onDelete={(id, name) => handleDeleteClick(id, name)}
        />
      )}
    </div>
  );
}
