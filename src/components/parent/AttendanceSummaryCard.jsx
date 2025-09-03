// File: src/components/parent/AttendanceSummaryCard.jsx
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const AttendanceSummaryCard = ({ selectedChild, selectedTerm }) => {
  // Mock attendance data
  const attendanceData = {
    totalDays: 65,
    presentDays: 62,
    absentDays: 2,
    lateDays: 1,
    attendanceRate: 95.4,
    monthlyData: [
      { month: 'Sep', present: 20, absent: 0, late: 1, total: 21 },
      { month: 'Oct', present: 22, absent: 1, late: 0, total: 23 },
      { month: 'Nov', present: 20, absent: 1, late: 0, total: 21 }
    ],
    recentAbsences: [
      { date: '2024-11-15', reason: 'Sick leave (Medical certificate provided)' },
      { date: '2024-10-28', reason: 'Family emergency' }
    ]
  };

  const getAttendanceColor = (rate) => {
    if (rate >= 95) return 'text-secondary-600';
    if (rate >= 85) return 'text-accent-600';
    return 'text-error';
  };

  const getAttendanceBgColor = (rate) => {
    if (rate >= 95) return 'bg-secondary-50';
    if (rate >= 85) return 'bg-accent-50';
    return 'bg-red-50';
  };

  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
          <Calendar size={20} className="text-primary-600" />
          Attendance Summary
        </h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getAttendanceBgColor(attendanceData.attendanceRate)} ${getAttendanceColor(attendanceData.attendanceRate)}`}>
          {attendanceData.attendanceRate}%
        </div>
      </div>

      {/* Attendance Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="text-center p-3 bg-neutral-50 rounded-lg">
          <div className="text-lg font-bold text-neutral-800">
            {attendanceData.totalDays}
          </div>
          <div className="text-xs text-neutral-600">Total Days</div>
        </div>
        
        <div className="text-center p-3 bg-secondary-50 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <CheckCircle size={16} className="text-secondary-600" />
            <div className="text-lg font-bold text-secondary-600">
              {attendanceData.presentDays}
            </div>
          </div>
          <div className="text-xs text-secondary-700">Present</div>
        </div>
        
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <XCircle size={16} className="text-error" />
            <div className="text-lg font-bold text-error">
              {attendanceData.absentDays}
            </div>
          </div>
          <div className="text-xs text-red-700">Absent</div>
        </div>
        
        <div className="text-center p-3 bg-accent-50 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock size={16} className="text-accent-600" />
            <div className="text-lg font-bold text-accent-600">
              {attendanceData.lateDays}
            </div>
          </div>
          <div className="text-xs text-accent-700">Late</div>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-neutral-800 mb-3">Monthly Breakdown</h4>
        <div className="space-y-2">
          {attendanceData.monthlyData.map((month, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-neutral-50 rounded-lg">
              <div className="text-sm font-medium text-neutral-800">
                {month.month} 2024
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-secondary-600 rounded-full"></div>
                  <span className="text-xs text-neutral-600">{month.present}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-error rounded-full"></div>
                  <span className="text-xs text-neutral-600">{month.absent}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-accent-600 rounded-full"></div>
                  <span className="text-xs text-neutral-600">{month.late}</span>
                </div>
                <div className="text-sm font-medium text-neutral-800">
                  {((month.present / month.total) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Absences */}
      {attendanceData.recentAbsences.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-neutral-800 mb-3">Recent Absences</h4>
          <div className="space-y-2">
            {attendanceData.recentAbsences.map((absence, index) => (
              <div key={index} className="p-3 bg-red-50 rounded-lg border-l-4 border-error">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="text-sm font-medium text-error">
                    {new Date(absence.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-xs text-red-700">
                    {absence.reason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attendance Goal */}
      <div className="mt-6 pt-4 border-t border-neutral-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-600">Target Attendance Rate</span>
          <span className="font-medium text-secondary-600">95%</span>
        </div>
        <div className="mt-2 bg-neutral-200 rounded-full h-2">
          <div 
            className="bg-secondary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(attendanceData.attendanceRate, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummaryCard;