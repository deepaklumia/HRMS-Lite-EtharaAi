export default function Table({ columns, data, className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border-2 border-purple-200/50 shadow-2xl bg-white/90 backdrop-blur-sm ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-purple-200 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100">
            {data?.map((row, idx) => (
              <tr key={idx} className="hover:bg-gradient-to-r hover:from-purple-50 hover:via-pink-50 hover:to-orange-50 transition-all duration-150 group">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-4 text-sm text-gray-700 font-medium"
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
