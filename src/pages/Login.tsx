import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Shield, Smartphone, KeyRound, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [aadhaarForm, setAadhaarForm] = useState({
    aadhaarNumber: '',
    otp: ''
  });
  
  const [tgIdForm, setTgIdForm] = useState({
    transgenderId: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAadhaarInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAadhaarForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTgIdInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTgIdForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSendOtp = async () => {
    if (!aadhaarForm.aadhaarNumber.trim()) {
      setErrors({ aadhaarNumber: 'Aadhaar Number is required' });
      return;
    }
    
    if (!/^\d{12}$/.test(aadhaarForm.aadhaarNumber.replace(/\s/g, ''))) {
      setErrors({ aadhaarNumber: 'Please enter a valid 12-digit Aadhaar number' });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setOtpSent(true);
      toast({
        title: "OTP Sent Successfully",
        description: "Please check your registered mobile number for the OTP.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to Send OTP",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAadhaarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!aadhaarForm.otp.trim()) {
      setErrors({ otp: 'OTP is required' });
      return;
    }
    
    if (!/^\d{6}$/.test(aadhaarForm.otp)) {
      setErrors({ otp: 'Please enter a valid 6-digit OTP' });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Login Successful",
        description: "Welcome back! Redirecting to your dashboard...",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Invalid OTP",
        description: "Please check your OTP and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTgIdLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!tgIdForm.transgenderId.trim()) {
      newErrors.transgenderId = 'Transgender ID is required';
    }
    
    if (!tgIdForm.password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Login Successful",
        description: "Welcome back! Redirecting to your dashboard...",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
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
                <div className="w-16 h-16 bg-gradient-to-r from-trust to-primary rounded-2xl flex items-center justify-center shadow-[var(--shadow-trust)]">
                  <KeyRound className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gradient-primary mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Choose your preferred login method</p>
            </div>

            <Tabs defaultValue="aadhaar" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="aadhaar" className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Aadhaar OTP</span>
                </TabsTrigger>
                <TabsTrigger value="tgid" className="flex items-center space-x-2">
                  <KeyRound className="w-4 h-4" />
                  <span>TG ID</span>
                </TabsTrigger>
              </TabsList>

              {/* Aadhaar Login */}
              <TabsContent value="aadhaar" className="space-y-6">
                <div className="p-4 bg-primary-light/20 border border-primary-light rounded-xl">
                  <div className="flex items-start space-x-3">
                    <Smartphone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-primary mb-1">Secure OTP Login</h4>
                      <p className="text-sm text-muted-foreground">
                        We'll send a 6-digit OTP to your registered mobile number
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleAadhaarLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="aadhaarNumber" className="text-sm font-medium">
                      Aadhaar Number *
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="aadhaarNumber"
                        name="aadhaarNumber"
                        type="text"
                        value={aadhaarForm.aadhaarNumber}
                        onChange={handleAadhaarInputChange}
                        className={`form-input flex-1 ${errors.aadhaarNumber ? 'border-destructive' : ''}`}
                        placeholder="Enter 12-digit Aadhaar number"
                        maxLength={12}
                        disabled={otpSent}
                      />
                      <Button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={loading || otpSent}
                        className="btn-primary px-4"
                      >
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : otpSent ? (
                          'Sent'
                        ) : (
                          'Send OTP'
                        )}
                      </Button>
                    </div>
                    {errors.aadhaarNumber && (
                      <div className="flex items-center space-x-2 text-destructive text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.aadhaarNumber}</span>
                      </div>
                    )}
                  </div>

                  {otpSent && (
                    <div className="space-y-2 animate-fade-in">
                      <Label htmlFor="otp" className="text-sm font-medium">
                        Enter OTP *
                      </Label>
                      <Input
                        id="otp"
                        name="otp"
                        type="text"
                        value={aadhaarForm.otp}
                        onChange={handleAadhaarInputChange}
                        className={`form-input ${errors.otp ? 'border-destructive' : ''}`}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                      />
                      {errors.otp && (
                        <div className="flex items-center space-x-2 text-destructive text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.otp}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Didn't receive OTP?</span>
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setAadhaarForm(prev => ({ ...prev, otp: '' }));
                          }}
                          className="text-primary hover:underline font-medium"
                        >
                          Resend OTP
                        </button>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading || !otpSent}
                    className="btn-primary w-full text-lg py-3 focus-ring"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Verify & Login</span>
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Transgender ID Login */}
              <TabsContent value="tgid" className="space-y-6">
                <div className="p-4 bg-trust-light/20 border border-trust-light rounded-xl">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-trust flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-trust mb-1">Secure Password Login</h4>
                      <p className="text-sm text-muted-foreground">
                        Login using your Transgender ID and password
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleTgIdLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="transgenderId" className="text-sm font-medium">
                      Transgender ID *
                    </Label>
                    <Input
                      id="transgenderId"
                      name="transgenderId"
                      type="text"
                      value={tgIdForm.transgenderId}
                      onChange={handleTgIdInputChange}
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

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password *
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={tgIdForm.password}
                        onChange={handleTgIdInputChange}
                        className={`form-input pr-12 ${errors.password ? 'border-destructive' : ''}`}
                        placeholder="Enter your password"
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
                    <div className="text-right">
                      <a href="#" className="text-sm text-primary hover:underline">
                        Forgot Password?
                      </a>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="btn-trust w-full text-lg py-3 focus-ring"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing In...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <KeyRound className="w-5 h-5" />
                        <span>Sign In</span>
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Register Link */}
            <div className="text-center mt-8 pt-6 border-t border-border">
              <p className="text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Register here
                </Link>
              </p>
            </div>
          </Card>

          {/* Help Section */}
          <div className="mt-6 p-4 bg-accent-light/20 border border-accent-light rounded-xl">
            <div className="text-center">
              <h4 className="font-medium text-accent mb-2">Need Help?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                If you're having trouble logging in, our support team is here to help.
              </p>
              <Link to="/contact">
                <Button variant="outline" className="text-accent border-accent hover:bg-accent-light/10">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;