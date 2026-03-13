import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function EmployeeList({ employees, onDelete, loading = false }) {
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

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell className="font-medium">{emp.employee_id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {emp.full_name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <span className="font-semibold">{emp.full_name}</span>
                </div>
              </TableCell>
              <TableCell className="text-gray-600">{emp.email}</TableCell>
              <TableCell>
                <Badge variant="secondary">{emp.department}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(emp.employee_id, emp.full_name)}
                  disabled={loading}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
