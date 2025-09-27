import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    transgenderId: '',
    aadhaarNumber: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'transgenderId':
        if (!value.trim()) {
          newErrors.transgenderId = 'Transgender ID is required';
        } else if (value.length < 8) {
          newErrors.transgenderId = 'Transgender ID must be at least 8 characters';
        } else {
          delete newErrors.transgenderId;
        }
        break;
      
      case 'aadhaarNumber':
        if (!value.trim()) {
          newErrors.aadhaarNumber = 'Aadhaar Number is required';
        } else if (!/^\d{12}$/.test(value.replace(/\s/g, ''))) {
          newErrors.aadhaarNumber = 'Aadhaar Number must be 12 digits';
        } else {
          delete newErrors.aadhaarNumber;
        }
        break;
      
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;
      
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors.password = 'Password must contain uppercase, lowercase, and number';
        } else {
          delete newErrors.password;
        }
        break;
      
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeToTerms: checked }));
    if (!checked) {
      setErrors(prev => ({ ...prev, agreeToTerms: 'You must agree to the terms and conditions' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.agreeToTerms;
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      if (key !== 'agreeToTerms') {
        validateField(key, formData[key as keyof typeof formData] as string);
      }
    });

    if (!formData.agreeToTerms) {
      setErrors(prev => ({ ...prev, agreeToTerms: 'You must agree to the terms and conditions' }));
    }

    // Check if there are any errors
    if (Object.keys(errors).length > 0 || !formData.agreeToTerms) {
      toast({
        title: "Please fix the errors",
        description: "Check all fields and try again.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Registration Successful!",
        description: "Welcome to TransEmpower. Please check your email for verification.",
        variant: "default",
      });

      // Reset form
      setFormData({
        transgenderId: '',
        aadhaarNumber: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
      });
      
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/20 to-secondary/20">
      <Navigation />
      
      <div className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="empowerment-card p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center shadow-[var(--shadow-card)]">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gradient-empowerment mb-2">Join TransEmpower</h1>
              <p className="text-muted-foreground">Create your account to access all services</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Transgender ID */}
              <div className="space-y-2">
                <Label htmlFor="transgenderId" className="text-sm font-medium">
                  Transgender ID *
                </Label>
                <Input
                  id="transgenderId"
                  name="transgenderId"
                  type="text"
                  value={formData.transgenderId}
                  onChange={handleInputChange}
                  className={`form-input ${errors.transgenderId ? 'border-destructive' : ''}`}
                  placeholder="Enter your Transgender ID"
                />
                {errors.transgenderId && (
                  <div className="flex items-center space-x-2 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.transgenderId}</span>
                  </div>
                )}
              </div>

              {/* Aadhaar Number */}
              <div className="space-y-2">
                <Label htmlFor="aadhaarNumber" className="text-sm font-medium">
                  Aadhaar Number *
                </Label>
                <Input
                  id="aadhaarNumber"
                  name="aadhaarNumber"
                  type="text"
                  value={formData.aadhaarNumber}
                  onChange={handleInputChange}
                  className={`form-input ${errors.aadhaarNumber ? 'border-destructive' : ''}`}
                  placeholder="Enter your 12-digit Aadhaar number"
                  maxLength={12}
                />
                {errors.aadhaarNumber && (
                  <div className="flex items-center space-x-2 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.aadhaarNumber}</span>
                  </div>
                )}
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-input ${errors.name ? 'border-destructive' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <div className="flex items-center space-x-2 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? 'border-destructive' : ''}`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <div className="flex items-center space-x-2 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password *
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`form-input pr-12 ${errors.password ? 'border-destructive' : ''}`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground focus-ring"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center space-x-2 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password *
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`form-input ${errors.confirmPassword ? 'border-destructive' : ''}`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <div className="flex items-center space-x-2 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={handleCheckboxChange}
                    className="mt-1"
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                    I agree to the{' '}
                    <a href="#" className="text-primary hover:underline font-medium">
                      Terms & Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary hover:underline font-medium">
                      Privacy Policy
                    </a>
                    . I understand that my data will be handled securely and confidentially.
                  </Label>
                </div>
                {errors.agreeToTerms && (
                  <div className="flex items-center space-x-2 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.agreeToTerms}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="btn-accent w-full text-lg py-3 focus-ring"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Create Account</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6 pt-6 border-t border-border">
              <p className="text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-trust-light/20 border border-trust-light rounded-xl">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-trust flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-trust mb-1">Your Privacy Matters</h4>
                <p className="text-sm text-muted-foreground">
                  All personal information is encrypted and stored securely. We never share your data with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;