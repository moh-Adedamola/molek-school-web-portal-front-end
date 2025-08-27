const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variants = {
    // Status colors for Nigerian school context
    present: 'bg-secondary-600 text-white',      // Green - student present
    absent: 'bg-red-600 text-white',             // Red - student absent
    late: 'bg-accent-600 text-white',            // Gold - student late
    
    // Grade performance
    excellent: 'bg-secondary-600 text-white',    // Green - excellent grade
    good: 'bg-primary-600 text-white',           // Blue - good grade
    average: 'bg-accent-600 text-white',         // Gold - average grade
    poor: 'bg-red-600 text-white',               // Red - poor grade
    
    // Payment status
    paid: 'bg-secondary-600 text-white',         // Green - fees paid
    pending: 'bg-accent-600 text-white',         // Gold - fees pending
    overdue: 'bg-red-600 text-white',            // Red - fees overdue
    
    // General variants
    default: 'bg-neutral-100 text-neutral-800 border border-neutral-300',
    primary: 'bg-primary-100 text-primary-800 border border-primary-200',
    secondary: 'bg-secondary-100 text-secondary-800 border border-secondary-200',
    accent: 'bg-accent-100 text-accent-800 border border-accent-200',
    success: 'bg-green-100 text-green-800 border border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    error: 'bg-red-100 text-red-800 border border-red-200',
    info: 'bg-blue-100 text-blue-800 border border-blue-200',
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1 text-sm',
    xl: 'px-4 py-1.5 text-base',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

// Predefined badge components for common school scenarios
const AttendanceBadge = ({ status, ...props }) => {
  const statusMap = {
    present: { variant: 'present', text: 'Present' },
    absent: { variant: 'absent', text: 'Absent' },
    late: { variant: 'late', text: 'Late' },
  };

  const config = statusMap[status] || statusMap.present;
  
  return (
    <Badge variant={config.variant} {...props}>
      {config.text}
    </Badge>
  );
};

const GradeBadge = ({ performance, ...props }) => {
  const performanceMap = {
    excellent: { variant: 'excellent', text: 'Excellent' },
    good: { variant: 'good', text: 'Good' },
    average: { variant: 'average', text: 'Average' },
    poor: { variant: 'poor', text: 'Needs Improvement' },
  };

  const config = performanceMap[performance] || performanceMap.average;
  
  return (
    <Badge variant={config.variant} {...props}>
      {config.text}
    </Badge>
  );
};

const PaymentBadge = ({ status, ...props }) => {
  const statusMap = {
    paid: { variant: 'paid', text: 'Paid' },
    pending: { variant: 'pending', text: 'Pending' },
    overdue: { variant: 'overdue', text: 'Overdue' },
  };

  const config = statusMap[status] || statusMap.pending;
  
  return (
    <Badge variant={config.variant} {...props}>
      {config.text}
    </Badge>
  );
};

Badge.Attendance = AttendanceBadge;
Badge.Grade = GradeBadge;
Badge.Payment = PaymentBadge;

export default Badge;