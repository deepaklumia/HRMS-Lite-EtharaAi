import { Trash2 } from "lucide-react";
import Table from "./ui/Table";
import Button from "./ui/Button";

export default function EmployeeList({ employees, onDelete, loading = false }) {
  const columns = [
    { key: "employee_id", label: "ID" },
    { key: "full_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "department", label: "Department" },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(row.employee_id, row.full_name)}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <Trash2 size={16} />
          Delete
        </Button>
      ),
    },
  ];

  if (!employees || employees.length === 0) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border-2 border-dashed border-indigo-300 p-16 text-center shadow-xl">
        <div className="text-6xl mb-4 animate-bounce">👥</div>
        <p className="text-gray-800 text-xl font-bold mb-2">
          No employees in the system
        </p>
        <p className="text-gray-600 mb-6">
          Start by adding your first employee to the system
        </p>
      </div>
    );
  }

  return <Table columns={columns} data={employees} />;
}
