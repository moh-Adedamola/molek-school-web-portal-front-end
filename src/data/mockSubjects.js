// File Location: src/data/mockSubjects.js
// Nigerian curriculum subjects organized by JSS/SSS levels

export const mockSubjects = {
  // Junior Secondary School Subjects (JSS 1-3)
  jss: {
    core: [
      { id: 'eng', name: 'English Language', code: 'ENG', category: 'Language Arts' },
      { id: 'math', name: 'Mathematics', code: 'MTH', category: 'Sciences' },
      { id: 'bsc', name: 'Basic Science', code: 'BSC', category: 'Sciences' },
      { id: 'btc', name: 'Basic Technology', code: 'BTC', category: 'Technology' },
      { id: 'sst', name: 'Social Studies', code: 'SST', category: 'Social Sciences' },
      { id: 'crs', name: 'Christian Religious Studies', code: 'CRS', category: 'Religious Studies' },
      { id: 'irs', name: 'Islamic Religious Studies', code: 'IRS', category: 'Religious Studies' },
      { id: 'cca', name: 'Cultural & Creative Arts', code: 'CCA', category: 'Arts' },
      { id: 'phe', name: 'Physical & Health Education', code: 'PHE', category: 'Health & PE' },
      { id: 'agr', name: 'Agricultural Science', code: 'AGR', category: 'Vocational' }
    ],
    vocational: [
      { id: 'hec', name: 'Home Economics', code: 'HEC', category: 'Vocational' },
      { id: 'fre', name: 'French Language', code: 'FRE', category: 'Language Arts' },
      { id: 'ibo', name: 'Igbo Language', code: 'IBO', category: 'Language Arts' },
      { id: 'yor', name: 'Yoruba Language', code: 'YOR', category: 'Language Arts' },
      { id: 'hau', name: 'Hausa Language', code: 'HAU', category: 'Language Arts' }
    ]
  },

  // Senior Secondary School Subjects (SSS 1-3)
  sss: {
    sciences: [
      { id: 'eng', name: 'English Language', code: 'ENG', category: 'Core', waecRequired: true },
      { id: 'math', name: 'Mathematics', code: 'MTH', category: 'Core', waecRequired: true },
      { id: 'phy', name: 'Physics', code: 'PHY', category: 'Sciences', waecRequired: true },
      { id: 'che', name: 'Chemistry', code: 'CHE', category: 'Sciences', waecRequired: true },
      { id: 'bio', name: 'Biology', code: 'BIO', category: 'Sciences', waecRequired: true },
      { id: 'geo', name: 'Geography', code: 'GEO', category: 'Social Sciences' },
      { id: 'agr', name: 'Agricultural Science', code: 'AGR', category: 'Sciences' },
      { id: 'fms', name: 'Further Mathematics', code: 'FMS', category: 'Sciences' }
    ],
    arts: [
      { id: 'eng', name: 'English Language', code: 'ENG', category: 'Core', waecRequired: true },
      { id: 'math', name: 'Mathematics', code: 'MTH', category: 'Core', waecRequired: true },
      { id: 'lit', name: 'Literature in English', code: 'LIT', category: 'Language Arts' },
      { id: 'gov', name: 'Government', code: 'GOV', category: 'Social Sciences' },
      { id: 'his', name: 'History', code: 'HIS', category: 'Social Sciences' },
      { id: 'geo', name: 'Geography', code: 'GEO', category: 'Social Sciences' },
      { id: 'crs', name: 'Christian Religious Studies', code: 'CRS', category: 'Religious Studies' },
      { id: 'irs', name: 'Islamic Religious Studies', code: 'IRS', category: 'Religious Studies' },
      { id: 'fre', name: 'French Language', code: 'FRE', category: 'Language Arts' }
    ],
    commercial: [
      { id: 'eng', name: 'English Language', code: 'ENG', category: 'Core', waecRequired: true },
      { id: 'math', name: 'Mathematics', code: 'MTH', category: 'Core', waecRequired: true },
      { id: 'acc', name: 'Accounting', code: 'ACC', category: 'Commercial' },
      { id: 'eco', name: 'Economics', code: 'ECO', category: 'Commercial' },
      { id: 'cmc', name: 'Commerce', code: 'CMC', category: 'Commercial' },
      { id: 'gov', name: 'Government', code: 'GOV', category: 'Social Sciences' },
      { id: 'geo', name: 'Geography', code: 'GEO', category: 'Social Sciences' },
      { id: 'bst', name: 'Business Studies', code: 'BST', category: 'Commercial' }
    ]
  }
};

// Subject assignments by class level
export const classSubjects = {
  'JSS1': mockSubjects.jss.core,
  'JSS2': [...mockSubjects.jss.core, ...mockSubjects.jss.vocational.slice(0, 2)],
  'JSS3': [...mockSubjects.jss.core, ...mockSubjects.jss.vocational.slice(0, 3)],
  'SSS1-SCI': mockSubjects.sss.sciences,
  'SSS1-ART': mockSubjects.sss.arts,
  'SSS1-COM': mockSubjects.sss.commercial,
  'SSS2-SCI': mockSubjects.sss.sciences,
  'SSS2-ART': mockSubjects.sss.arts,
  'SSS2-COM': mockSubjects.sss.commercial,
  'SSS3-SCI': mockSubjects.sss.sciences,
  'SSS3-ART': mockSubjects.sss.arts,
  'SSS3-COM': mockSubjects.sss.commercial
};

// Subject teachers mapping
export const subjectTeachers = {
  'eng': ['T001', 'T002'],
  'math': ['T003', 'T004'],
  'phy': ['T005'],
  'che': ['T006'],
  'bio': ['T007'],
  'geo': ['T008'],
  'gov': ['T009'],
  'his': ['T010'],
  'acc': ['T011'],
  'eco': ['T012']
};

export default mockSubjects;