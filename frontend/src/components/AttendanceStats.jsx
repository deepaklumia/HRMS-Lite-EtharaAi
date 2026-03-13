import { useState, useEffect } from "react";
import { Users, UserCheck, UserX, Calendar } from "lucide-react";
import api from "../lib/api";

export default function AttendanceStats() {
  const [stats, setStats] = useState({
    totalPresent: 0,
    totalAbsent: 0,
    totalEmployees: 0,
    loading: true,
  });

  useEffect(() => {
    fetchAttendanceStats();
  }, []);

  const fetchAttendanceStats = async () => {
    try {
      const response = await api.getAllEmployees();
      const employees = response.data;
      
      const today = new Date().toISOString().split('T')[0];
      let presentCount = 0;
      let absentCount = 0;

      for (const employee of employees) {
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

      setStats({
        totalPresent: presentCount,
        totalAbsent: absentCount,
        totalEmployees: employees.length,
        loading: false,
      });
    } catch (error) {
      console.error('Failed to fetch attendance stats:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  const statCards = [
    {
      label: "Present",
      value: stats.loading ? "..." : stats.totalPresent,
      icon: UserCheck,
      color: "bg-gradient-to-br from-green-50 to-emerald-100",
      textColor: "text-green-700",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      label: "Absent",
      value: stats.loading ? "..." : stats.totalAbsent,
      icon: UserX,
      color: "bg-gradient-to-br from-red-50 to-rose-100",
      textColor: "text-red-700",
      iconColor: "text-red-600",
      borderColor: "border-red-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`${stat.color} rounded-2xl p-6 border-2 ${stat.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className={`text-sm font-semibold ${stat.textColor} mb-2 uppercase tracking-wide`}>
                  {stat.label} Today
                </p>
                <p className={`text-4xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
              <div
                className={`p-3 rounded-xl bg-white/50 backdrop-blur-sm shadow-md`}
              >
                <Icon size={28} className={stat.iconColor} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
