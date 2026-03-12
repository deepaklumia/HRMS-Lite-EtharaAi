import Table from "./ui/Table";

export default function AttendanceTable({ records = [] }) {
  const columns = [
    { key: "employee_id", label: "Employee ID" },
    { key: "date", label: "Date" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            row.status === "Present"
              ? "bg-green-100 text-green-800"
              : row.status === "Absent"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  if (!records || records.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No attendance records found.</p>
      </div>
    );
  }

  return <Table columns={columns} data={records} />;
}
