import { useState, useEffect } from "react";
import { Users, UserCheck, UserX, Activity, ArrowRight, Sparkles } from "lucide-react";
import { useApi } from "../hooks/useApi";
import api from "../lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    present: 0,
    absent: 0,
    rate: 0,
  });

  const { execute: fetchEmployees, loading } = useApi(api.getAllEmployees);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const employeesData = await fetchEmployees();
      setEmployees(employeesData);
      
      // Calculate actual attendance for today
      const today = new Date().toISOString().split('T')[0];
      let presentCount = 0;
      let absentCount = 0;

      for (const employee of employeesData) {
        try {
          const attendanceResponse = await api.getAttendance(employee.employee_id);
          const attendanceRecords = attendanceResponse.data;
          
          const todayRecord = attendanceRecords.find(
            record => record.date.split('T')[0] === today
          );

          if (todayRecord) {
            if (todayRecord.status === 'Present') {
              presentCount++;
            } else if (todayRecord.status === 'Absent') {
              absentCount++;
            }
          } else {
            absentCount++;
          }
        } catch (err) {
          absentCount++;
        }
      }

      const attendanceRate = employeesData.length > 0 
        ? Math.round((presentCount / employeesData.length) * 100) 
        : 0;

      setStats({
        total: employeesData.length,
        present: presentCount,
        absent: absentCount,
        rate: attendanceRate,
      });
    } catch (err) {
      console.error("Failed to load data:", err);
    }
  };

  const recentEmployees = employees.slice(0, 5);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8 animate-slide-in">
      {/* Hero Banner */}
      <Card className="relative overflow-hidden border-0 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 z-0" />
        <CardContent className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
              Good morning, Admin
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Here is what's happening today:{" "}
              <span className="font-semibold text-gray-900">{today}</span>
            </p>
          </div>
          <Button asChild size="lg" className="shadow-lg">
            <Link to="/attendance">
              <Sparkles size={18} />
              Mark Attendance
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={stats.total.toString()}
          icon={Users}
          loading={loading}
          colorClass="text-blue-600 bg-blue-100/50"
        />
        <StatCard
          title="Present Today"
          value={stats.present.toString()}
          icon={UserCheck}
          loading={loading}
          colorClass="text-emerald-600 bg-emerald-100/50"
        />
        <StatCard
          title="Absent Today"
          value={stats.absent.toString()}
          icon={UserX}
          loading={loading}
          colorClass="text-rose-600 bg-rose-100/50"
        />
        <StatCard
          title="Attendance Rate"
          value={`${stats.rate}%`}
          icon={Activity}
          loading={loading}
          colorClass="text-purple-600 bg-purple-100/50"
        />
      </div>

      {/* Recent Employees Table */}
      <Card className="shadow-xl">
        <CardHeader className="border-b border-gray-200/50 flex flex-row items-center justify-between space-y-0 pb-6">
          <div>
            <CardTitle className="text-xl">Recent Employees</CardTitle>
            <CardDescription className="mt-1">
              Latest members added to the company
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild className="group">
            <Link to="/employees">
              View All{" "}
              <ArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </Button>
        </CardHeader>

        {loading ? (
          <CardContent className="p-6 flex justify-center">
            <Spinner className="size-8" />
          </CardContent>
        ) : recentEmployees.length === 0 ? (
          <CardContent className="p-12 text-center flex flex-col items-center justify-center">
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
              <Users size={32} className="text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              No employees found
            </h3>
            <p className="text-gray-600 mt-1 mb-6">
              Get started by adding your first employee.
            </p>
            <Button asChild>
              <Link to="/employees">Add Employee</Link>
            </Button>
          </CardContent>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentEmployees.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell className="font-medium text-gray-600">
                      {emp.employee_id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                          {emp.full_name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {emp.full_name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {emp.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {emp.department}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200">
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, loading, colorClass }) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            {loading ? (
              <div className="h-9 w-20 bg-gray-200 rounded-md animate-pulse" />
            ) : (
              <p className="text-3xl font-bold text-gray-900">{value || "0"}</p>
            )}
          </div>
          <div
            className={`p-4 rounded-2xl transition-transform group-hover:scale-110 ${colorClass}`}
          >
            <Icon size={24} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
