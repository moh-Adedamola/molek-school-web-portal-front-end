import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

const LoginForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-md mx-auto" padding="lg">
      <Card.Header className="text-center mb-6">
        <Card.Title className="text-2xl text-primary-800">
          School Portal Login
        </Card.Title>
        <p className="text-neutral-600 mt-2">
          Access your dashboard
        </p>
      </Card.Header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-neutral-600">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="/auth/forgot-password" className="text-primary-600 hover:text-primary-700">
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          loading={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      {/* Demo Credentials */}
      <Card className="mt-6 bg-neutral-50" padding="sm">
        <Card.Header>
          <Card.Title className="text-sm text-neutral-700">Demo Accounts</Card.Title>
        </Card.Header>
        <Card.Content className="text-xs text-neutral-600 space-y-1">
          <div><strong>Admin:</strong> admin@school.ng / admin123</div>
          <div><strong>Teacher:</strong> teacher@school.ng / teacher123</div>
          <div><strong>Parent:</strong> parent@school.ng / parent123</div>
        </Card.Content>
      </Card>
    </Card>
  );
};

export default LoginForm;