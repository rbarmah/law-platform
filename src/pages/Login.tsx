import { useState, FormEvent } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { AlertCircle, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Login = () => {
  const { user, signIn, error, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!email || !password) return;
    await signIn(email, password);
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-teal-100/40"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-teal-400/15 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-orange-400/15 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-teal-400/8 via-transparent to-orange-400/8 rounded-full blur-3xl"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl shadow-teal-500/8 p-8 relative overflow-hidden">
            {/* Subtle border gradient */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/20 via-transparent to-orange-500/20 p-px">
              <div className="w-full h-full bg-white/95 rounded-3xl"></div>
            </div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                {/* Masterie Logo */}
                <div className="w-16 h-16 mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl rotate-12 opacity-20 blur-sm"></div>
                  <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/25">
                    <div className="absolute top-1 right-1 w-4 h-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-sm"></div>
                    <span className="text-2xl font-bold text-white">M</span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                  Welcome back
                </h1>
                <p className="text-slate-600 font-medium">Sign in to continue to your account</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-gradient-to-r from-red-50 to-red-50/50 border border-red-200/60 rounded-2xl p-4 mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent"></div>
                  <div className="relative flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                      className={`relative w-full pl-12 pr-4 py-4 bg-white/80 border-2 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white/90 transition-all duration-300 font-medium ${
                        touched.email && !email ? 'border-red-300 bg-red-50/50' : 'border-slate-200 hover:border-slate-300'
                      }`}
                      placeholder="Enter your email address"
                      disabled={isLoading}
                    />
                  </div>
                  {touched.email && !email && (
                    <p className="mt-2 text-sm text-red-500 font-medium">Email is required</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                      className={`relative w-full pl-12 pr-12 py-4 bg-white/80 border-2 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white/90 transition-all duration-300 font-medium ${
                        touched.password && !password ? 'border-red-300 bg-red-50/50' : 'border-slate-200 hover:border-slate-300'
                      }`}
                      placeholder="Enter your password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {touched.password && !password && (
                    <p className="mt-2 text-sm text-red-500 font-medium">Password is required</p>
                  )}
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <Link 
                    to="/reset-password"
                    className="text-sm text-teal-600 hover:text-teal-700 font-semibold transition-colors relative group"
                  >
                    Forgot password?
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full py-4 px-6 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 active:from-teal-700 active:to-teal-800 text-white font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 hover:-translate-y-0.5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Signing you in...</span>
                      </div>
                    ) : (
                      <span className="relative">Sign In</span>
                    )}
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center pt-6 border-t border-slate-200/60">
                  <p className="text-slate-600 font-medium">
                    Don't have an account?{' '}
                    <Link 
                      to="/register"
                      className="text-teal-600 hover:text-teal-700 font-semibold transition-colors relative group"
                    >
                      Sign up
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center mt-8">
            <p className="text-sm text-slate-500 font-medium">
              🔒 Your data is protected with enterprise-grade security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;