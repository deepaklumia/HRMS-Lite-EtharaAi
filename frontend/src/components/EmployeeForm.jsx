import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DEPARTMENTS } from "../constants/departments";

export default function EmployeeForm({
  onSubmit,
  onSuccess,
  onCancel,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
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
    if (!formData.employee_id.trim())
      newErrors.employee_id = "Employee ID is required";
    if (!formData.full_name.trim())
      newErrors.full_name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.department) newErrors.department = "Department is required";
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
        full_name: "",
        email: "",
        department: "",
      });
      setSuccessMsg("Employee added successfully!");
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="employee_id">Employee ID</Label>
          <Input
            id="employee_id"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            placeholder="EMP001"
          />
          {errors.employee_id && (
            <p className="text-sm text-red-600">{errors.employee_id}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="John Doe"
          />
          {errors.full_name && (
            <p className="text-sm text-red-600">{errors.full_name}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Select department</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        {errors.department && (
          <p className="text-sm text-red-600">{errors.department}</p>
        )}
      </div>

      <div className="flex gap-3 justify-end">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading || formLoading}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={loading || formLoading}
          className="min-w-40"
        >
          {formLoading ? "Adding..." : "Add Employee"}
        </Button>
      </div>
    </form>
  );
}
