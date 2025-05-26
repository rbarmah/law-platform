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
    await signIn(email, password);
  };

  const getErrorMessage = () => {
    if (error?.includes('Invalid login credentials')) {
      return 'The email or password you entered is incorrect. Please try again.';
    }
    return error;
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-auth-pattern bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-gradient-to-br from-hubtel-navy/80 to-black/80 backdrop-blur-sm"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full relative"
      >
        <div className="glassmorphism rounded-3xl shadow-glass hover:shadow-glass-hover transition-all duration-500 border border-white/20">
          <div className="p-8 md:p-10">
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative mx-auto w-20 h-20 mb-6"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-hubtel-orange to-hubtel-teal opacity-20 blur-xl animate-gradient"></div>
                <div className="relative flex items-center justify-center w-full h-full rounded-2xl bg-gradient-to-br from-hubtel-orange to-hubtel-teal">
                  <span className="text-2xl font-bold text-white">L</span>
                </div>
              </motion.div>
              
              <h1 className="text-3xl font-bold text-white mb-3">Welcome Back</h1>
              <p className="text-white/70 text-lg">Sign in to continue your learning journey</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-rose-500/10 border border-rose-500/20 text-rose-200 p-4 rounded-xl mb-6 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{getErrorMessage()}</p>
                  <p className="text-sm mt-1 text-rose-200/80">Please check your credentials and try again.</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="form-group">
                <label htmlFor="email" className="form-label text-white/90 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    id="email"
                    required
                    className="input w-full pl-12 bg-white/10 border-white/10 text-white placeholder-white/40 focus:border-hubtel-teal/50 focus:ring-hubtel-teal/50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                    disabled={isLoading}
                    placeholder="Enter your email"
                  />
                </div>
                {touched.email && !email && (
                  <p className="text-sm text-rose-200/90 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Email is required
                  </p>
                )}
              </div>

              <div className="form-group">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="form-label text-white/90 mb-0">Password</label>
                  <Link 
                    to="/reset-password" 
                    className="text-sm text-hubtel-teal hover:text-hubtel-teal/80 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="password"
                    id="password"
                    required
                    className="input w-full pl-12 bg-white/10 border-white/10 text-white placeholder-white/40 focus:border-hubtel-teal/50 focus:ring-hubtel-teal/50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                    disabled={isLoading}
                    placeholder="Enter your password"
                  />
                </div>
                {touched.password && !password && (
                  <p className="text-sm text-rose-200/90 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Password is required
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="btn w-full h-12 bg-gradient-to-r from-hubtel-orange to-hubtel-teal text-white font-semibold text-lg rounded-xl hover:brightness-110 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 transition-all duration-300"
                disabled={isLoading}
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
              <p className="text-white/70">
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