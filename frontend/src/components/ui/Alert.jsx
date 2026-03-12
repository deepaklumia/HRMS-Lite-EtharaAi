export default function Alert({ type = "info", message, className = "" }) {
  const config = {
    info: {
      bg: "bg-blue-50",
      border: "border-blue-400",
      text: "text-blue-800",
      icon: "ℹ️",
    },
    success: {
      bg: "bg-green-50",
      border: "border-green-400",
      text: "text-green-800",
      icon: "✅",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-400",
      text: "text-yellow-800",
      icon: "⚠️",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-400",
      text: "text-red-800",
      icon: "❌",
    },
  };

  const { bg, border, text, icon } = config[type];

  return (
    <div
      className={`border-2 rounded-xl p-4 flex items-center gap-3 ${bg} ${border} ${text} ${className} shadow-lg animate-slide-in backdrop-blur-sm`}
    >
      <span className="text-xl flex-shrink-0">{icon}</span>
      <p className="font-semibold text-sm">{message}</p>
    </div>
  );
}
