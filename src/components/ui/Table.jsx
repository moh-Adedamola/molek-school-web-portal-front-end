const Table = ({ 
  headers, 
  data, 
  onRowClick,
  role = 'admin',
  className = '' 
}) => {
  const roleColors = {
    'super-admin': 'bg-blue-800 text-white',
    admin: 'bg-blue-700 text-white',
    teacher: 'bg-emerald-600 text-white',
    parent: 'bg-blue-600 text-white'
  };

  const headerClass = roleColors[role] || roleColors.admin;

  return (
    <div className={`overflow-x-auto rounded-lg border border-gray-200 ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={headerClass}>
          <tr>
            {headers.map((header, index) => (
              <th 
                key={index}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              className={`${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''} transition-colors`}
            >
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data available
        </div>
      )}
    </div>
  );
};

export default Table;