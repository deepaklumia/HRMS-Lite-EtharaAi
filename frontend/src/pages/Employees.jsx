import { useState, useEffect } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import { useApi } from "../hooks/useApi";
import api from "../lib/api";
import { UserPlus, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {successMsg && (
        <Alert className="bg-emerald-50 text-emerald-900 border-emerald-200">
          <AlertDescription>{successMsg}</AlertDescription>
        </Alert>
      )}

      <AlertDialog open={confirmDialog.isOpen} onOpenChange={(open) => !open && setConfirmDialog({ isOpen: false, employeeId: null, employeeName: "" })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Employee</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{confirmDialog.employeeName}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                <Users size={28} className="text-white" />
              </div>
              <CardTitle className="text-4xl">
                Employees
              </CardTitle>
            </div>
            <CardDescription className="ml-14">
              Manage your company's workforce efficiently
            </CardDescription>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            size="lg"
            className="shadow-lg"
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
          </Button>
        </CardHeader>
      </Card>

      {showForm && (
        <Card className="shadow-xl animate-slide-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus size={24} className="text-indigo-600" />
              Add New Employee
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EmployeeForm
              onSubmit={handleFormSubmit}
              onSuccess={handleFormSuccess}
              onCancel={() => setShowForm(false)}
              editingId={editingId}
            />
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="py-20 flex justify-center">
          <Spinner className="size-8" />
        </div>
      ) : employees.length === 0 ? (
        <Card className="shadow-xl">
          <CardContent className="p-20 text-center">
            <div className="text-7xl mb-6 animate-bounce">👥</div>
            <CardTitle className="text-2xl mb-3">
              No employees found
            </CardTitle>
            <CardDescription className="mb-8 text-lg">
              Create your first employee to get started
            </CardDescription>
            <Button
              onClick={() => setShowForm(true)}
              size="lg"
              className="shadow-lg"
            >
              <UserPlus size={20} /> Create Employee
            </Button>
          </CardContent>
        </Card>
      ) : (
        <EmployeeList
          employees={employees}
          onDelete={(id, name) => handleDeleteClick(id, name)}
        />
      )}
    </div>
  );
}
