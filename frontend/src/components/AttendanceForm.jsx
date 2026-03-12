import { useState } from "react";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Button from "./ui/Button";
import Alert from "./ui/Alert";
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
      {successMsg && <Alert type="success" message={successMsg} />}
      {errors.submit && <Alert type="error" message={errors.submit} />}

      <Select
        label="Employee"
        name="employee_id"
        value={formData.employee_id}
        onChange={handleChange}
        error={errors.employee_id}
        options={
          employees?.map((emp) => ({
            value: emp.employee_id,
            label: `${emp.full_name} (${emp.employee_id})`,
          })) || []
        }
      />

      <Input
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        error={errors.date}
      />

      <Select
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        error={errors.status}
        options={ATTENDANCE_STATUS.map((status) => ({
          value: status,
          label: status,
        }))}
      />

      <Button type="submit" disabled={loading || formLoading}>
        {formLoading ? "Marking..." : "Mark Attendance"}
      </Button>
    </form>
  );
}
