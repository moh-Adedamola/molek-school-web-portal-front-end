const Table = ({ 
  children, 
  className = '',
  striped = true,
  hover = true,
  responsive = true,
}) => {
  const baseClasses = 'w-full text-sm text-left';
  const responsiveClasses = responsive ? 'overflow-x-auto' : '';
  
  const tableClasses = `${baseClasses} ${className}`;
  
  return (
    <div className={`${responsiveClasses} rounded-lg border border-neutral-200 bg-white`}>
      <table className={tableClasses}>
        {children}
      </table>
    </div>
  );
};

const TableHeader = ({ children, className = '' }) => (
  <thead className={`bg-primary-600 text-white ${className}`}>
    {children}
  </thead>
);

const TableBody = ({ children, className = '', striped = true, hover = true }) => {
  const stripedClasses = striped ? '[&>tr:nth-child(even)]:bg-neutral-50' : '';
  const hoverClasses = hover ? '[&>tr:hover]:bg-neutral-100' : '';
  
  return (
    <tbody className={`divide-y divide-neutral-200 ${stripedClasses} ${hoverClasses} ${className}`}>
      {children}
    </tbody>
  );
};

const TableRow = ({ children, className = '', variant = 'default' }) => {
  const variants = {
    default: '',
    success: 'bg-secondary-50 hover:bg-secondary-100',
    warning: 'bg-accent-50 hover:bg-accent-100',
    error: 'bg-red-50 hover:bg-red-100',
  };
  
  return (
    <tr className={`${variants[variant]} ${className}`}>
      {children}
    </tr>
  );
};

const TableHead = ({ children, className = '', sortable = false, sortDirection }) => {
  const baseClasses = 'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider';
  const sortableClasses = sortable ? 'cursor-pointer select-none hover:bg-primary-700' : '';
  
  return (
    <th className={`${baseClasses} ${sortableClasses} ${className}`}>
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortable && (
          <span className="ml-2">
            {sortDirection === 'asc' ? '↑' : sortDirection === 'desc' ? '↓' : '↕'}
          </span>
        )}
      </div>
    </th>
  );
};

const TableCell = ({ children, className = '', align = 'left' }) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  return (
    <td className={`px-6 py-4 whitespace-nowrap text-neutral-900 ${alignClasses[align]} ${className}`}>
      {children}
    </td>
  );
};

const TableCaption = ({ children, className = '' }) => (
  <caption className={`py-4 text-sm text-neutral-600 ${className}`}>
    {children}
  </caption>
);

// Empty state component
const TableEmpty = ({ message = "No data available", className = '' }) => (
  <TableRow>
    <TableCell className={`text-center py-12 text-neutral-500 italic ${className}`} colSpan="100%">
      {message}
    </TableCell>
  </TableRow>
);

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;
Table.Caption = TableCaption;
Table.Empty = TableEmpty;

export default Table;