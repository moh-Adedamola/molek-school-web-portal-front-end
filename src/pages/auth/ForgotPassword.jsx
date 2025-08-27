import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      toast.success('Password reset instructions sent to your email');
    }, 1500);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto text-center" padding="lg">
          <Card.Header>
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-secondary-600">📧</span>
            </div>
            <Card.Title className="text-2xl text-primary-800">
              Check Your Email
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-neutral-600 mb-6">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>
            <p className="text-sm text-neutral-500 mb-6">
              Didn't receive the email? Check your spam folder or contact school administration.
            </p>
            <Link to="/auth/login">
              <Button variant="primary" size="lg" className="w-full">
                Back to Login
              </Button>
            </Link>
          </Card.Content>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto" padding="lg">
        <Card.Header className="text-center mb-6">
          <Card.Title className="text-2xl text-primary-800">
            Reset Password
          </Card.Title>
          <p className="text-neutral-600 mt-2">
            Enter your email to receive reset instructions
          </p>
        </Card.Header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your school email"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            loading={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Instructions'}
          </Button>

          <div className="text-center">
            <Link 
              to="/auth/login" 
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;