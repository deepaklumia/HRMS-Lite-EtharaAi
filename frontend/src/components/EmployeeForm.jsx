import { useState } from "react";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Button from "./ui/Button";
import Alert from "./ui/Alert";
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
      {successMsg && <Alert type="success" message={successMsg} />}
      {errors.submit && <Alert type="error" message={errors.submit} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Employee ID"
          name="employee_id"
          value={formData.employee_id}
          onChange={handleChange}
          error={errors.employee_id}
          placeholder="EMP001"
        />
        <Input
          label="Full Name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          error={errors.full_name}
          placeholder="John Doe"
        />
      </div>

      <Input
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="john@example.com"
      />

      <Select
        label="Department"
        name="department"
        value={formData.department}
        onChange={handleChange}
        error={errors.department}
        options={DEPARTMENTS.map((dept) => ({ value: dept, label: dept }))}
      />

      <div className="flex gap-3 justify-end">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
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
