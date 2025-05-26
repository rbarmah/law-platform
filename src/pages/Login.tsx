import { useState, FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center px-4 bg-auth-pattern bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-hubtel-navy/40 backdrop-blur-sm"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full relative"
      >
        <div className="glassmorphism rounded-2xl shadow-glass p-8 border border-white/20">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-hubtel-orange to-hubtel-teal mb-4"
            >
              <div className="text-2xl font-bold text-white">L</div>
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/80">Sign in to continue your learning journey</p>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-200 px-4 py-3 rounded-lg mb-6 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">{getErrorMessage()}</p>
                <p className="text-sm mt-1 text-rose-200/80">Please check your credentials and try again.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email" className="form-label text-white">Email Address</label>
              <input
                type="email"
                id="email"
                required
                className="input w-full bg-white/10 border-white/10 text-white placeholder-white/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                disabled={isLoading}
                placeholder="Enter your email"
              />
              {touched.email && !email && (
                <p className="text-sm text-rose-200 mt-1">Email is required</p>
              )}
            </div>

            <div className="form-group">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="form-label text-white">Password</label>
                <Link 
                  to="/reset-password" 
                  className="text-sm text-hubtel-teal hover:text-hubtel-teal/80"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                required
                className="input w-full bg-white/10 border-white/10 text-white placeholder-white/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                disabled={isLoading}
                placeholder="Enter your password"
              />
              {touched.password && !password && (
                <p className="text-sm text-rose-200 mt-1">Password is required</p>
              )}
            </div>

            <button
              type="submit"
              className="btn w-full mt-6 bg-gradient-to-r from-hubtel-orange to-hubtel-teal text-white font-semibold hover:brightness-110 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-white/80">
            Don't have an account?{' '}
            <Link to="/register" className="text-hubtel-teal hover:text-hubtel-teal/80">
              Sign up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;