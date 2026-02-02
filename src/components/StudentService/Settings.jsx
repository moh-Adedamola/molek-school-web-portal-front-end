/**
 * Student Settings Component
 * Handles profile updates, password changes, and MOLEK report card downloads
 */

import { useState, useCallback, useEffect } from 'react';
import { useStudentAuth } from '../../context/StudentAuthContext';
import { 
    updateStudentProfile, 
    changeStudentPassword, 
    getStudentReportCard,
    getAcademicSessions,
    getTerms 
} from '../../service/studentApi';
import logo from '/logo.webp';

const Settings = () => {
    const { student, refreshStudent } = useStudentAuth();

    // Profile update state
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [email, setEmail] = useState(student?.email || '');
    const [phoneNumber, setPhoneNumber] = useState(student?.phone_number || '');
    const [address, setAddress] = useState(student?.address || '');

    // Password change state
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);

    // Report download state
    const [sessions, setSessions] = useState([]);
    const [terms, setTerms] = useState([]);
    const [selectedSession, setSelectedSession] = useState('');
    const [selectedTerm, setSelectedTerm] = useState('');
    const [reportType, setReportType] = useState('term'); // 'term' or 'session'

    // UI state
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState({ profile: false, password: false, report: false });

    // Fetch sessions and terms on mount
    useEffect(() => {
        const fetchAcademicData = async () => {
            try {
                const [sessionsRes, termsRes] = await Promise.all([
                    getAcademicSessions(),
                    getTerms()
                ]);
                const sessionsArray = sessionsRes.sessions || sessionsRes.results || [];
                const termsArray = termsRes.terms || termsRes.results || [];
                
                setSessions(sessionsArray);
                setTerms(termsArray);
                
                const currentSession = sessionsArray.find(s => s.is_current);
                const currentTerm = termsArray.find(t => t.is_current);
                
                if (currentSession) setSelectedSession(currentSession.id.toString());
                if (currentTerm) setSelectedTerm(currentTerm.id.toString());
            } catch (err) {
                console.error('Failed to fetch academic data:', err);
            }
        };
        fetchAcademicData();
    }, []);

    // Filter terms by selected session
    const filteredTerms = terms.filter(t => 
        !selectedSession || t.session === parseInt(selectedSession)
    );

    // Handle image selection with preview
    const handleImageChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setMessage({ type: 'error', text: 'Please select an image file' });
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setMessage({ type: 'error', text: 'Image size must be less than 5MB' });
                return;
            }
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }, []);

    const clearImage = useCallback(() => {
        setImageFile(null);
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
            setImagePreview(null);
        }
    }, [imagePreview]);

    // Handle profile update
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setLoading(prev => ({ ...prev, profile: true }));

        const formData = new FormData();
        if (imageFile) formData.append('passport', imageFile);
        if (email !== student?.email) formData.append('email', email);
        if (phoneNumber !== student?.phone_number) formData.append('phone_number', phoneNumber);
        if (address !== student?.address) formData.append('address', address);

        if (!imageFile && email === student?.email && phoneNumber === student?.phone_number && address === student?.address) {
            setMessage({ type: 'info', text: 'No changes to save' });
            setLoading(prev => ({ ...prev, profile: false }));
            return;
        }

        try {
            await updateStudentProfile(formData);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            clearImage();
            if (refreshStudent) await refreshStudent();
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(prev => ({ ...prev, profile: false }));
        }
    };

    // Handle password change
    const handleChangePassword = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: "New passwords don't match" });
            return;
        }

        if (newPassword.length < 8) {
            setMessage({ type: 'error', text: 'Password must be at least 8 characters' });
            return;
        }

        setLoading(prev => ({ ...prev, password: true }));

        try {
            await changeStudentPassword(oldPassword, newPassword);
            setMessage({ type: 'success', text: 'Password changed successfully!' });
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(prev => ({ ...prev, password: false }));
        }
    };

    // Handle report export
    const handleExportReport = async () => {
        setMessage({ type: '', text: '' });
        
        if (!selectedSession) {
            setMessage({ type: 'error', text: 'Please select a session' });
            return;
        }
        
        if (reportType === 'term' && !selectedTerm) {
            setMessage({ type: 'error', text: 'Please select a term' });
            return;
        }

        setLoading(prev => ({ ...prev, report: true }));

        try {
            const params = { session: selectedSession };
            if (reportType === 'term') {
                params.term = selectedTerm;
            }
            
            const reportData = await getStudentReportCard(params);
            const html = generateMolekReport(reportData, reportType);

            const blob = new Blob([html], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            
            const sessionName = sessions.find(s => s.id === parseInt(selectedSession))?.name || 'Session';
            const termName = reportType === 'term' 
                ? terms.find(t => t.id === parseInt(selectedTerm))?.name || 'Term'
                : 'Cumulative';
            
            link.download = `MOLEK_Report_${student?.admission_number}_${sessionName}_${termName}.html`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            setMessage({ type: 'success', text: 'Report downloaded! Open the file to view and print.' });
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Failed to generate report' });
        } finally {
            setLoading(prev => ({ ...prev, report: false }));
        }
    };

    // Generate MOLEK-style HTML Report
    const generateMolekReport = (data, type) => {
        const studentData = data.student || {};
        const subjects = data.subjects || [];
        const summary = data.summary || data.cumulative || {};
        const sessionInfo = data.session || {};
        const termInfo = data.term || {};

        const getGradeColor = (grade) => {
            const colors = {
                'A': '#22c55e', 'B': '#3b82f6', 'C': '#eab308',
                'D': '#f97316', 'F': '#ef4444'
            };
            return colors[grade] || '#6b7280';
        };

        const isCumulative = type === 'session';

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MOLEK Report Card - ${studentData.full_name || studentData.admission_number}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f3f4f6;
            padding: 20px;
            color: #1f2937;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border: 2px solid #1e3a5f;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
            color: white;
            padding: 25px;
            text-align: center;
            border-bottom: 4px solid #fbbf24;
        }
        .header h1 {
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 2px;
            margin-bottom: 5px;
        }
        .header h2 {
            font-size: 16px;
            font-weight: normal;
            opacity: 0.9;
        }
        .student-info {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            padding: 20px;
            background: #f8fafc;
            border-bottom: 2px solid #e2e8f0;
        }
        .info-box {
            text-align: center;
            padding: 10px;
            background: white;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
        }
        .info-box label {
            display: block;
            font-size: 11px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .info-box span {
            font-size: 14px;
            font-weight: 600;
            color: #1e3a5f;
        }
        .section-title {
            background: #1e3a5f;
            color: white;
            padding: 10px 20px;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 1px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
        }
        th, td {
            border: 1px solid #d1d5db;
            padding: 8px 6px;
            text-align: center;
        }
        th {
            background: #f1f5f9;
            font-weight: 600;
            color: #374151;
            font-size: 11px;
            text-transform: uppercase;
        }
        .subject-name {
            text-align: left !important;
            font-weight: 500;
        }
        .grade-cell {
            font-weight: bold;
            padding: 4px 8px;
            border-radius: 4px;
        }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            padding: 20px;
            background: #fef3c7;
        }
        .summary-box {
            text-align: center;
            padding: 15px;
            background: white;
            border-radius: 8px;
            border: 2px solid #f59e0b;
        }
        .summary-box .value {
            font-size: 24px;
            font-weight: bold;
            color: #1e3a5f;
        }
        .summary-box .label {
            font-size: 11px;
            color: #64748b;
            margin-top: 5px;
        }
        .footer {
            padding: 20px;
            background: #f8fafc;
            border-top: 2px solid #e2e8f0;
        }
        .signatures {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-top: 30px;
        }
        .signature-line {
            text-align: center;
        }
        .signature-line .line {
            border-top: 1px solid #374151;
            margin-bottom: 5px;
            margin-top: 40px;
        }
        .signature-line span {
            font-size: 12px;
            color: #64748b;
        }
        .remark-excellent { color: #22c55e; }
        .remark-good { color: #3b82f6; }
        .remark-fair { color: #f59e0b; }
        .remark-poor { color: #ef4444; }
        @media print {
            body { padding: 0; background: white; }
            .container { border: none; box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 MOLEK SECONDARY SCHOOLS</h1>
            <h2>${isCumulative ? 'CUMULATIVE ASSESSMENT REPORT' : 'TERMINAL REPORT CARD'}</h2>
        </div>
        
        <div class="student-info">
            <div class="info-box">
                <label>Student Name</label>
                <span>${studentData.full_name || `${studentData.first_name || ''} ${studentData.last_name || ''}`}</span>
            </div>
            <div class="info-box">
                <label>Admission No.</label>
                <span>${studentData.admission_number || 'N/A'}</span>
            </div>
            <div class="info-box">
                <label>Class</label>
                <span>${studentData.class_level_name || 'N/A'}</span>
            </div>
            <div class="info-box">
                <label>Session</label>
                <span>${sessionInfo.name || 'N/A'}</span>
            </div>
            ${!isCumulative ? `
            <div class="info-box">
                <label>Term</label>
                <span>${termInfo.name || 'N/A'}</span>
            </div>
            ` : ''}
            <div class="info-box">
                <label>Gender</label>
                <span>${studentData.gender === 'M' ? 'Male' : studentData.gender === 'F' ? 'Female' : 'N/A'}</span>
            </div>
            <div class="info-box">
                <label>Date Generated</label>
                <span>${new Date().toLocaleDateString()}</span>
            </div>
        </div>

        <div class="section-title">
            ${isCumulative ? '📊 CUMULATIVE ASSESSMENT' : '📊 CURRENT TERM RESULTS'}
        </div>

        <table>
            <thead>
                <tr>
                    <th rowspan="2" style="width: 25%">SUBJECTS</th>
                    ${isCumulative ? `
                    <th colspan="3">TERM SCORES (B/F)</th>
                    <th rowspan="2">TOTAL<br>(300)</th>
                    <th rowspan="2">%</th>
                    ` : `
                    <th colspan="2">CA (30)</th>
                    <th rowspan="2">EXAM<br>(70)</th>
                    <th rowspan="2">TOTAL<br>(100)</th>
                    `}
                    <th rowspan="2">GRADE</th>
                    <th rowspan="2">POSITION</th>
                    ${isCumulative ? `<th rowspan="2">CLASS<br>AVG</th>` : ''}
                    <th rowspan="2">REMARKS</th>
                </tr>
                <tr>
                    ${isCumulative ? `
                    <th>1ST</th>
                    <th>2ND</th>
                    <th>3RD</th>
                    ` : `
                    <th>CA1</th>
                    <th>CA2</th>
                    `}
                </tr>
            </thead>
            <tbody>
                ${subjects.length > 0 ? subjects.map((s, idx) => `
                <tr>
                    <td class="subject-name">${idx + 1}. ${s.subjectName}</td>
                    ${isCumulative ? `
                    <td>${s.firstTerm || '-'}</td>
                    <td>${s.secondTerm || '-'}</td>
                    <td>${s.thirdTerm || '-'}</td>
                    <td><strong>${s.cumulativeTotal || 0}</strong></td>
                    <td>${s.cumulativePercent || 0}%</td>
                    ` : `
                    <td>${s.ca1 || 0}</td>
                    <td>${s.ca2 || 0}</td>
                    <td>${s.exam || 0}</td>
                    <td><strong>${s.total || 0}</strong></td>
                    `}
                    <td>
                        <span class="grade-cell" style="background: ${getGradeColor(s.grade)}20; color: ${getGradeColor(s.grade)}">
                            ${s.grade || '-'}
                        </span>
                    </td>
                    <td>${s.position || '-'}${s.totalStudents ? `/${s.totalStudents}` : ''}</td>
                    ${isCumulative ? `<td>${s.classAverage || '-'}</td>` : ''}
                    <td class="${s.remark === 'Excellent' ? 'remark-excellent' : s.remark === 'Very Good' || s.remark === 'Good' ? 'remark-good' : s.remark === 'Fair' ? 'remark-fair' : 'remark-poor'}">
                        ${s.remark || '-'}
                    </td>
                </tr>
                `).join('') : `
                <tr>
                    <td colspan="${isCumulative ? 10 : 8}" style="padding: 30px; color: #64748b;">
                        No results available for this ${isCumulative ? 'session' : 'term'}
                    </td>
                </tr>
                `}
            </tbody>
        </table>

        <div class="summary-grid">
            <div class="summary-box">
                <div class="value">${summary.totalSubjects || 0}</div>
                <div class="label">Total Subjects</div>
            </div>
            <div class="summary-box">
                <div class="value">${summary.averageScore || 0}%</div>
                <div class="label">Average Score</div>
            </div>
            <div class="summary-box">
                <div class="value" style="color: #22c55e">${summary.passedSubjects || 0}</div>
                <div class="label">Subjects Passed</div>
            </div>
            <div class="summary-box">
                <div class="value" style="color: ${getGradeColor(summary.grade)}">${summary.grade || '-'}</div>
                <div class="label">Overall Grade</div>
            </div>
        </div>

        <div class="footer">
            <div style="margin-bottom: 15px;">
                <strong>Class Teacher's Comment:</strong>
                <p style="margin-top: 5px; padding: 10px; background: #f9fafb; border-radius: 4px; min-height: 40px; border: 1px dashed #d1d5db;">
                    ${parseFloat(summary.averageScore) >= 70 ? 'Excellent performance! Keep it up.' :
                      parseFloat(summary.averageScore) >= 60 ? 'Very good performance. Continue to work hard.' :
                      parseFloat(summary.averageScore) >= 50 ? 'Good performance. There is room for improvement.' :
                      parseFloat(summary.averageScore) >= 40 ? 'Fair performance. More effort is needed.' :
                      'Below average. Needs to put in much more effort.'}
                </p>
            </div>
            
            <div class="signatures">
                <div class="signature-line">
                    <div class="line"></div>
                    <span>Class Teacher</span>
                </div>
                <div class="signature-line">
                    <div class="line"></div>
                    <span>Principal</span>
                </div>
                <div class="signature-line">
                    <div class="line"></div>
                    <span>Date</span>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
    };

    const currentPassport = student?.passport_url || student?.passport || null;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <img
                    src={currentPassport || logo}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                    onError={(e) => { e.target.src = logo; }}
                />
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
                    <p className="text-sm text-gray-600">Manage your profile and download reports</p>
                </div>
            </div>

            {/* Message */}
            {message.text && (
                <div className={`mb-6 p-4 rounded-lg ${
                    message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
                    message.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
                    'bg-blue-100 text-blue-800 border border-blue-200'
                }`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Update */}
                <div className="bg-white shadow-md border border-gray-100 p-6 rounded-xl">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Update Profile
                    </h2>

                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                            <div className="flex items-center gap-4">
                                <img
                                    src={imagePreview || currentPassport || logo}
                                    alt="Preview"
                                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                                    onError={(e) => { e.target.src = logo; }}
                                />
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="passport-upload"
                                    />
                                    <label
                                        htmlFor="passport-upload"
                                        className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors inline-block"
                                    >
                                        Choose Image
                                    </label>
                                    {imageFile && (
                                        <button
                                            type="button"
                                            onClick={clearImage}
                                            className="ml-2 text-red-600 hover:text-red-800"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                rows="2"
                                className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading.profile}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-lg font-semibold transition-all"
                        >
                            {loading.profile ? 'Updating...' : 'Update Profile'}
                        </button>
                    </form>
                </div>

                {/* Change Password */}
                <div className="bg-white shadow-md border border-gray-100 p-6 rounded-xl">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Change Password
                    </h2>

                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                            <input
                                type={showPasswords ? 'text' : 'password'}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                            <input
                                type={showPasswords ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                minLength="8"
                                className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                            <input
                                type={showPasswords ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="showPasswords"
                                checked={showPasswords}
                                onChange={(e) => setShowPasswords(e.target.checked)}
                                className="rounded border-gray-300 text-blue-600"
                            />
                            <label htmlFor="showPasswords" className="text-sm text-gray-600">Show passwords</label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading.password}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-lg font-semibold transition-all"
                        >
                            {loading.password ? 'Changing...' : 'Change Password'}
                        </button>
                    </form>
                </div>

                {/* Download Report */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 shadow-md border border-purple-100 p-6 rounded-xl lg:col-span-2">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Report Card
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                            <select
                                value={reportType}
                                onChange={(e) => setReportType(e.target.value)}
                                className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="term">Single Term Report</option>
                                <option value="session">Cumulative (Full Session)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Session</label>
                            <select
                                value={selectedSession}
                                onChange={(e) => {
                                    setSelectedSession(e.target.value);
                                    setSelectedTerm('');
                                }}
                                className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="">Select Session</option>
                                {sessions.map(s => (
                                    <option key={s.id} value={s.id}>
                                        {s.name} {s.is_current ? '(Current)' : ''}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {reportType === 'term' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Term</label>
                                <select
                                    value={selectedTerm}
                                    onChange={(e) => setSelectedTerm(e.target.value)}
                                    className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-purple-500 focus:border-purple-500"
                                >
                                    <option value="">Select Term</option>
                                    {filteredTerms.map(t => (
                                        <option key={t.id} value={t.id}>
                                            {t.name} {t.is_current ? '(Current)' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="flex items-end">
                            <button
                                onClick={handleExportReport}
                                disabled={loading.report}
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                            >
                                {loading.report ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                        </svg>
                                        Generating...
                                    </>
                                ) : (
                                    <>📥 Download Report</>
                                )}
                            </button>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 text-center">
                        ✨ MOLEK Official Format • 🖨️ Print-Ready • 📊 {reportType === 'session' ? 'Cumulative Assessment' : 'Term Results'}
                    </p>
                </div>

                {/* Student Info Display */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md border border-blue-100 p-6 rounded-xl lg:col-span-2">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Information</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="bg-white p-4 rounded-lg">
                            <p className="text-gray-600">Admission Number</p>
                            <p className="font-semibold text-gray-800">{student?.admission_number || 'N/A'}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <p className="text-gray-600">Current Class</p>
                            <p className="font-semibold text-gray-800">{student?.class_level_name || 'Not Assigned'}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <p className="text-gray-600">Date of Birth</p>
                            <p className="font-semibold text-gray-800">
                                {student?.date_of_birth ? new Date(student.date_of_birth).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <p className="text-gray-600">Status</p>
                            <p className={`font-semibold ${student?.is_active ? 'text-green-600' : 'text-red-600'}`}>
                                {student?.is_active ? '✓ Active' : '✗ Inactive'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;