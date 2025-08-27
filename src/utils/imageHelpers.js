// utils/imageHelpers.js
// Image handling utilities for Nigerian school management system

import { FILE_UPLOAD } from './constants';

// Default placeholder images for different content types
export const DEFAULT_IMAGES = {
  SCHOOL_LOGO: '/images/logo.png',
  STUDENT_AVATAR: '/images/defaults/student-avatar.svg',
  TEACHER_AVATAR: '/images/defaults/teacher-avatar.svg', 
  ADMIN_AVATAR: '/images/defaults/admin-avatar.svg',
  SCHOOL_BUILDING: '/images/defaults/school-building.jpg',
  CLASSROOM: '/images/defaults/classroom.jpg',
  LABORATORY: '/images/defaults/laboratory.jpg',
  LIBRARY: '/images/defaults/library.jpg',
  PLAYGROUND: '/images/defaults/playground.jpg',
  EVENT_PLACEHOLDER: '/images/defaults/event-placeholder.jpg',
  NEWS_PLACEHOLDER: '/images/defaults/news-placeholder.jpg'
};

// Nigerian school specific image categories
export const IMAGE_CATEGORIES = {
  ACADEMIC: 'academic',
  SPORTS: 'sports', 
  CULTURAL: 'cultural',
  CEREMONIES: 'ceremonies',
  FACILITIES: 'facilities',
  STAFF: 'staff',
  STUDENTS: 'students',
  EVENTS: 'events'
};

// Generate avatar based on user initials and role
export const generateAvatar = (name, role = 'student', size = 40) => {
  const initials = name
    .split(' ')
    .map(n => n.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
    
  const colors = {
    student: { bg: '#3b82f6', text: '#ffffff' },
    teacher: { bg: '#059669', text: '#ffffff' },  
    admin: { bg: '#d97706', text: '#ffffff' },
    parent: { bg: '#7c3aed', text: '#ffffff' }
  };
  
  const roleColor = colors[role] || colors.student;
  
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="${roleColor.bg}"/>
      <text x="${size/2}" y="${size/2 + 6}" font-family="Arial, sans-serif" 
            font-size="${size * 0.4}" font-weight="bold" text-anchor="middle" 
            fill="${roleColor.text}">${initials}</text>
    </svg>
  `)}`;
};

// Validate image file
export const validateImageFile = (file) => {
  const errors = [];
  
  if (!file) {
    errors.push('No file selected');
    return { isValid: false, errors };
  }
  
  // Check file size
  if (file.size > FILE_UPLOAD.MAX_SIZE) {
    errors.push(`File size must be less than ${FILE_UPLOAD.MAX_SIZE / 1024 / 1024}MB`);
  }
  
  // Check file type
  if (!FILE_UPLOAD.ALLOWED_TYPES.includes(file.type)) {
    errors.push('File type not supported. Use JPG, PNG, or PDF files only');
  }
  
  // Check file extension
  const extension = '.' + file.name.split('.').pop().toLowerCase();
  if (!FILE_UPLOAD.ALLOWED_EXTENSIONS.includes(extension)) {
    errors.push('Invalid file extension');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Create image preview URL
export const createImagePreview = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject('Invalid image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject('Error reading file');
    reader.readAsDataURL(file);
  });
};

// Resize image for optimization
export const resizeImage = (file, maxWidth = 800, maxHeight = 600, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }
      
      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Get image dimensions
export const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight
      });
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

// Nigerian school gallery image paths
export const GALLERY_IMAGES = {
  // Academic activities
  CLASSROOMS: [
    '/images/gallery/classroom-1.jpg',
    '/images/gallery/classroom-2.jpg', 
    '/images/gallery/classroom-3.jpg'
  ],
  
  // Science laboratories
  LABORATORIES: [
    '/images/gallery/physics-lab.jpg',
    '/images/gallery/chemistry-lab.jpg',
    '/images/gallery/biology-lab.jpg',
    '/images/gallery/computer-lab.jpg'
  ],
  
  // Sports and recreation
  SPORTS: [
    '/images/gallery/football-field.jpg',
    '/images/gallery/basketball-court.jpg',
    '/images/gallery/athletics-track.jpg',
    '/images/gallery/inter-house-sports.jpg'
  ],
  
  // Cultural events
  CULTURAL: [
    '/images/gallery/cultural-day-1.jpg',
    '/images/gallery/cultural-day-2.jpg',
    '/images/gallery/drama-performance.jpg',
    '/images/gallery/traditional-dance.jpg'
  ],
  
  // School ceremonies  
  CEREMONIES: [
    '/images/gallery/graduation-2024.jpg',
    '/images/gallery/prize-giving-day.jpg',
    '/images/gallery/speech-day.jpg',
    '/images/gallery/founders-day.jpg'
  ],
  
  // School facilities
  FACILITIES: [
    '/images/gallery/library.jpg',
    '/images/gallery/auditorium.jpg',
    '/images/gallery/cafeteria.jpg',
    '/images/gallery/hostel.jpg'
  ]
};

// Image optimization for web display
export const optimizeForWeb = (imageUrl, width = null, height = null) => {
  // In production, this would integrate with a CDN or image service
  // For now, return the original URL
  if (!width && !height) return imageUrl;
  
  // Simulated query parameters for image resizing
  const params = new URLSearchParams();
  if (width) params.append('w', width);
  if (height) params.append('h', height);
  params.append('f', 'webp'); // Prefer WebP format
  params.append('q', '85'); // Quality setting
  
  return `${imageUrl}?${params.toString()}`;
};

// Generate placeholder image with text
export const generatePlaceholder = (width, height, text = 'Image', bgColor = '#e5e7eb') => {
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" 
            text-anchor="middle" dominant-baseline="middle" fill="#6b7280">${text}</text>
    </svg>
  `)}`;
};

// Image gallery helpers
export const createImageGallery = (images, category = 'general') => {
  return images.map((image, index) => ({
    id: `${category}-${index}`,
    src: image,
    alt: `${category} image ${index + 1}`,
    category,
    thumbnail: optimizeForWeb(image, 300, 200),
    fullSize: optimizeForWeb(image, 1200, 800)
  }));
};

export default {
  DEFAULT_IMAGES,
  IMAGE_CATEGORIES, 
  GALLERY_IMAGES,
  generateAvatar,
  validateImageFile,
  createImagePreview,
  resizeImage,
  getImageDimensions,
  optimizeForWeb,
  generatePlaceholder,
  createImageGallery
};