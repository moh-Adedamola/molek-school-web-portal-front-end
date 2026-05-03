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

    // Generate MOLEK-style HTML Report matching Recording Sheet format
    const generateMolekReport = (data, type) => {
        const studentData = data.student || {};
        const rawSubjects = data.subjects || [];
        const summary = data.summary || data.cumulative || {};
        
        // Add overall position from the first grade result (all results for same student have same overall position)
        if (!summary.overallPosition && rawSubjects.length > 0) {
            const firstSubject = rawSubjects[0];
            summary.overallPosition = firstSubject.overallPosition || firstSubject.overall_position || null;
            summary.overallTotalStudents = firstSubject.overallTotalStudents || firstSubject.overall_total_students || null;
            summary.overallAverage = firstSubject.overallAverage || firstSubject.overall_average || null;
        }
        const sessionInfo = data.session || {};
        const termInfo = data.term || {};

        const getGradeColor = (grade) => {
            const colors = {
                'A': '#22c55e', 'B': '#3b82f6', 'C': '#eab308',
                'D': '#f97316', 'E': '#f97316', 'F': '#ef4444'
            };
            return colors[grade] || '#6b7280';
        };

        const isCumulative = type === 'session';

        // Normalize API fields to template fields
        let subjects;
        if (isCumulative) {
            subjects = rawSubjects.map(s => {
                const ts = s.termScores || {};
                const ft = ts['First Term'];
                const st = ts['Second Term'];
                const tt = ts['Third Term'];
                const firstTerm = ft ? ft.total : null;
                const secondTerm = st ? st.total : null;
                const thirdTerm = tt ? tt.total : null;
                const validTerms = [firstTerm, secondTerm, thirdTerm].filter(t => t !== null && t !== undefined);
                const cumulativeTotal = validTerms.reduce((sum, t) => sum + t, 0);
                const numTerms = validTerms.length;
                const cumulativeAvg = numTerms > 0 ? cumulativeTotal / numTerms : 0;
                return {
                    subjectName: s.subjectName,
                    firstTerm: firstTerm !== null ? Math.round(firstTerm) : '-',
                    secondTerm: secondTerm !== null ? Math.round(secondTerm) : '-',
                    thirdTerm: thirdTerm !== null ? Math.round(thirdTerm) : '-',
                    cumulativeTotal: Math.round(cumulativeTotal),
                    cumulativeMark: Math.round(cumulativeTotal),
                    cumulativePercent: numTerms > 0 ? cumulativeAvg.toFixed(1) : '0',
                    avgStudent: numTerms > 0 ? cumulativeAvg.toFixed(1) : '0',
                    classAverage: s.classAverage != null ? Math.round(s.classAverage) : '-',
                    position: s.position || '-',
                    totalStudents: s.totalStudents || '',
                    grade: s.cumulativeGrade || '-',
                    remark: s.cumulativeRemark || '-',
                };
            });
        } else {
            subjects = rawSubjects.map(s => ({
                subjectName: s.subjectName,
                ca1: s.ca1Score != null ? s.ca1Score : 0,
                ca2: s.ca2Score != null ? s.ca2Score : 0,
                exam: ((s.objScore || 0) + (s.theoryScore || 0)),
                total: s.totalScore || 0,
                grade: s.grade || '-',
                remark: s.remark || '-',
                position: s.position || '-',
                totalStudents: s.totalStudents || '',
                classAverage: s.classAverage || '-',
            }));
        }

        // Convert logo to embeddable format for print
        const logoUrl = window.location.origin + '/logo.webp';

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
            padding: 15px;
            color: #1f2937;
        }
        .container {
            max-width: 960px;
            margin: 0 auto;
            background: white;
            border: 2px solid #000;
        }

        /* ===== HEADER WITH LOGO ===== */
        .header {
            text-align: center;
            padding: 15px 20px 10px;
            border-bottom: 2px solid #000;
        }
        .header-logo {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            object-fit: contain;
            margin-bottom: 5px;
        }
        .header h1 {
            font-size: 24px;
            font-weight: 900;
            letter-spacing: 3px;
            text-transform: uppercase;
            margin: 0;
        }
        .header h2 {
            font-size: 14px;
            font-weight: 600;
            margin-top: 2px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* ===== STUDENT INFO BAR ===== */
        .info-bar {
            display: flex;
            justify-content: space-between;
            padding: 8px 15px;
            border-bottom: 1px solid #000;
            font-size: 12px;
            flex-wrap: wrap;
            gap: 5px;
        }
        .info-bar .field {
            display: flex;
            gap: 4px;
        }
        .info-bar .field label {
            font-weight: 700;
            text-transform: uppercase;
            font-size: 11px;
        }
        .info-bar .field span {
            border-bottom: 1px solid #000;
            min-width: 80px;
            display: inline-block;
            padding: 0 4px;
            font-weight: 500;
        }

        /* ===== TABLE - RECORDING SHEET STYLE ===== */
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
        }
        th, td {
            border: 1px solid #000;
            padding: 4px 3px;
            text-align: center;
            vertical-align: middle;
        }
        th {
            background: #f5f5f5;
            font-weight: 700;
            font-size: 10px;
            text-transform: uppercase;
        }
        .subject-name {
            text-align: left !important;
            padding-left: 6px !important;
            font-weight: 500;
            font-size: 11px;
            white-space: nowrap;
        }
        .group-header {
            background: #e8e8e8;
            font-weight: 800;
            font-size: 11px;
            letter-spacing: 0.5px;
        }
        .sub-max {
            font-size: 9px;
            color: #555;
            font-weight: 600;
        }
        td.bold-val {
            font-weight: 700;
        }

        /* ===== SUMMARY SECTION ===== */
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            padding: 12px 15px;
            border-top: 2px solid #000;
        }
        .summary-box {
            text-align: center;
            padding: 10px;
            border: 1px solid #999;
        }
        .summary-box .value {
            font-size: 20px;
            font-weight: bold;
        }
        .summary-box .label {
            font-size: 10px;
            color: #555;
            margin-top: 3px;
            text-transform: uppercase;
        }

        /* ===== FOOTER ===== */
        .footer {
            padding: 15px;
            border-top: 1px solid #000;
        }
        .comment-box {
            margin-bottom: 12px;
        }
        .comment-box strong {
            font-size: 12px;
        }
        .comment-box p {
            margin-top: 4px;
            padding: 8px;
            border: 1px dashed #999;
            min-height: 35px;
            font-size: 12px;
        }
        .signatures {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
            margin-top: 25px;
        }
        .signature-line {
            text-align: center;
        }
        .signature-line .line {
            border-top: 1px solid #000;
            margin-bottom: 4px;
            margin-top: 35px;
        }
        .signature-line span {
            font-size: 11px;
            color: #555;
        }

        /* ===== BEHAVIORAL ASSESSMENT GRID ===== */
        .behavioral-section {
            margin-top: 20px;
            border: 1.5px solid #000;
            padding: 0;
        }
        .section-title {
            background: #1e40af;
            color: white;
            padding: 6px 12px;
            margin: 0;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .behavioral-grid-wrapper {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 0;
        }
        .behavioral-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
            margin: 0;
        }
        .behavioral-table th, .behavioral-table td {
            border: 1px solid #888;
            padding: 4px 6px;
            text-align: center;
        }
        .behavioral-table thead th {
            background: #f3f4f6;
            font-weight: 700;
        }
        .behavioral-table tbody td {
            height: 20px;
        }
        .rating-circle {
            display: inline-block;
            width: 12px;
            height: 12px;
            border: 1.5px solid #555;
            border-radius: 50%;
            background: white;
        }
        .rating-circle.filled {
            background: #1e40af;
            border-color: #1e40af;
        }
        .rating-key {
            padding: 10px 15px;
            font-size: 10px;
            line-height: 1.6;
            background: #fafafa;
            border-left: 1px solid #000;
        }

        /* ===== GRADE KEY ===== */
        .grade-key {
            display: flex;
            gap: 12px;
            padding: 6px 15px;
            border-top: 1px solid #000;
            font-size: 10px;
            flex-wrap: wrap;
        }
        .grade-key span { font-weight: 600; }

        @media print {
            body { padding: 0; background: white; }
            .container { border: 2px solid #000; box-shadow: none; }
            .no-print { display: none !important; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- HEADER WITH LOGO -->
        <div class="header">
            <img src="${logoUrl}" alt="MOLEK Logo" class="header-logo" onerror="this.style.display='none'" />
            <h1>MOLEK SECONDARY SCHOOLS</h1>
            <h2>${isCumulative ? 'Recording Sheet / Cumulative Assessment' : 'Terminal Report Card'}</h2>
        </div>

        <!-- STUDENT INFO BAR -->
        <div class="info-bar">
            ${!isCumulative ? `
            <div class="field"><label>Subject:</label> <span>All Subjects</span></div>
            ` : ''}
            <div class="field"><label>Name:</label> <span>${studentData.full_name || (studentData.first_name || '') + ' ' + (studentData.last_name || '')}</span></div>
            <div class="field"><label>Class:</label> <span>${studentData.class_level_name || 'N/A'}</span></div>
            <div class="field"><label>Term:</label> <span>${isCumulative ? 'Cumulative' : (termInfo.name || 'N/A')}</span></div>
            <div class="field"><label>Session:</label> <span>${sessionInfo.name || 'N/A'}</span></div>
            <div class="field"><label>Adm No:</label> <span>${studentData.admission_number || 'N/A'}</span></div>
        </div>

        ${!isCumulative && data.behavioral && (data.behavioral.times_school_opened || data.behavioral.times_present || data.behavioral.public_holidays) ? `
        <div class="info-bar attendance-bar">
            <div class="field"><label>Times School Opened:</label> <span>${data.behavioral.times_school_opened ?? '—'}</span></div>
            <div class="field"><label>Times Present:</label> <span>${data.behavioral.times_present ?? '—'}</span></div>
            <div class="field"><label>Public Holidays:</label> <span>${data.behavioral.public_holidays ?? '—'}</span></div>
            ${termInfo.school_resumes ? `<div class="field"><label>School Resumes:</label> <span>${new Date(termInfo.school_resumes).toLocaleDateString('en-NG', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span></div>` : ''}
        </div>
        ` : (termInfo.school_resumes && !isCumulative ? `
        <div class="info-bar attendance-bar">
            <div class="field"><label>School Resumes:</label> <span>${new Date(termInfo.school_resumes).toLocaleDateString('en-NG', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span></div>
        </div>
        ` : '')}

        ${isCumulative ? `
        <!-- ===== CUMULATIVE TABLE (Recording Sheet Format) ===== -->
        <table>
            <thead>
                <tr>
                    <th rowspan="3" style="width:18%; min-width:100px;">SUBJECTS</th>
                    <th colspan="6" class="group-header">CURRENT TERM</th>
                    <th colspan="10" class="group-header">CUMULATIVE ASSESSMENT</th>
                </tr>
                <tr>
                    <th rowspan="2">CA 1<br><span class="sub-max">15</span></th>
                    <th rowspan="2">CA 2<br><span class="sub-max">15</span></th>
                    <th rowspan="2">EXAM<br><span class="sub-max">70</span></th>
                    <th rowspan="2">TOTAL<br><span class="sub-max">100</span></th>
                    <th rowspan="2">POS.</th>
                    <th rowspan="2">GRADE</th>
                    <th rowspan="2">1ST TERM<br>B/F<br><span class="sub-max">100</span></th>
                    <th rowspan="2">2ND TERM<br>B/F<br><span class="sub-max">100</span></th>
                    <th rowspan="2">3RD TERM<br>B/F<br><span class="sub-max">100</span></th>
                    <th rowspan="2">TOTAL</th>
                    <th rowspan="2">CUMULATIVE %</th>
                    <th colspan="2">AVERAGE SCORE</th>
                    <th rowspan="2">POS.</th>
                    <th rowspan="2">GRADE</th>
                    <th rowspan="2">REMARKS</th>
                </tr>
                <tr>
                    <th>STUDENT<br><span class="sub-max">100</span></th>
                    <th>CLASS<br><span class="sub-max">100</span></th>
                </tr>
            </thead>
            <tbody>
                ${subjects.length > 0 ? subjects.map((s, idx) => {
                    // Get latest term's CA/exam data for "Current Term" columns
                    const raw = rawSubjects[idx];
                    const ts = raw?.termScores || {};
                    // Find the latest available term
                    const latestTerm = ts['Third Term'] || ts['Second Term'] || ts['First Term'];
                    const ca1 = latestTerm ? latestTerm.ca1 : '-';
                    const ca2 = latestTerm ? latestTerm.ca2 : '-';
                    const exam = latestTerm ? Math.round((latestTerm.obj || 0) + (latestTerm.theory || 0)) : '-';
                    const termTotal = latestTerm ? Math.round(latestTerm.total) : '-';
                    const termGrade = latestTerm ? (latestTerm.grade || '-') : '-';
                    return `
                <tr>
                    <td class="subject-name">${idx + 1}. ${s.subjectName}</td>
                    <td>${ca1}</td>
                    <td>${ca2}</td>
                    <td>${exam}</td>
                    <td class="bold-val">${termTotal}</td>
                    <td>${s.position || '-'}</td>
                    <td>${termGrade}</td>
                    <td>${s.firstTerm}</td>
                    <td>${s.secondTerm}</td>
                    <td>${s.thirdTerm}</td>
                    <td class="bold-val">${s.cumulativeTotal}</td>
                    <td>${s.cumulativePercent}%</td>
                    <td>${s.avgStudent}</td>
                    <td>${s.classAverage}</td>
                    <td>${s.position || '-'}${s.totalStudents ? '/' + s.totalStudents : ''}</td>
                    <td><strong>${s.grade}</strong></td>
                    <td style="font-size:9px;">${s.remark}</td>
                </tr>`;
                }).join('') : `
                <tr>
                    <td colspan="17" style="padding: 25px; color: #888;">No results available for this session</td>
                </tr>`}
            </tbody>
        </table>
        ` : `
        <!-- ===== TERM REPORT TABLE ===== -->
        <table>
            <thead>
                <tr>
                    <th rowspan="2" style="width:22%">SUBJECTS</th>
                    <th colspan="2">CA (30)</th>
                    <th rowspan="2">EXAM<br><span class="sub-max">70</span></th>
                    <th rowspan="2">TOTAL<br><span class="sub-max">100</span></th>
                    <th rowspan="2">GRADE</th>
                    <th rowspan="2">POSITION</th>
                    <th rowspan="2">CLASS<br>AVG</th>
                    <th rowspan="2">REMARKS</th>
                </tr>
                <tr>
                    <th>CA1<br><span class="sub-max">15</span></th>
                    <th>CA2<br><span class="sub-max">15</span></th>
                </tr>
            </thead>
            <tbody>
                ${subjects.length > 0 ? subjects.map((s, idx) => `
                <tr>
                    <td class="subject-name">${idx + 1}. ${s.subjectName}</td>
                    <td>${s.ca1}</td>
                    <td>${s.ca2}</td>
                    <td>${s.exam}</td>
                    <td class="bold-val">${s.total}</td>
                    <td><strong>${s.grade}</strong></td>
                    <td>${s.position}${s.totalStudents ? '/' + s.totalStudents : ''}</td>
                    <td>${s.classAverage}</td>
                    <td style="font-size:10px;">${s.remark}</td>
                </tr>
                `).join('') : `
                <tr>
                    <td colspan="9" style="padding: 25px; color: #888;">No results available for this term</td>
                </tr>
                `}
            </tbody>
        </table>
        `}

        <!-- GRADE KEY -->
        <div class="grade-key">
            <span>A = 75-100 (Excellent)</span>
            <span>B = 70-74 (Very Good)</span>
            <span>C = 60-69 (Good)</span>
            <span>D = 50-59 (Pass)</span>
            <span>E = 45-49 (Fair)</span>
            <span>F = 0-44 (Fail)</span>
        </div>

        <!-- SUMMARY -->
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
                <div class="value" style="color: #22c55e">${summary.passedSubjects || 0}/${summary.totalSubjects || 0}</div>
                <div class="label">Subjects Passed</div>
            </div>
            <div class="summary-box">
                <div class="value" style="color: ${getGradeColor(summary.grade)}">${summary.grade || '-'}</div>
                <div class="label">Overall Grade</div>
            </div>
            <div class="summary-box">
                <div class="value" style="color: #7c3aed">${summary.overallPosition || '-'}${summary.overallTotalStudents ? '/' + summary.overallTotalStudents : ''}</div>
                <div class="label">Overall Position</div>
            </div>
        </div>

        <!-- BEHAVIORAL ASSESSMENT GRID (only for term reports, not session) -->
        ${!isCumulative && data.behavioral ? `
        <div class="behavioral-section">
            <h3 class="section-title">BEHAVIORAL ASSESSMENT</h3>
            <div class="behavioral-grid-wrapper">
                <table class="behavioral-table">
                    <thead>
                        <tr>
                            <th style="text-align:left; width:50%;">(Affective) General Behaviour</th>
                            <th>1</th><th>2</th><th>3</th><th>4</th><th>5</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${[
                            ['Punctuality', data.behavioral.punctuality],
                            ['Attendance', data.behavioral.attendance],
                            ['Carrying Out Assignment', data.behavioral.carrying_out_assignment],
                            ['Neatness', data.behavioral.neatness],
                            ['Politeness', data.behavioral.politeness],
                            ['Honesty', data.behavioral.honesty],
                            ['Self-control', data.behavioral.self_control],
                            ['Relationship With Others', data.behavioral.relationship_others],
                            ['Sense Of Responsibility', data.behavioral.sense_responsibility],
                            ['Obedience', data.behavioral.obedience],
                            ['Organizational Ability', data.behavioral.organizational_ability],
                        ].map(([label, val]) => `
                            <tr>
                                <td style="text-align:left;">${label}</td>
                                ${[1, 2, 3, 4, 5].map(n => `
                                    <td>
                                        <span class="rating-circle ${val === n ? 'filled' : ''}"></span>
                                    </td>
                                `).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div class="rating-key">
                    <strong>Key to Ratings:</strong><br>
                    5 — Excellent<br>
                    4 — Very Good<br>
                    3 — Good<br>
                    2 — Fair<br>
                    1 — Weak
                </div>
            </div>
        </div>
        ` : ''}

        <!-- FOOTER -->
        <div class="footer">
            <div class="comment-box">
                <strong>Class Teacher's Comment:</strong>
                <p>${(data.behavioral && data.behavioral.class_teacher_comment) ? data.behavioral.class_teacher_comment :
                    (parseFloat(summary.averageScore) >= 70 ? 'Excellent performance! Keep it up.' :
                     parseFloat(summary.averageScore) >= 60 ? 'Very good performance. Continue to work hard.' :
                     parseFloat(summary.averageScore) >= 50 ? 'Good performance. There is room for improvement.' :
                     parseFloat(summary.averageScore) >= 40 ? 'Fair performance. More effort is needed.' :
                     'Below average. Needs to put in much more effort.')}</p>
            </div>

            <div class="comment-box">
                <strong>Principal's Comment:</strong>
                <p>${data.principal_remark ||
                    (parseFloat(summary.averageScore) >= 75 ? 'Outstanding performance. Keep up the excellent work.' :
                     parseFloat(summary.averageScore) >= 60 ? 'Very good performance. We are proud of you.' :
                     parseFloat(summary.averageScore) >= 45 ? 'Acceptable performance. There is room for improvement.' :
                     'Performance needs urgent improvement. Please consult your teachers.')}</p>
            </div>

            <div class="signatures">
                <div class="signature-line">
                    <div class="line"></div>
                    <span>Date Submitted</span>
                </div>
                <div class="signature-line">
                    <div class="line"></div>
                    <span>Signature</span>
                </div>
                <div class="signature-line">
                    <div class="line"></div>
                    <span>Head Teacher</span>
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
                                    <> Download Report</>
                                )}
                            </button>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 text-center">
                        MOLEK Official Format • Print-Ready • {reportType === 'session' ? 'Cumulative Assessment' : 'Term Results'}
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
                                {student?.is_active ? 'Active' : 'Inactive'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;