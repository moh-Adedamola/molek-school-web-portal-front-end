// pages/website/admissions/TuitionFees.jsx
import { DollarSign, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const TuitionFees = () => {
  const feeStructure = [
    {
      level: "JSS 1",
      tuition: "180,000",
      development: "25,000", 
      uniform: "15,000",
      books: "20,000",
      total: "240,000",
      color: "blue"
    },
    {
      level: "JSS 2-3",
      tuition: "175,000",
      development: "20,000",
      uniform: "12,000", 
      books: "18,000",
      total: "225,000",
      color: "green"
    },
    {
      level: "SSS 1-3",
      tuition: "200,000",
      development: "30,000",
      uniform: "15,000",
      books: "25,000", 
      total: "270,000",
      color: "orange"
    }
  ];

  const paymentOptions = [
    { 
      title: "Full Payment",
      desc: "Pay complete fees at once",
      discount: "5% discount",
      color: "green",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: "Two Installments", 
      desc: "50% at resumption, 50% mid-term",
      discount: "2% discount",
      color: "blue",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      title: "Three Installments",
      desc: "Spread across three terms",
      discount: "No discount",
      color: "orange", 
      icon: <DollarSign className="w-6 h-6" />
    }
  ];

  const additionalFees = [
    { item: "Application Fee", amount: "5,000 - 8,000", note: "Non-refundable", color: "red" },
    { item: "Registration Fee", amount: "15,000", note: "One-time payment", color: "blue" },
    { item: "Sports Fee", amount: "8,000", note: "Annual", color: "green" },
    { item: "Laboratory Fee (Science)", amount: "12,000", note: "SSS Science only", color: "purple" },
    { item: "Computer Fee", amount: "10,000", note: "Annual", color: "indigo" },
    { item: "Excursion/Trip", amount: "15,000", note: "Optional", color: "orange" }
  ];

  const scholarships = [
    { type: "Academic Excellence", criteria: "Top 5% WAEC results", coverage: "50%", color: "gold" },
    { type: "Need-Based", criteria: "Financial need assessment", coverage: "30%", color: "blue" },
    { type: "Sports Excellence", criteria: "State/National level", coverage: "25%", color: "green" },
    { type: "Staff Children", criteria: "School staff members", coverage: "20%", color: "purple" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Hero */}
      <div className="bg-primary-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Tuition & Fees</h1>
          <p className="text-xl text-primary-200">Transparent fee structure for quality education</p>
        </div>
      </div>

      {/* Fee Structure Table */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-12">Annual Fee Structure (₦)</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-primary-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Level</th>
                  <th className="px-6 py-4 text-center">Tuition</th>
                  <th className="px-6 py-4 text-center">Development</th>
                  <th className="px-6 py-4 text-center">Uniform</th>
                  <th className="px-6 py-4 text-center">Books</th>
                  <th className="px-6 py-4 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {feeStructure.map((fee, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className={`px-6 py-4 font-bold text-${fee.color}-800`}>{fee.level}</td>
                    <td className="px-6 py-4 text-center">₦{fee.tuition}</td>
                    <td className="px-6 py-4 text-center">₦{fee.development}</td>
                    <td className="px-6 py-4 text-center">₦{fee.uniform}</td>
                    <td className="px-6 py-4 text-center">₦{fee.books}</td>
                    <td className={`px-6 py-4 text-center font-bold text-${fee.color}-600`}>₦{fee.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payment Options */}
      <div className="py-16 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-12">Payment Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {paymentOptions.map((option, i) => (
              <div key={i} className={`bg-white p-6 rounded-xl shadow-lg border-t-4 border-${option.color}-500`}>
                <div className={`text-${option.color}-600 mb-4`}>{option.icon}</div>
                <h3 className={`text-xl font-bold text-${option.color}-800 mb-3`}>{option.title}</h3>
                <p className="text-neutral-600 mb-4">{option.desc}</p>
                <div className={`bg-${option.color}-50 p-3 rounded text-center`}>
                  <span className={`font-bold text-${option.color}-600`}>{option.discount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Fees */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-12">Additional Fees</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {additionalFees.map((fee, i) => (
              <div key={i} className={`bg-${fee.color}-50 p-6 rounded-lg border-l-4 border-${fee.color}-500 shadow-sm`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className={`font-bold text-${fee.color}-800 mb-1`}>{fee.item}</h4>
                    <p className="text-neutral-600 text-sm">{fee.note}</p>
                  </div>
                  <div className={`text-lg font-bold text-${fee.color}-600`}>₦{fee.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scholarships */}
      <div className="py-16 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-12">Scholarship Opportunities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scholarships.map((scholarship, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <h3 className={`font-bold text-${scholarship.color}-600 mb-3`}>{scholarship.type}</h3>
                <p className="text-neutral-600 text-sm mb-4">{scholarship.criteria}</p>
                <div className={`bg-${scholarship.color}-100 p-3 rounded`}>
                  <span className="text-sm text-neutral-600">Coverage: </span>
                  <span className={`font-bold text-${scholarship.color}-600`}>{scholarship.coverage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="py-16 bg-primary-800 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Payment Information</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 p-6 rounded-xl">
              <CheckCircle className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Accepted Payments</h3>
              <div className="text-sm text-primary-200">
                Bank Transfer • Online Payment • POS • Cash (Office only)
              </div>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <AlertCircle className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Important Notes</h3>
              <div className="text-sm text-primary-200">
                Fees are subject to review • Payment receipts required • Late payment penalties apply
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuitionFees;