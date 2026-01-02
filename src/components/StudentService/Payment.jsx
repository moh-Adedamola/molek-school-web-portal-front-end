import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaReceipt, FaDownload, FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';
import { useStudentAuth } from '../../context/StudentAuthContext';
import logo from '/logo.webp';

// Mock data - Will be replaced with real API data in future
const payableItems = [
    { id: 1, name: 'Tuition Fee', amount: 150000, description: 'Annual tuition fee', dueDate: '2025-02-01' },
    { id: 2, name: 'Textbooks', amount: 25000, description: 'Required textbooks for the term', dueDate: '2025-02-15' },
    { id: 3, name: 'Field Trip', amount: 15000, description: 'Science Museum Excursion', dueDate: '2025-03-01' },
    { id: 4, name: 'Uniform', amount: 18000, description: 'Full school uniform set', dueDate: '2025-02-10' },
    { id: 5, name: 'Exam Fee', amount: 8000, description: 'End-of-term examination fee', dueDate: '2025-03-20' },
];

const paidHistory = [
    { id: 1, item: 'Registration Fee', amount: 50000, date: '2024-09-15', receiptId: 'REC-2024-001' },
    { id: 2, item: 'First Term Fee', amount: 100000, date: '2024-10-05', receiptId: 'REC-2024-002' },
];

const Payment = () => {
    const { student } = useStudentAuth();
    const [paid, setPaid] = useState(paidHistory);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const fullName = student?.first_name && student?.last_name
        ? `${student.first_name} ${student.middle_name || ''} ${student.last_name}`.trim()
        : student?.full_name || 'Student';

    const handlePay = (item) => {
        const mockPayment = {
            ...item,
            date: new Date().toISOString().split('T')[0],
            receiptId: `REC-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        };
        setPaid([mockPayment, ...paid]);
        setShowSuccess(true);
        setSelectedItem(null);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const downloadReceipt = (receiptId, item, amount, date) => {
        const receiptContent = `
MOLEK SCHOOLS
Official Payment Receipt
================================

Receipt Number: ${receiptId}
Student Name: ${fullName}
Admission Number: ${student?.admission_number}

Item: ${item}
Amount: ₦${amount.toLocaleString()}
Payment Date: ${date}

================================
Thank you for your payment!

This is an official receipt from MOLEK Schools.
For inquiries, contact: info@molekschool.com
    `;
        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${receiptId}_${student?.admission_number}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const totalPending = payableItems.reduce((sum, item) => sum + item.amount, 0);
    const totalPaid = paid.reduce((sum, item) => sum + item.amount, 0);

    return (
        <motion.main
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 md:p-6 bg-gray-50 min-h-screen"
        >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <img
                    src={student?.passport_url || logo}
                    alt={fullName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                    onError={(e) => (e.target.src = logo)}
                />
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Payments</h1>
                    <p className="text-sm text-gray-600">Manage your school fees and payments</p>
                </div>
            </div>

            {/* Success Message */}
            {showSuccess && (
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-3"
                >
                    <FaCheckCircle className="text-green-600 text-xl" />
                    <div>
                        <p className="font-semibold">Payment Successful!</p>
                        <p className="text-sm">Your receipt has been generated.</p>
                    </div>
                </motion.div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium opacity-90">Total Pending</h3>
                        <FaMoneyBillWave className="text-2xl opacity-80" />
                    </div>
                    <p className="text-3xl font-bold">₦{totalPending.toLocaleString()}</p>
                    <p className="text-sm opacity-80 mt-1">{payableItems.length} items</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium opacity-90">Total Paid</h3>
                        <FaReceipt className="text-2xl opacity-80" />
                    </div>
                    <p className="text-3xl font-bold">₦{totalPaid.toLocaleString()}</p>
                    <p className="text-sm opacity-80 mt-1">{paid.length} payments</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium opacity-90">Account Status</h3>
                        <FaCheckCircle className="text-2xl opacity-80" />
                    </div>
                    <p className="text-2xl font-bold">
                        {totalPending === 0 ? 'Clear' : 'Pending'}
                    </p>
                    <p className="text-sm opacity-80 mt-1">Payment status</p>
                </div>
            </div>

            {/* Payable Items */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100"
            >
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                    <FaMoneyBillWave className="text-blue-600" />
                    Pending Payments
                </h2>

                {payableItems.length > 0 ? (
                    <div className="space-y-4">
                        {payableItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col md:flex-row md:items-center justify-between p-4 border-2 border-gray-100 rounded-xl hover:border-blue-200 transition-all"
                            >
                                <div className="flex-1 mb-3 md:mb-0">
                                    <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    <p className="text-xs text-gray-500 mt-1">Due: {new Date(item.dueDate).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xl md:text-2xl font-bold text-green-600">₦{item.amount.toLocaleString()}</span>
                                    <button
                                        onClick={() => setSelectedItem(item)}
                                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                                    >
                                        Pay Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg">No pending payments</p>
                        <p className="text-gray-500 text-sm">All fees have been paid!</p>
                    </div>
                )}
            </motion.div>

            {/* Payment History */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
            >
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                    <FaReceipt className="text-green-600" />
                    Payment History ({new Date().getFullYear()})
                </h2>

                {paid.length > 0 ? (
                    <div className="space-y-3">
                        {paid.map((payment, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-green-50 border border-green-100 rounded-xl"
                            >
                                <div className="flex-1 mb-3 md:mb-0">
                                    <h3 className="font-semibold text-gray-800">{payment.item}</h3>
                                    <p className="text-sm text-gray-600">
                                        {new Date(payment.date).toLocaleDateString()} • Receipt #{payment.receiptId}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-lg font-bold text-green-600">₦{payment.amount.toLocaleString()}</span>
                                    <button
                                        onClick={() => downloadReceipt(payment.receiptId, payment.item, payment.amount, payment.date)}
                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
                                    >
                                        <FaDownload />
                                        Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <FaReceipt className="text-6xl text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No payment history</p>
                        <p className="text-gray-400 text-sm">Your payments will appear here</p>
                    </div>
                )}
            </motion.div>

            {/* Payment Modal */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
                    >
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Confirm Payment</h3>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Item:</span>
                                <span className="font-semibold text-gray-800">{selectedItem.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Amount:</span>
                                <span className="font-bold text-green-600 text-xl">₦{selectedItem.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Student:</span>
                                <span className="font-medium text-gray-800">{fullName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Admission No:</span>
                                <span className="font-medium text-gray-800">{student?.admission_number}</span>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                            <p className="text-sm text-yellow-800">
                                <strong>Note:</strong> This is a demo payment. In production, this will integrate with a real payment gateway.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => handlePay(selectedItem)}
                                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                            >
                                Confirm Payment
                            </button>
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.main>
    );
};

export default Payment;