export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 p-6 hover:-translate-y-1 ${className}`}
    >
      {children}
    </div>
  );
}
