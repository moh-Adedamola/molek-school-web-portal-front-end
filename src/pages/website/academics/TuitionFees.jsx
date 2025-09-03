// File: src/pages/website/academics/TuitionFees.jsx
import React from 'react';

const TuitionFees = () => (
  <div className="section-padding">
    <div className="container-max text-center">
      <h1 className="text-4xl font-bold text-neutral-800 mb-4">Tuition Fees</h1>
      <p className="text-neutral-600">Tuition Fees page content coming soon...</p>
    </div>
  </div>
);

export default TuitionFees;

// File: src/pages/website/academics/TuitionFees.jsx
// import React, { useState } from 'react';
// import { CreditCard, Calculator, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';

// const TuitionFees = () => {
//   const [selectedLevel, setSelectedLevel] = useState('jss');

//   const feeStructure = {
//     jss: {
//       title: 'Junior Secondary School (JSS 1 - JSS 3)',
//       tuitionPerTerm: 45000,
//       fees: [
//         { item: 'Tuition Fee', amount: 45000, required: true, description: 'Academic instruction and curriculum delivery' },
//         { item: 'Development Levy', amount: 8000, required: true, description: 'School infrastructure and facility improvements' },
//         { item: 'Library Fee', amount: 3000, required: true, description: 'Access to library resources and materials' },
//         { item: 'Laboratory Fee', amount: 5000, required: true, description: 'Science laboratory equipment and materials' },
//         { item: 'Sports Fee', amount: 2000, required: true, description: 'Sports equipment and inter-school competitions' },
//         { item: 'Medical Fee', amount: 2500, required: true, description: 'Basic medical care and health services' },
//         { item: 'Exam Fee', amount: 4000, required: true, description: 'Internal and external examination costs' },
//         { item: 'Uniform (New Students)', amount: 15000, required: false, description: 'Complete school uniform set' },
//         { item: 'Textbooks (Annually)', amount: 25000, required: false, description: 'Required textbooks for all subjects' }
//       ]
//     },
//     sss: {
//       title: 'Senior Secondary School (SSS 1 - SSS 3)',
//       tuitionPerTerm: 55000,
//       fees: [
//         { item: 'Tuition Fee', amount: 55000, required: true, description: 'Academic instruction and curriculum delivery' },
//         { item: 'Development Levy', amount: 10000, required: true, description: 'School infrastructure and facility improvements' },
//         { item: 'Library Fee', amount: 4000, required: true, description: 'Access to library resources and materials' },
//         { item: 'Laboratory Fee', amount: 7000, required: true, description: 'Science laboratory equipment and materials' },
//         { item: 'Computer Fee', amount: 5000, required: true, description: 'Computer lab access and digital resources' },
//         { item: 'Sports Fee', amount: 2500, required: true, description: 'Sports equipment and inter-school competitions' },
//         { item: 'Medical Fee', amount: 3000, required: true, description: 'Basic medical care and health services' },
//         { item: 'WAEC/NECO Fee', amount: 18000, required: true, description: 'External examination registration (SSS 3 only)' },
//         { item: 'Uniform (New Students)', amount: 18000, required: false, description: 'Complete school uniform set' },
//         { item: 'Textbooks (Annually)', amount: 35000, required: false, description: 'Required textbooks for all subjects' }
//       ]
//     }
//   };

//   const paymentPlans = [
//     {
//       title: 'Full Payment',
//       discount: '5%',
//       description: 'Pay complete term fees at resumption',
//       benefits: ['5% discount on total fees', 'Priority in class placement', 'No payment reminders']
//     },
//     {
//       title: 'Two Installments',
//       discount: '2%',
//       description: '50% at resumption, 50% mid-term',
//       benefits: ['2% discount on total fees', 'Flexible payment timeline', 'Reduced financial burden']
//     },
//     {
//       title: 'Monthly Payment',
//       discount: '0%',
//       description: 'Spread payments across 3 months',
//       benefits: ['No upfront bulk payment', 'Better cash flow management', 'Family budget friendly']
//     }
//   ];

//   const currentFees = feeStructure[selectedLevel];
//   const requiredTotal = currentFees.fees.filter(fee => fee.required).reduce((sum, fee) => sum + fee.amount, 0);
//   const optionalTotal = currentFees.fees.filter(fee => !fee.required).reduce((sum, fee) => sum + fee.amount, 0);

//   return (
//     <div className="min-h-screen bg-neutral-50">
//       {/* Header */}
//       <div className="bg-white border-b border-neutral-200">
//         <div className="container-max py-8">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
//               Tuition Fees & Payment Plans
//             </h1>
//             <p className="text-lg text-neutral-600 max-w-2xl mx-auto text-balance">
//               Transparent fee structure for quality education - Academic Year 2024/2025
//             </p>
//           </div>

//           {/* Level Selector */}
//           <div className="flex justify-center gap-2 max-w-md mx-auto">
//             <button
//               onClick={() => setSelectedLevel('jss')}
//               className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
//                 selectedLevel === 'jss'
//                   ? 'btn-primary text-white'
//                   : 'btn-outline text-primary-600'
//               }`}
//             >
//               JSS Fees
//             </button>
//             <button
//               onClick={() => setSelectedLevel('sss')}
//               className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
//                 selectedLevel === 'sss'
//                   ? 'btn-primary text-white'
//                   : 'btn-outline text-primary-600'
//               }`}
//             >
//               SSS Fees
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Fee Structure */}
//       <div className="section-padding">
//         <div className="container-max">
//           <div className="max-w-4xl mx-auto">
            
//             {/* Fee Summary Cards */}
//             <div className="grid md:grid-cols-3 gap-6 mb-8">
//               <div className="card-base text-center border-l-4 border-primary-600">
//                 <Calculator className="w-12 h-12 text-primary-600 mx-auto mb-3" />
//                 <h3 className="text-2xl font-bold text-primary-600 mb-2">
//                   ₦{requiredTotal.toLocaleString()}
//                 </h3>
//                 <p className="text-sm font-medium text-neutral-800 mb-1">Required Fees</p>
//                 <p className="text-xs text-neutral-600">Per Term</p>
//               </div>
              
//               <div className="card-base text-center border-l-4 border-accent-600">
//                 <BookOpen className="w-12 h-12 text-accent-600 mx-auto mb-3" />
//                 <h3 className="text-2xl font-bold text-accent-600 mb-2">
//                   ₦{optionalTotal.toLocaleString()}
//                 </h3>
//                 <p className="text-sm font-medium text-neutral-800 mb-1">Optional Items</p>
//                 <p className="text-xs text-neutral-600">One-time/Annual</p>
//               </div>
              
//               <div className="card-base text-center border-l-4 border-secondary-600">
//                 <CreditCard className="w-12 h-12 text-secondary-600 mx-auto mb-3" />
//                 <h3 className="text-2xl font-bold text-secondary-600 mb-2">
//                   ₦{(requiredTotal * 3).toLocaleString()}
//                 </h3>
//                 <p className="text-sm font-medium text-neutral-800 mb-1">Annual Total</p>
//                 <p className="text-xs text-neutral-600">3 Terms Required</p>
//               </div>
//             </div>

//             {/* Detailed Fee Breakdown */}
//             <div className="card-base mb-8">
//               <h2 className="text-xl font-bold text-neutral-800 mb-6">
//                 {currentFees.title} - Fee Breakdown
//               </h2>
              
//               <div className="space-y-4">
//                 {currentFees.fees.map((fee, index) => (
//                   <div key={index} className={`p-4 rounded-lg border-2 ${
//                     fee.required ? 'border-primary-200 bg-primary-25' : 'border-neutral-200 bg-neutral-50'
//                   }`}>
//                     <div className="flex items-center justify-between mb-2">
//                       <div className="flex items-center gap-2">
//                         <h3 className="font-semibold text-neutral-800">
//                           {fee.item}
//                         </h3>
//                         {fee.required ? (
//                           <span className="badge-error text-xs px-2 py-1">Required</span>
//                         ) : (
//                           <span className="badge-info text-xs px-2 py-1">Optional</span>
//                         )}
//                       </div>
//                       <span className="text-lg font-bold text-neutral-800">
//                         ₦{fee.amount.toLocaleString()}
//                       </span>
//                     </div>
//                     <p className="text-sm text-neutral-600">
//                       {fee.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Payment Plans */}
//             <div className="card-base mb-8">
//               <h2 className="text-xl font-bold text-neutral-800 mb-6">
//                 Flexible Payment Plans
//               </h2>
              
//               <div className="grid md:grid-cols-3 gap-6">
//                 {paymentPlans.map((plan, index) => (
//                   <div key={index} className="border-2 border-neutral-200 rounded-lg p-6 hover:border-primary-300 transition-colors duration-200">
//                     <div className="text-center mb-4">
//                       <h3 className="text-lg font-bold text-neutral-800 mb-2">
//                         {plan.title}
//                       </h3>
//                       <div className="text-2xl font-bold text-primary-600 mb-2">
//                         {plan.discount}
//                       </div>
//                       <p className="text-sm text-neutral-600">
//                         {plan.description}
//                       </p>
//                     </div>
                    
//                     <div className="space-y-2">
//                       {plan.benefits.map((benefit, bIndex) => (
//                         <div key={bIndex} className="flex items-center gap-2">
//                           <CheckCircle className="w-4 h-4 text-secondary-600 flex-shrink-0" />
//                           <span className="text-xs text-neutral-700">{benefit}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Important Information */}
//             <div className="card-base mb-8">
//               <h2 className="text-xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
//                 <AlertCircle className="w-5 h-5 text-accent-600" />
//                 Important Payment Information
//               </h2>
              
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="font-semibold text-neutral-800 mb-3">Payment Guidelines</h3>
//                   <div className="space-y-2 text-sm text-neutral-700">
//                     <div className="flex gap-2">
//                       <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
//                       <p>Fees must be paid within the first two weeks of resumption</p>
//                     </div>
//                     <div className="flex gap-2">
//                       <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
//                       <p>Payment can be made via bank transfer, cash, or certified cheque</p>
//                     </div>
//                     <div className="flex gap-2">
//                       <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
//                       <p>Late payment attracts a penalty of ₦2,000 per week</p>
//                     </div>
//                     <div className="flex gap-2">
//                       <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
//                       <p>Students may be sent home for non-payment after 4 weeks</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div>
//                   <h3 className="font-semibold text-neutral-800 mb-3">Additional Information</h3>
//                   <div className="space-y-2 text-sm text-neutral-700">
//                     <div className="flex gap-2">
//                       <div className="w-1.5 h-1.5 bg-secondary-600 rounded-full mt-2 flex-shrink-0"></div>
//                       <p>Fees are reviewed annually and subject to adjustment</p>
//                     </div>
//                     <div className="flex gap-2">
//                       <div className="w-1.5 h-1.5 bg-secondary-600 rounded-full mt-2 flex-shrink-0"></div>
//                       <p>Sibling discount of 10% available for second child onwards</p>
//                     </div>
//                     <div className="flex gap-2">
//                       <div className="w-1.5 h-1.5 bg-secondary-600 rounded-full mt-2 flex-shrink-0"></div>
//                       <p>Scholarship opportunities available for exceptional students</p>
//                     </div>
//                     <div className="flex gap-2">
//                       <div className="w-1.5 h-1.5 bg-secondary-600 rounded-full mt-2 flex-shrink-0"></div>
//                       <p>Refunds processed only for medical withdrawals</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Contact for Payment */}
//             <div className="card-base text-center">
//               <h2 className="text-xl font-bold text-neutral-800 mb-4">
//                 Need Help with Payment?
//               </h2>
//               <p className="text-neutral-600 mb-6 text-balance">
//                 Our accounts office is available to assist with payment plans and answer 
//                 questions about fees. We're committed to making quality education accessible.
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <button className="btn-primary px-8 py-3 rounded-lg font-medium">
//                   Contact Accounts Office
//                 </button>
//                 <button className="btn-outline px-8 py-3 rounded-lg font-medium">
//                   Download Fee Schedule
//                 </button>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TuitionFees;