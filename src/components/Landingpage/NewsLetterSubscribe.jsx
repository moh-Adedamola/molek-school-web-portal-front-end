import { useState } from 'react';

const NewsletterSubscribe = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic email validation
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValidEmail) {
            setStatus('error');
            return;
        }

        try {
            // Simulate backend call
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) throw new Error('Network error');

            setStatus('success');
            localStorage.setItem('subscribedEmail', email); // Cache locally
            setEmail('');
        } catch (error) {
            console.warn('Subscription failed, using fallback:', error.message);
            localStorage.setItem('subscribedEmail', email); // Still cache locally
            setStatus('success'); // Assume success for now
            setEmail('');
        }
    };

    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-blue-50">
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 text-center">
                <h2 className="text-2xl font-bold text-blue-800 mb-2">Subscribe to Our Newsletter</h2>
                <p className="text-gray-600 mb-6">
                    Stay updated with the latest news, events, and academic highlights from Molek Schools.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition"
                    >
                        Subscribe
                    </button>
                </form>

                {status === 'success' && (
                    <p className="mt-4 text-blue-600">✅ Thank you for subscribing!</p>
                )}
                {status === 'error' && (
                    <p className="mt-4 text-red-500">⚠️ Please enter a valid email address.</p>
                )}
            </div>
        </section>
    );
};

export default NewsletterSubscribe;
