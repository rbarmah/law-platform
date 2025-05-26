import { useState, FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { motion } from 'framer-motion';
import { AlertCircle, Mail, Lock } from 'lucide-react';

const Login = () => {
  const { user, signIn, error, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    
    // Basic validation
    if (!email || !password) {
      return;
    }
    
    await signIn(email, password);
  };

  const getErrorMessage = () => {
    if (!error) return '';
    
    if (error.includes('Invalid login credentials')) {
      return 'The email or password you entered is incorrect. Please try again.';
    }
    if (error.includes('Email not confirmed')) {
      return 'Please check your email and confirm your account before signing in.';
    }
    if (error.includes('Too many requests')) {
      return 'Too many login attempts. Please wait a moment before trying again.';
    }
    return error;
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const hasValidationErrors = () => {
    return (touched.email && (!email || !isValidEmail(email))) ||
           (touched.password && !password);
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen h-screen flex items-center justify-center px-4 bg-auth-pattern bg-cover bg-center bg-fixed overflow-hidden">
      {/* Stronger overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-hubtel-navy/90 to-black/90 w-full h-full"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full relative z-10"
      >
        {/* Enhanced glassmorphism container */}
        <div className="glassmorphism rounded-3xl shadow-glass hover:shadow-glass-hover transition-all duration-500">
          <div className="p-8 md:p-10">
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative mx-auto w-20 h-20 mb-6"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-hubtel-orange to-hubtel-teal opacity-30 blur-xl animate-gradient"></div>
                <div className="relative flex items-center justify-center w-full h-full rounded-2xl bg-gradient-to-br from-hubtel-orange to-hubtel-teal shadow-lg">
                  <span className="text-2xl font-bold text-white">L</span>
                </div>
              </motion.div>
              
              <h1 className="text-3xl font-bold text-white mb-3">Welcome Back</h1>
              <p className="text-white/80 text-lg">Sign in to continue your learning journey</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-rose-500/20 border border-rose-400/30 text-rose-100 p-4 rounded-xl mb-6 flex items-start gap-3 backdrop-blur-sm"
              >
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{getErrorMessage()}</p>
                  <p className="text-sm mt-1 text-rose-200/90">Please check your credentials and try again.</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-white/90">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="email"
                    id="email"
                    required
                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-hubtel-teal/50 focus:border-hubtel-teal/50 transition-all ${
                      touched.email && (!email || !isValidEmail(email)) ? 'border-rose-400/50 bg-rose-500/10' : ''
                    }`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                    disabled={isLoading}
                    placeholder="Enter your email"
                  />
                </div>
                {touched.email && !email && (
                  <p className="text-sm text-rose-200 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Email is required
                  </p>
                )}
                {touched.email && email && !isValidEmail(email) && (
                  <p className="text-sm text-rose-200 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Please enter a valid email address
                  </p>
                )}
              </div>

              <div className="form-group">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-white/90">Password</label>
                  <Link 
                    to="/reset-password" 
                    className="text-sm text-hubtel-teal hover:text-hubtel-teal/80 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="password"
                    id="password"
                    required
                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-hubtel-teal/50 focus:border-hubtel-teal/50 transition-all ${
                      touched.password && !password ? 'border-rose-400/50 bg-rose-500/10' : ''
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                    disabled={isLoading}
                    placeholder="Enter your password"
                  />
                </div>
                {touched.password && !password && (
                  <p className="text-sm text-rose-200 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Password is required
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="w-full h-12 bg-gradient-to-r from-hubtel-orange to-hubtel-teal text-white font-semibold text-lg rounded-xl hover:brightness-110 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 transition-all duration-300 shadow-lg"
                disabled={isLoading || hasValidationErrors()}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-white/80">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="text-hubtel-teal hover:text-hubtel-teal/80 font-medium transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;