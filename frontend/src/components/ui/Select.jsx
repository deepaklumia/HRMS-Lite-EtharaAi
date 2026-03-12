export default function Select({
  label,
  options,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-gray-300 cursor-pointer ${error ? "border-red-400 focus:border-red-500 focus:ring-red-400" : "border-gray-200"} ${className}`}
        {...props}
      >
        <option value="" className="text-gray-500">Select an option</option>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm font-medium text-red-600 mt-2 flex items-center gap-1"><span>⚠️</span> {error}</p>}
    </div>
  );
}
