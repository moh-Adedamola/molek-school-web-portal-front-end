const StatsCard = ({ label, value, color = "primary", icon }) => {
  const colorClasses = {
    primary: {
      bg: "bg-primary-50",
      border: "border-primary-200",
      text: "text-primary-800",
      value: "text-primary-600",
      icon: "bg-primary-600"
    },
    secondary: {
      bg: "bg-secondary-50",
      border: "border-secondary-200", 
      text: "text-secondary-800",
      value: "text-secondary-600",
      icon: "bg-secondary-600"
    },
    accent: {
      bg: "bg-accent-50",
      border: "border-accent-200",
      text: "text-accent-800", 
      value: "text-accent-600",
      icon: "bg-accent-600"
    }
  };

  const classes = colorClasses[color];

  return (
    <div className={`${classes.bg} ${classes.border} border-2 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-200`}>
      {icon && (
        <div className={`w-12 h-12 ${classes.icon} rounded-xl flex items-center justify-center mx-auto mb-4`}>
          <span className="text-white text-xl">{icon}</span>
        </div>
      )}
      <div className={`text-3xl font-bold ${classes.value} mb-2`}>
        {value}
      </div>
      <div className={`text-sm font-medium ${classes.text} uppercase tracking-wide`}>
        {label}
      </div>
    </div>
  );
};

export default StatsCard;