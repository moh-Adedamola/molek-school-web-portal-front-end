// File Location: src/utils/validation.js
// Yup schemas for all forms including role-specific validations

import * as yup from 'yup';

// Common validation patterns
const phoneRegex = /^(\+234|0)[789][01]\d{8}$/;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Nigerian-specific validation helpers
export const nigerianValidation = {
  phone: yup.string()
    .matches(phoneRegex, 'Please enter a valid Nigerian phone number')
    .required('Phone number is required'),
    
  email: yup.string()
    .matches(emailRegex, 'Please enter a valid email address')
    .required('Email is required'),
    
  nin: yup.string()
    .length(11, 'NIN must be exactly 11 digits')
    .matches(/^\d+$/, 'NIN must contain only numbers'),
    
  state: yup.string()
    .oneOf([
      'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
      'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti',
      'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano',
      'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger',
      'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
      'Taraba', 'Yobe', 'Zamfara'
    ], 'Please select a valid Nigerian state')
    .required('State is required')
};

// Authentication schemas
export const loginSchema = yup.object({
  email: nigerianValidation.email,
  password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  role: yup.string()
    .oneOf(['super_admin', 'admin', 'teacher', 'parent'], 'Invalid role')
    .required('Role is required')
});

export const forgotPasswordSchema = yup.object({
  email: nigerianValidation.email
});

// User management schemas (Super Admin)
export const userSchema = yup.object({
  firstName: yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .required('First name is required'),
    
  lastName: yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .required('Last name is required'),
    
  email: nigerianValidation.email,
  phone: nigerianValidation.phone,
  
  role: yup.string()
    .oneOf(['admin', 'teacher', 'parent'], 'Invalid role')
    .required('Role is required'),
    
  isActive: yup.boolean().default(true),
  
  // Role-specific fields
  employeeId: yup.string()
    .when('role', {
      is: (role) => ['admin', 'teacher'].includes(role),
      then: (schema) => schema.required('Employee ID is required'),
      otherwise: (schema) => schema.nullable()
    }),
    
  subjects: yup.array()
    .when('role', {
      is: 'teacher',
      then: (schema) => schema.min(1, 'At least one subject must be assigned'),
      otherwise: (schema) => schema.nullable()
    }),
    
  classes: yup.array()
    .when('role', {
      is: 'teacher',
      then: (schema) => schema.min(1, 'At least one class must be assigned'),
      otherwise: (schema) => schema.nullable()
    })
});

// Student management schema (Admin)
export const studentSchema = yup.object({
  firstName: yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .required('First name is required'),
    
  lastName: yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .required('Last name is required'),
    
  middleName: yup.string()
    .max(50, 'Middle name cannot exceed 50 characters')
    .nullable(),
    
  dateOfBirth: yup.date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .required('Date of birth is required'),
    
  gender: yup.string()
    .oneOf(['male', 'female'], 'Gender is required')
    .required('Gender is required'),
    
  class: yup.string()
    .oneOf([
      'JSS1', 'JSS2', 'JSS3',
      'SSS1-SCI', 'SSS1-ART', 'SSS1-COM',
      'SSS2-SCI', 'SSS2-ART', 'SSS2-COM',
      'SSS3-SCI', 'SSS3-ART', 'SSS3-COM'
    ], 'Please select a valid class')
    .required('Class is required'),
    
  admissionNumber: yup.string()
    .matches(/^[A-Z]{2}\/\d{4}\/\d{3}$/, 'Format: XX/YYYY/NNN (e.g., JS/2024/001)')
    .required('Admission number is required'),
    
  parentId: yup.string()
    .required('Parent must be assigned'),
    
  address: yup.object({
    street: yup.string().required('Street address is required'),
    city: yup.string().required('City is required'),
    state: nigerianValidation.state,
    country: yup.string().default('Nigeria')
  }),
  
  emergencyContact: yup.object({
    name: yup.string().required('Emergency contact name is required'),
    phone: nigerianValidation.phone,
    relationship: yup.string().required('Relationship is required')
  }),
  
  medicalInfo: yup.object({
    allergies: yup.string().nullable(),
    medications: yup.string().nullable(),
    conditions: yup.string().nullable()
  }).nullable()
});

// Teacher management schema (Admin)
export const teacherSchema = yup.object({
  firstName: yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
    
  lastName: yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
    
  email: nigerianValidation.email,
  phone: nigerianValidation.phone,
  
  employeeId: yup.string()
    .matches(/^T\d{3}$/, 'Format: TXXX (e.g., T001)')
    .required('Employee ID is required'),
    
  subjects: yup.array()
    .of(yup.string())
    .min(1, 'At least one subject must be assigned')
    .required('Subjects are required'),
    
  classes: yup.array()
    .of(yup.string())
    .min(1, 'At least one class must be assigned')
    .required('Classes are required'),
    
  qualification: yup.string()
    .oneOf(['NCE', 'B.Ed', 'B.Sc', 'M.Ed', 'M.Sc', 'PhD'], 'Invalid qualification')
    .required('Qualification is required'),
    
  experience: yup.number()
    .min(0, 'Experience cannot be negative')
    .max(50, 'Experience seems too high')
    .required('Years of experience is required'),
    
  dateJoined: yup.date()
    .max(new Date(), 'Join date cannot be in the future')
    .required('Date joined is required'),
    
  isFormTeacher: yup.boolean().default(false),
  
  formClass: yup.string()
    .when('isFormTeacher', {
      is: true,
      then: (schema) => schema.required('Form class is required for form teachers'),
      otherwise: (schema) => schema.nullable()
    })
});

// Parent management schema (Admin)
export const parentSchema = yup.object({
  firstName: yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
    
  lastName: yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
    
  email: nigerianValidation.email,
  phone: nigerianValidation.phone,
  alternatePhone: yup.string()
    .matches(phoneRegex, 'Please enter a valid Nigerian phone number')
    .nullable(),
    
  occupation: yup.string()
    .max(100, 'Occupation cannot exceed 100 characters')
    .required('Occupation is required'),
    
  relationship: yup.string()
    .oneOf(['Father', 'Mother', 'Guardian'], 'Invalid relationship')
    .required('Relationship is required'),
    
  children: yup.array()
    .of(yup.string())
    .min(1, 'At least one child must be assigned')
    .required('Children are required'),
    
  address: yup.object({
    street: yup.string().required('Street address is required'),
    city: yup.string().required('City is required'),
    state: nigerianValidation.state,
    country: yup.string().default('Nigeria')
  }),
  
  nin: nigerianValidation.nin.nullable()
});

// Attendance marking schema (Teacher)
export const attendanceSchema = yup.object({
  classId: yup.string().required('Class is required'),
  date: yup.date()
    .max(new Date(), 'Cannot mark attendance for future dates')
    .required('Date is required'),
    
  students: yup.array()
    .of(
      yup.object({
        studentId: yup.string().required(),
        status: yup.string()
          .oneOf(['present', 'absent', 'late', 'excused'], 'Invalid attendance status')
          .required('Status is required'),
        remarks: yup.string().max(200, 'Remarks cannot exceed 200 characters').nullable()
      })
    )
    .min(1, 'At least one student attendance must be marked')
    .required('Student attendance is required')
});

// Grade entry schema (Teacher)
export const gradeSchema = yup.object({
  studentId: yup.string().required('Student is required'),
  subjectId: yup.string().required('Subject is required'),
  term: yup.string()
    .oneOf(['First Term', 'Second Term', 'Third Term'], 'Invalid term')
    .required('Term is required'),
    
  assessmentType: yup.string()
    .oneOf(['CA1', 'CA2', 'CA3', 'EXAM'], 'Invalid assessment type')
    .required('Assessment type is required'),
    
  score: yup.number()
    .min(0, 'Score cannot be negative')
    .when('assessmentType', {
      is: 'EXAM',
      then: (schema) => schema.max(70, 'Exam score cannot exceed 70'),
      otherwise: (schema) => schema.max(10, 'CA score cannot exceed 10')
    })
    .required('Score is required'),
    
  maxScore: yup.number()
    .when('assessmentType', {
      is: 'EXAM',
      then: (schema) => schema.default(70),
      otherwise: (schema) => schema.default(10)
    }),
    
  remarks: yup.string()
    .max(500, 'Remarks cannot exceed 500 characters')
    .nullable()
});

// Website content schema (Admin)
export const websiteContentSchema = yup.object({
  section: yup.string()
    .oneOf(['homepage', 'about', 'academics', 'news', 'events', 'gallery', 'contact'])
    .required('Section is required'),
    
  title: yup.string()
    .max(200, 'Title cannot exceed 200 characters')
    .required('Title is required'),
    
  content: yup.string()
    .max(10000, 'Content cannot exceed 10,000 characters')
    .required('Content is required'),
    
  isPublished: yup.boolean().default(false),
  publishedAt: yup.date().nullable(),
  
  seoTitle: yup.string()
    .max(60, 'SEO title cannot exceed 60 characters')
    .nullable(),
    
  seoDescription: yup.string()
    .max(160, 'SEO description cannot exceed 160 characters')
    .nullable()
});

// Contact form schema (Public)
export const contactFormSchema = yup.object({
  name: yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .required('Name is required'),
    
  email: nigerianValidation.email,
  phone: nigerianValidation.phone,
  
  subject: yup.string()
    .max(200, 'Subject cannot exceed 200 characters')
    .required('Subject is required'),
    
  message: yup.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message cannot exceed 1000 characters')
    .required('Message is required'),
    
  category: yup.string()
    .oneOf(['general', 'admissions', 'academics', 'complaints'], 'Invalid category')
    .required('Category is required')
});

// Admission inquiry schema (Public)
export const admissionInquirySchema = yup.object({
  studentName: yup.string()
    .min(2, 'Student name must be at least 2 characters')
    .max(100, 'Student name cannot exceed 100 characters')
    .required('Student name is required'),
    
  parentName: yup.string()
    .min(2, 'Parent name must be at least 2 characters')
    .max(100, 'Parent name cannot exceed 100 characters')
    .required('Parent name is required'),
    
  email: nigerianValidation.email,
  phone: nigerianValidation.phone,
  
  intendedClass: yup.string()
    .oneOf(['JSS1', 'JSS2', 'JSS3', 'SSS1', 'SSS2', 'SSS3'], 'Invalid class')
    .required('Intended class is required'),
    
  academicYear: yup.string()
    .matches(/^\d{4}\/\d{4}$/, 'Format: YYYY/YYYY (e.g., 2024/2025)')
    .required('Academic year is required'),
    
  previousSchool: yup.string()
    .max(200, 'Previous school name cannot exceed 200 characters')
    .nullable(),
    
  additionalInfo: yup.string()
    .max(1000, 'Additional information cannot exceed 1000 characters')
    .nullable()
});

// Export all schemas
export default {
  loginSchema,
  forgotPasswordSchema,
  userSchema,
  studentSchema,
  teacherSchema,
  parentSchema,
  attendanceSchema,
  gradeSchema,
  websiteContentSchema,
  contactFormSchema,
  admissionInquirySchema,
  nigerianValidation
};