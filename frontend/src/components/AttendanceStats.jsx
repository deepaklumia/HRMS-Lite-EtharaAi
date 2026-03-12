import { Users, UserCheck, UserX, Calendar } from "lucide-react";

export default function AttendanceStats({ stats = {} }) {
  const { totalPresent = 42, totalAbsent = 8, onLeave = 5, late = 3 } = stats;

  const statCards = [
    {
      label: "Present",
      value: totalPresent,
      icon: UserCheck,
      color: "bg-gradient-to-br from-green-50 to-emerald-100",
      textColor: "text-green-700",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      label: "Absent",
      value: totalAbsent,
      icon: UserX,
      color: "bg-gradient-to-br from-red-50 to-rose-100",
      textColor: "text-red-700",
      iconColor: "text-red-600",
      borderColor: "border-red-200",
    },
    {
      label: "On Leave",
      value: onLeave,
      icon: Calendar,
      color: "bg-gradient-to-br from-amber-50 to-yellow-100",
      textColor: "text-amber-700",
      iconColor: "text-amber-600",
      borderColor: "border-amber-200",
    },
    {
      label: "Late",
      value: late,
      icon: Users,
      color: "bg-gradient-to-br from-blue-50 to-indigo-100",
      textColor: "text-blue-700",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
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
