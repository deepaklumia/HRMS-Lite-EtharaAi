export default function Input({ label, error, className = "", ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:shadow-lg ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-400"
            : "border-gray-200 focus:border-indigo-500 hover:border-gray-300"
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm font-medium text-red-600 mt-2 flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
}
