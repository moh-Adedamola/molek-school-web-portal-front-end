/**
 * Student Settings Component
 * Handles profile updates, password changes, and report downloads
 */

import { useState, useCallback } from 'react';
import { useStudentAuth } from '../../context/StudentAuthContext';
import { updateStudentProfile, changeStudentPassword, exportAcademicReport } from '../../service/studentApi';
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

    // UI state
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState({ profile: false, password: false, report: false });

    // Handle image selection with preview
    const handleImageChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setMessage({ type: 'error', text: 'Please select an image file' });
                return;
            }
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setMessage({ type: 'error', text: 'Image size must be less than 5MB' });
                return;
            }
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }, []);

    // Clear image selection
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

        // Only append changed fields
        if (imageFile) formData.append('passport', imageFile);
        if (email !== student?.email) formData.append('email', email);
        if (phoneNumber !== student?.phone_number) formData.append('phone_number', phoneNumber);
        if (address !== student?.address) formData.append('address', address);

        // Check if there's anything to update
        if (!imageFile && email === student?.email && phoneNumber === student?.phone_number && address === student?.address) {
            setMessage({ type: 'info', text: 'No changes to save' });
            setLoading(prev => ({ ...prev, profile: false }));
            return;
        }

        try {
            await updateStudentProfile(formData);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            clearImage();

            // Refresh student data in context instead of page reload
            if (refreshStudent) {
                await refreshStudent();
            }
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

        // Validation
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
        setLoading(prev => ({ ...prev, report: true }));

        try {
            const { student: studentData, grades, caScores } = await exportAcademicReport();

            // Generate HTML report
            const html = generateBeautifulReport(studentData, grades, caScores);

            // Download the file
            const blob = new Blob([html], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `MOLEK_Report_${studentData.admission_number}_${new Date().toISOString().split('T')[0]}.html`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            setMessage({ type: 'success', text: 'Report downloaded! Open the file to view and print.' });
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(prev => ({ ...prev, report: false }));
        }
    };

    // Generate Beautiful HTML Report
    const generateBeautifulReport = (studentData, grades, caScores) => {
        const avgScore = grades.length > 0
            ? (grades.reduce((sum, g) => sum + (g.total_score || 0), 0) / grades.length).toFixed(1)
            : 0;
        const passedSubjects = grades.filter(g => (g.total_score || 0) >= 40).length;
        const highGrades = grades.filter(g => g.grade === 'A' || g.grade === 'B').length;

        const getGradeColor = (score) => {
            if (score >= 70) return '#22c55e';
            if (score >= 60) return '#3b82f6';
            if (score >= 50) return '#eab308';
            if (score >= 40) return '#f97316';
            return '#ef4444';
        };

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Academic Report - ${studentData.full_name || `${studentData.first_name} ${studentData.last_name}`}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            color: #333;
            min-height: 100vh;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 28px;
            margin-bottom: 10px;
        }
        
        .header p {
            opacity: 0.9;
            font-size: 14px;
        }
        
        .student-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            padding: 30px;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .info-item {
            text-align: center;
        }
        
        .info-item label {
            display: block;
            font-size: 12px;
            color: #64748b;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .info-item span {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            padding: 30px;
        }
        
        .stat-card {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
        }
        
        .stat-card .value {
            font-size: 32px;
            font-weight: 700;
            color: #4f46e5;
        }
        
        .stat-card .label {
            font-size: 12px;
            color: #64748b;
            margin-top: 5px;
        }
        
        .section-title {
            padding: 20px 30px;
            background: #f1f5f9;
            font-size: 18px;
            font-weight: 600;
            color: #334155;
            border-bottom: 2px solid #4f46e5;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }
        
        th {
            background: #f8fafc;
            font-weight: 600;
            color: #475569;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        tr:hover {
            background: #f8fafc;
        }
        
        .grade-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 14px;
        }
        
        .footer {
            padding: 30px;
            text-align: center;
            background: #1e293b;
            color: white;
        }
        
        .footer p {
            font-size: 12px;
            opacity: 0.8;
        }
        
        @media print {
            body { background: white; padding: 0; }
            .container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 MOLEK SCHOOLS</h1>
            <p>Academic Performance Report</p>
        </div>
        
        <div class="student-info">
            <div class="info-item">
                <label>Student Name</label>
                <span>${studentData.full_name || `${studentData.first_name} ${studentData.last_name}`}</span>
            </div>
            <div class="info-item">
                <label>Admission Number</label>
                <span>${studentData.admission_number}</span>
            </div>
            <div class="info-item">
                <label>Class</label>
                <span>${studentData.class_level_name || 'N/A'}</span>
            </div>
            <div class="info-item">
                <label>Report Generated</label>
                <span>${new Date().toLocaleDateString()}</span>
            </div>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="value">${grades.length}</div>
                <div class="label">Total Subjects</div>
            </div>
            <div class="stat-card">
                <div class="value">${avgScore}%</div>
                <div class="label">Average Score</div>
            </div>
            <div class="stat-card">
                <div class="value">${passedSubjects}</div>
                <div class="label">Subjects Passed</div>
            </div>
            <div class="stat-card">
                <div class="value">${highGrades}</div>
                <div class="label">A/B Grades</div>
            </div>
        </div>
        
        <div class="section-title">📊 Exam Results</div>
        <table>
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Session/Term</th>
                    <th>CA Score</th>
                    <th>Exam Score</th>
                    <th>Total</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                ${grades.length > 0 ? grades.map(g => `
                    <tr>
                        <td><strong>${g.subject_name}</strong></td>
                        <td>${g.session_name || ''} - ${g.term_name || ''}</td>
                        <td>${g.ca_score || 0}/30</td>
                        <td>${g.exam_score || 0}/70</td>
                        <td><strong>${g.total_score || 0}/100</strong></td>
                        <td>
                            <span class="grade-badge" style="background: ${getGradeColor(g.total_score)}20; color: ${getGradeColor(g.total_score)}">
                                ${g.grade || 'N/A'}
                            </span>
                        </td>
                    </tr>
                `).join('') : '<tr><td colspan="6" style="text-align: center; padding: 40px; color: #64748b;">No exam results available</td></tr>'}
            </tbody>
        </table>
        
        ${caScores.length > 0 ? `
        <div class="section-title">📝 Continuous Assessment Scores</div>
        <table>
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Session/Term</th>
                    <th>CA Score</th>
                    <th>Max Score</th>
                </tr>
            </thead>
            <tbody>
                ${caScores.map(ca => `
                    <tr>
                        <td><strong>${ca.subject_name}</strong></td>
                        <td>${ca.session_name || ''} - ${ca.term_name || ''}</td>
                        <td>${ca.score || 0}</td>
                        <td>${ca.max_score || 30}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        ` : ''}
        
        <div class="footer">
            <p>This is an official academic report from MOLEK Schools</p>
            <p style="margin-top: 10px;">Generated on ${new Date().toLocaleString()}</p>
        </div>
    </div>
</body>
</html>`;
    };

    // Message alert component
    const Alert = ({ type, text }) => {
        if (!text) return null;

        const styles = {
            success: 'bg-green-50 border-green-200 text-green-800',
            error: 'bg-red-50 border-red-200 text-red-800',
            info: 'bg-blue-50 border-blue-200 text-blue-800',
        };

        const icons = {
            success: '✓',
            error: '✗',
            info: 'ℹ',
        };

        return (
            <div className={`${styles[type]} border rounded-lg p-4 mb-6 flex items-center gap-3`}>
                <span className="text-lg">{icons[type]}</span>
                <span>{text}</span>
            </div>
        );
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <img
                    src={student?.passport || student?.passport_url || logo}
                    alt={student?.full_name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                    onError={(e) => { e.target.src = logo; }}
                />
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                    <p className="text-sm text-gray-600">Manage your account and preferences</p>
                </div>
            </div>

            {/* Global Alert */}
            <Alert type={message.type} text={message.text} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Update Section */}
                <div className="bg-white shadow-md border border-gray-100 p-6 rounded-xl">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Update Profile
                    </h2>

                    <form onSubmit={handleProfileUpdate}>
                        <div className="space-y-5">
                            {/* Profile Photo */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Profile Photo
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <img
                                            src={imagePreview || student?.passport || student?.passport_url || logo}
                                            alt="Profile preview"
                                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                                            onError={(e) => { e.target.src = logo; }}
                                        />
                                        {imagePreview && (
                                            <button
                                                type="button"
                                                onClick={clearImage}
                                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max 5MB.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Fields */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your.email@example.com"
                                    className="block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="+234..."
                                    className="block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address
                                </label>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Your address"
                                    rows={2}
                                    className="block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading.profile}
                                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading.profile ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating...
                                    </>
                                ) : 'Update Profile'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Change Password Section */}
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
                                placeholder="Enter current password"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                            <input
                                type={showPasswords ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                minLength="8"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                            <input
                                type={showPasswords ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter new password"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="showPasswords"
                                checked={showPasswords}
                                onChange={(e) => setShowPasswords(e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="showPasswords" className="text-sm text-gray-600">Show passwords</label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading.password}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading.password ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Changing...
                                </>
                            ) : 'Change Password'}
                        </button>
                    </form>
                </div>

                {/* Download Report Section */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 shadow-md border border-purple-100 p-8 rounded-xl lg:col-span-2">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-2">
                            <svg className="h-7 w-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            Download Academic Report
                        </h2>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Get your complete academic report with grades, CA scores, and personal information in a beautiful, printable format.
                        </p>

                        <button
                            onClick={handleExportReport}
                            disabled={loading.report}
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-10 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed transform hover:scale-105 inline-flex items-center gap-2"
                        >
                            {loading.report ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating Report...
                                </>
                            ) : (
                                <>📥 Download Report</>
                            )}
                        </button>

                        <p className="text-sm text-gray-500 mt-4">
                            ✨ Beautiful, professional format • 🖨️ Print-ready • 📱 Mobile-friendly
                        </p>
                    </div>
                </div>

                {/* Student Info Display */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md border border-blue-100 p-6 rounded-xl lg:col-span-2">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
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