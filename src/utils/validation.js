// utils/validation.js - Yup validation schemas for Nigerian school context

import * as yup from 'yup';

// Nigerian-specific validation patterns
const NIGERIAN_PATTERNS = {
  phone: /^(\+234|0)[789]\d{9}$/, // Nigerian mobile numbers
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  admissionNumber: /^[A-Z]{2,4}\/\d{4}\/\d{4,6}$/, // Format: MOL/2024/0001
  staffId: /^[A-Z]{3}\/\d{4}\/\d{3,4}$/, // Format: TCH/2024/001
};

// Nigerian states for validation
const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo',
  'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna',
  'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
  'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

// School-specific constants
const SCHOOL_CLASSES = ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'];
const SCHOOL_TERMS = ['First Term', 'Second Term', 'Third Term'];
const GRADE_LEVELS = ['JSS', 'SSS'];
const USER_ROLES = ['super_admin', 'admin', 'teacher', 'parent'];

// Custom validation methods
yup.addMethod(yup.string, 'nigerianPhone', function (message) {
  return this.matches(NIGERIAN_PATTERNS.phone, {
    message: message || 'Please enter a valid Nigerian phone number (e.g., +234809XXXXXXX or 08091234567)',
    excludeEmptyString: true,
  });
});

yup.addMethod(yup.string, 'nigerianState', function (message) {
  return this.oneOf(NIGERIAN_STATES, message || 'Please select a valid Nigerian state');
});

// ==================== AUTHENTICATION SCHEMAS ====================

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

// ==================== STUDENT SCHEMAS ====================

export const studentSchema = yup.object({
  first_name: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .required('First name is required'),
  
  last_name: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .required('Last name is required'),
  
  middle_name: yup
    .string()
    .max(50, 'Middle name must not exceed 50 characters'),
  
  date_of_birth: yup
    .date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .required('Date of birth is required')
    .test('age', 'Student must be between 8 and 20 years old', function (value) {
      if (!value) return true;
      const today = new Date();
      const age = today.getFullYear() - value.getFullYear();
      return age >= 8 && age <= 20;
    }),
  
  gender: yup
    .string()
    .oneOf(['Male', 'Female'], 'Please select a valid gender')
    .required('Gender is required'),
  
  class: yup
    .string()
    .oneOf(SCHOOL_CLASSES, 'Please select a valid class')
    .required('Class is required'),
  
  admission_number: yup
    .string()
    .matches(NIGERIAN_PATTERNS.admissionNumber, 'Invalid admission number format (e.g., MOL/2024/0001)'),
  
  email: yup
    .string()
    .email('Please enter a valid email address'),
  
  phone: yup
    .string()
    .nigerianPhone(),
  
  parent_phone: yup
    .string()
    .nigerianPhone('Please enter a valid parent phone number')
    .required('Parent phone number is required'),
  
  address: yup
    .string()
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address must not exceed 200 characters')
    .required('Address is required'),
  
  state: yup
    .string()
    .nigerianState()
    .required('State is required'),
  
  lga: yup
    .string()
    .min(3, 'LGA must be at least 3 characters')
    .max(50, 'LGA must not exceed 50 characters')
    .required('Local Government Area is required'),
  
  previous_school: yup
    .string()
    .max(100, 'Previous school name must not exceed 100 characters'),
  
  medical_conditions: yup
    .string()
    .max(500, 'Medical conditions must not exceed 500 characters'),
});

// ==================== TEACHER SCHEMAS ====================

export const teacherSchema = yup.object({
  first_name: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  
  last_name: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  
  phone: yup
    .string()
    .nigerianPhone()
    .required('Phone number is required'),
  
  staff_id: yup
    .string()
    .matches(NIGERIAN_PATTERNS.staffId, 'Invalid staff ID format (e.g., TCH/2024/001)'),
  
  qualification: yup
    .string()
    .min(5, 'Qualification must be at least 5 characters')
    .required('Qualification is required'),
  
  subjects: yup
    .array()
    .of(yup.string())
    .min(1, 'At least one subject is required')
    .required('Subjects are required'),
  
  classes: yup
    .array()
    .of(yup.string().oneOf(SCHOOL_CLASSES, 'Invalid class selected'))
    .min(1, 'At least one class is required'),
  
  hire_date: yup
    .date()
    .max(new Date(), 'Hire date cannot be in the future')
    .required('Hire date is required'),
  
  salary: yup
    .number()
    .positive('Salary must be a positive number')
    .min(30000, 'Minimum salary is ₦30,000')
    .max(1000000, 'Maximum salary is ₦1,000,000'),
  
  address: yup
    .string()
    .min(10, 'Address must be at least 10 characters')
    .required('Address is required'),
  
  state: yup
    .string()
    .nigerianState()
    .required('State is required'),
});

// ==================== ATTENDANCE SCHEMAS ====================

export const attendanceSchema = yup.object({
  class_id: yup
    .string()
    .required('Class is required'),
  
  date: yup
    .date()
    .max(new Date(), 'Attendance date cannot be in the future')
    .required('Date is required'),
  
  term: yup
    .string()
    .oneOf(SCHOOL_TERMS, 'Please select a valid term')
    .required('Term is required'),
  
  academic_year: yup
    .string()
    .matches(/^\d{4}\/\d{4}$/, 'Academic year format should be YYYY/YYYY (e.g., 2024/2025)')
    .required('Academic year is required'),
  
  attendance_records: yup
    .array()
    .of(
      yup.object({
        student_id: yup.string().required(),
        status: yup.string().oneOf(['Present', 'Absent', 'Late', 'Excused'], 'Invalid attendance status'),
        remarks: yup.string().max(200, 'Remarks must not exceed 200 characters'),
      })
    )
    .min(1, 'At least one attendance record is required'),
});

// ==================== GRADES SCHEMAS ====================

export const gradeSchema = yup.object({
  student_id: yup
    .string()
    .required('Student is required'),
  
  subject_id: yup
    .string()
    .required('Subject is required'),
  
  term: yup
    .string()
    .oneOf(SCHOOL_TERMS, 'Please select a valid term')
    .required('Term is required'),
  
  academic_year: yup
    .string()
    .matches(/^\d{4}\/\d{4}$/, 'Academic year format should be YYYY/YYYY')
    .required('Academic year is required'),
  
  // Nigerian grading system (0-100)
  continuous_assessment_1: yup
    .number()
    .min(0, 'Score cannot be negative')
    .max(100, 'Score cannot exceed 100')
    .required('First CA score is required'),
  
  continuous_assessment_2: yup
    .number()
    .min(0, 'Score cannot be negative')
    .max(100, 'Score cannot exceed 100')
    .required('Second CA score is required'),
  
  exam_score: yup
    .number()
    .min(0, 'Exam score cannot be negative')
    .max(100, 'Exam score cannot exceed 100')
    .required('Exam score is required'),
  
  remarks: yup
    .string()
    .max(200, 'Remarks must not exceed 200 characters'),
});

// ==================== CONTACT/INQUIRY SCHEMAS ====================

export const contactSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  
  phone: yup
    .string()
    .nigerianPhone()
    .required('Phone number is required'),
  
  subject: yup
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .required('Subject is required'),
  
  message: yup
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(1000, 'Message must not exceed 1000 characters')
    .required('Message is required'),
  
  inquiry_type: yup
    .string()
    .oneOf(['Admission', 'General', 'Academic', 'Fee Payment', 'Complaint'], 'Please select a valid inquiry type')
    .required('Inquiry type is required'),
});

export const admissionInquirySchema = yup.object({
  parent_name: yup
    .string()
    .min(2, 'Parent name must be at least 2 characters')
    .required('Parent name is required'),
  
  parent_email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Parent email is required'),
  
  parent_phone: yup
    .string()
    .nigerianPhone()
    .required('Parent phone number is required'),
  
  student_name: yup
    .string()
    .min(2, 'Student name must be at least 2 characters')
    .required('Student name is required'),
  
  desired_class: yup
    .string()
    .oneOf(SCHOOL_CLASSES, 'Please select a valid class')
    .required('Desired class is required'),
  
  preferred_start_term: yup
    .string()
    .oneOf(SCHOOL_TERMS, 'Please select a valid term')
    .required('Preferred start term is required'),
  
  previous_school: yup
    .string()
    .max(100, 'Previous school name must not exceed 100 characters'),
  
  additional_info: yup
    .string()
    .max(500, 'Additional information must not exceed 500 characters'),
});

// ==================== USER MANAGEMENT SCHEMAS ====================

export const userSchema = yup.object({
  first_name: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  
  last_name: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  
  phone: yup
    .string()
    .nigerianPhone()
    .required('Phone number is required'),
  
  role: yup
    .string()
    .oneOf(USER_ROLES, 'Please select a valid role')
    .required('Role is required'),
  
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number')
    .required('Password is required'),
  
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  
  is_active: yup
    .boolean()
    .default(true),
});

// ==================== CLASS & SUBJECT SCHEMAS ====================

export const classSchema = yup.object({
  name: yup
    .string()
    .oneOf(SCHOOL_CLASSES, 'Please select a valid class name')
    .required('Class name is required'),
  
  level: yup
    .string()
    .oneOf(GRADE_LEVELS, 'Please select a valid level (JSS or SSS)')
    .required('Class level is required'),
  
  capacity: yup
    .number()
    .min(10, 'Minimum class capacity is 10')
    .max(50, 'Maximum class capacity is 50')
    .required('Class capacity is required'),
  
  class_teacher_id: yup
    .string()
    .required('Class teacher is required'),
  
  academic_year: yup
    .string()
    .matches(/^\d{4}\/\d{4}$/, 'Academic year format should be YYYY/YYYY')
    .required('Academic year is required'),
});

export const subjectSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Subject name must be at least 2 characters')
    .max(50, 'Subject name must not exceed 50 characters')
    .required('Subject name is required'),
  
  code: yup
    .string()
    .matches(/^[A-Z]{2,4}\d{3}$/, 'Subject code format should be like ENG101, MTH201')
    .required('Subject code is required'),
  
  level: yup
    .string()
    .oneOf(GRADE_LEVELS, 'Please select a valid level')
    .required('Subject level is required'),
  
  credit_unit: yup
    .number()
    .min(1, 'Minimum credit unit is 1')
    .max(6, 'Maximum credit unit is 6')
    .required('Credit unit is required'),
  
  is_core: yup
    .boolean()
    .default(false),
  
  description: yup
    .string()
    .max(500, 'Description must not exceed 500 characters'),
});

// ==================== ANNOUNCEMENT SCHEMAS ====================

export const announcementSchema = yup.object({
  title: yup
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must not exceed 100 characters')
    .required('Title is required'),
  
  content: yup
    .string()
    .min(20, 'Content must be at least 20 characters')
    .max(2000, 'Content must not exceed 2000 characters')
    .required('Content is required'),
  
  type: yup
    .string()
    .oneOf(['General', 'Academic', 'Event', 'Emergency', 'Fee Payment'], 'Please select a valid announcement type')
    .required('Announcement type is required'),
  
  target_audience: yup
    .array()
    .of(yup.string().oneOf(['Students', 'Teachers', 'Parents', 'Staff'], 'Invalid target audience'))
    .min(1, 'At least one target audience is required')
    .required('Target audience is required'),
  
  priority: yup
    .string()
    .oneOf(['Low', 'Medium', 'High', 'Urgent'], 'Please select a valid priority')
    .default('Medium'),
  
  publish_date: yup
    .date()
    .min(new Date(), 'Publish date cannot be in the past')
    .required('Publish date is required'),
  
  expiry_date: yup
    .date()
    .min(yup.ref('publish_date'), 'Expiry date must be after publish date'),
  
  send_notification: yup
    .boolean()
    .default(true),
});

// ==================== REPORT SCHEMAS ====================

export const reportFilterSchema = yup.object({
  report_type: yup
    .string()
    .oneOf(['attendance', 'grades', 'student_performance', 'financial', 'custom'], 'Please select a valid report type')
    .required('Report type is required'),
  
  academic_year: yup
    .string()
    .matches(/^\d{4}\/\d{4}$/, 'Academic year format should be YYYY/YYYY')
    .required('Academic year is required'),
  
  term: yup
    .string()
    .oneOf([...SCHOOL_TERMS, 'All Terms'], 'Please select a valid term'),
  
  class_ids: yup
    .array()
    .of(yup.string())
    .when('report_type', {
      is: (val) => ['attendance', 'grades', 'student_performance'].includes(val),
      then: (schema) => schema.min(1, 'At least one class must be selected'),
    }),
  
  subject_ids: yup
    .array()
    .of(yup.string())
    .when('report_type', {
      is: 'grades',
      then: (schema) => schema.min(1, 'At least one subject must be selected'),
    }),
  
  date_from: yup
    .date()
    .when('report_type', {
      is: 'attendance',
      then: (schema) => schema.required('Start date is required for attendance reports'),
    }),
  
  date_to: yup
    .date()
    .min(yup.ref('date_from'), 'End date must be after start date')
    .when('report_type', {
      is: 'attendance',
      then: (schema) => schema.required('End date is required for attendance reports'),
    }),
  
  format: yup
    .string()
    .oneOf(['PDF', 'Excel', 'CSV'], 'Please select a valid export format')
    .default('PDF'),
});

// ==================== VALIDATION HELPERS ====================

// Helper function to validate Nigerian phone numbers
export const validateNigerianPhone = (phone) => {
  if (!phone) return false;
  return NIGERIAN_PATTERNS.phone.test(phone);
};

// Helper function to format Nigerian phone numbers
export const formatNigerianPhone = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return `+234${cleaned.substring(1)}`;
  }
  return phone;
};

// Helper function to validate email
export const validateEmail = (email) => {
  if (!email) return false;
  return NIGERIAN_PATTERNS.email.test(email);
};

// Helper function to generate admission number
export const generateAdmissionNumber = (year, sequence) => {
  return `MOL/${year}/${String(sequence).padStart(4, '0')}`;
};

// Helper function to generate staff ID
export const generateStaffId = (prefix, year, sequence) => {
  return `${prefix}/${year}/${String(sequence).padStart(3, '0')}`;
};

// Helper function to validate academic year
export const validateAcademicYear = (year) => {
  const pattern = /^\d{4}\/\d{4}$/;
  if (!pattern.test(year)) return false;
  
  const [startYear, endYear] = year.split('/').map(Number);
  return endYear === startYear + 1;
};

// Export constants for use in components
export {
  NIGERIAN_STATES,
  SCHOOL_CLASSES,
  SCHOOL_TERMS,
  GRADE_LEVELS,
  USER_ROLES,
};