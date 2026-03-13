import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ATTENDANCE_STATUS } from "../constants/departments";

export default function AttendanceForm({
  employees,
  onSubmit,
  onSuccess,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    employee_id: "",
    date: new Date().toISOString().split("T")[0],
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.employee_id) newErrors.employee_id = "Employee is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.status) newErrors.status = "Status is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormLoading(true);
    try {
      const result = await onSubmit(formData);
      setFormData({
        employee_id: "",
        date: new Date().toISOString().split("T")[0],
        status: "",
      });
      setSuccessMsg("Attendance marked successfully!");
      setTimeout(() => {
        setSuccessMsg("");
        if (onSuccess) onSuccess(result);
      }, 1500);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {successMsg && (
        <Alert className="bg-emerald-50 text-emerald-900 border-emerald-200">
          <AlertDescription>{successMsg}</AlertDescription>
        </Alert>
      )}
      {errors.submit && (
        <Alert variant="destructive">
          <AlertDescription>{errors.submit}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="employee_id">Employee</Label>
        <select
          id="employee_id"
          name="employee_id"
          value={formData.employee_id}
          onChange={handleChange}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Select employee</option>
          {employees?.map((emp) => (
            <option key={emp.employee_id} value={emp.employee_id}>
              {emp.full_name} ({emp.employee_id})
            </option>
          ))}
        </select>
        {errors.employee_id && (
          <p className="text-sm text-red-600">{errors.employee_id}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />
        {errors.date && (
          <p className="text-sm text-red-600">{errors.date}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Select status</option>
          {ATTENDANCE_STATUS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {errors.status && (
          <p className="text-sm text-red-600">{errors.status}</p>
        )}
      </div>

      <Button type="submit" disabled={loading || formLoading}>
        {formLoading ? "Marking..." : "Mark Attendance"}
      </Button>
    </form>
  );
}
