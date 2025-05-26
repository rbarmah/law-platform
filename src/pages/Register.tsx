import { useState, FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { motion } from 'framer-motion';
import { AlertCircle, Mail, Lock, User } from 'lucide-react';

const Register = () => {
  const { user, signUp, error, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    username: false
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true, username: true });
    if (!email || !password || !username) return;
    await signUp(email, password, username);
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#001B36] px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#001B36]/90 to-black/90" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-xl">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 mx-auto mb-6 relative"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FF6634] to-[#00C9B6] opacity-30 blur-xl animate-pulse" />
              <div className="relative flex items-center justify-center w-full h-full rounded-2xl bg-gradient-to-br from-[#FF6634] to-[#00C9B6]">
                <span className="text-2xl font-bold text-white">H</span>
              </div>
            </motion.div>
            
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-white/80">Join our community today</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-400/30 text-red-100 p-4 rounded-xl mb-6"
            >
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, username: true }))}
                  className={`w-full pl-12 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#00C9B6]/50 transition-all ${
                    touched.username && !username ? 'border-red-400/50' : 'border-white/20'
                  }`}
                  placeholder="Choose a username"
                  disabled={isLoading}
                />
              </div>
              {touched.username && !username && (
                <p className="mt-2 text-sm text-red-400">Username is required</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                  className={`w-full pl-12 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#00C9B6]/50 transition-all ${
                    touched.email && !email ? 'border-red-400/50' : 'border-white/20'
                  }`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              {touched.email && !email && (
                <p className="mt-2 text-sm text-red-400">Email is required</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                  className={`w-full pl-12 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#00C9B6]/50 transition-all ${
                    touched.password && !password ? 'border-red-400/50' : 'border-white/20'
                  }`}
                  placeholder="Create a password"
                  disabled={isLoading}
                />
              </div>
              {touched.password && !password && (
                <p className="mt-2 text-sm text-red-400">Password is required</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#FF6634] to-[#00C9B6] text-white font-medium rounded-xl hover:brightness-110 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            <p className="text-center text-white/80">
              Already have an account?{' '}
              <Link 
                to="/login"
                className="text-[#00C9B6] hover:text-[#00C9B6]/80 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;