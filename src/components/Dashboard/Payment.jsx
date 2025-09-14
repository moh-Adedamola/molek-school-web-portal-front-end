import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaReceipt, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {useState} from "react";

const payableItems = [
    { id: 1, name: 'Tuition Fee', amount: 150000, description: 'Annual tuition for Grade 9' },
    { id: 2, name: 'Textbooks', amount: 25000, description: 'Required textbooks for the term' },
    { id: 3, name: 'Field Trip', amount: 15000, description: 'Science Museum Excursion' },
    { id: 4, name: 'Uniform', amount: 18000, description: 'Full school uniform set' },
    { id: 5, name: 'Exam Fee', amount: 8000, description: 'End-of-term examination fee' },
];

const paidHistory = [
    { id: 1, item: 'Tuition Fee', amount: 150000, date: '2024-08-15', receiptId: 'REC-2024-001' },
    { id: 2, item: 'Textbooks', amount: 25000, date: '2024-08-20', receiptId: 'REC-2024-002' },
    { id: 3, item: 'Field Trip', amount: 15000, date: '2024-10-05', receiptId: 'REC-2024-003' },
];

const Payment = () => {
    const [paid, setPaid] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);

    const handlePay = (item) => {
        const mockPayment = { ...item, date: new Date().toISOString().split('T')[0], receiptId: `REC-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}` };
        setPaid([mockPayment, ...paid]);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const downloadReceipt = (receiptId, item, amount, date) => {
        const receiptContent = `
MOLEK SCHOOLS
RECEIPT #${receiptId}

Item: ${item}
Amount: ₦${amount.toLocaleString()}
Date: ${date}

Thank you for your payment!
    `;
        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${receiptId}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <motion.main
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-gray-50 min-h-screen"
        >
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Payments</h1>
                <Link to="/dashboard" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
            </div>

            {showSuccess && (
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"
                >
                    <FaReceipt className="text-green-600" />
                    Payment successful! Receipt generated.
                </motion.div>
            )}

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100"
            >
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FaMoneyBillWave /> Payable Items
                </h2>
                <ul className="space-y-4">
                    {payableItems.map((item) => (
                        <li key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                            <div className="text-right">
                                <span className="font-bold text-green-600">₦{item.amount.toLocaleString()}</span>
                                <button
                                    onClick={() => handlePay(item)}
                                    className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                >
                                    Pay Now
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
            >
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FaReceipt /> Paid This Year ({new Date().getFullYear()})
                </h2>
                {paid.length > 0 ? (
                    <ul className="space-y-3">
                        {paid.map((payment) => (
                            <li key={payment.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                                <div>
                                    <h3 className="font-medium">{payment.item}</h3>
                                    <p className="text-sm text-gray-600">
                                        {payment.date} • #{payment.receiptId}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-green-600">₦{payment.amount.toLocaleString()}</span>
                                    <button
                                        onClick={() => downloadReceipt(payment.receiptId, payment.item, payment.amount, payment.date)}
                                        className="ml-4 flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        <FaDownload /> Download
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 italic">No payments made yet this year.</p>
                )}
            </motion.div>
        </motion.main>
    );
};

export default Payment;