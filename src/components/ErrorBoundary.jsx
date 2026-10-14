import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div role="alert" className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-6 text-center text-[17px] text-[#2D2D2D]">
                    <div className="max-w-md">
                        <h1 className="text-2xl font-bold text-[#1F3B6B] mb-4">Something went wrong.</h1>
                        <p className="mb-6">
                            Please refresh the page. If it keeps happening, call the school office on{' '}
                            <a href="tel:+2347066277945" className="font-semibold text-[#2563EB] underline underline-offset-2">0706 627 7945</a>.
                        </p>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="bg-[#1F3B6B] text-white px-6 py-3 min-h-12 rounded-full font-semibold hover:bg-[#2D2D2D] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1F3B6B]"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;