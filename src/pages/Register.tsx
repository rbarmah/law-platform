import { useState } from 'react';
import { AlertCircle, Mail, Lock, User } from 'lucide-react';

const Register = () => {
  // Mock store functionality for demo
  const user = null;
  const error = null;
  const isLoading = false;
  const signUp = async (email, password, username) => {
    console.log('Sign up attempt:', { email, password, username });
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    username: false
  });

  const handleSubmit = async () => {
    setTouched({ email: true, password: true, username: true });
    if (!email || !password || !username) return;
    await signUp(email, password, username);
  };

  if (user) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-xl font-semibold text-white">H</span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Create your account</h1>
            <p className="text-gray-600 text-sm">Please fill in your details to get started</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-6 text-sm">
              <div className="flex gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, username: true }))}
                  className={`w-full pl-10 pr-3 py-2.5 border rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    touched.username && !username ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  placeholder="Enter username"
                  disabled={isLoading}
                />
              </div>
              {touched.username && !username && (
                <p className="mt-1.5 text-sm text-red-600">Username is required</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                  className={`w-full pl-10 pr-3 py-2.5 border rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    touched.email && !email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  placeholder="Enter email address"
                  disabled={isLoading}
                />
              </div>
              {touched.email && !email && (
                <p className="mt-1.5 text-sm text-red-600">Email is required</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                  className={`w-full pl-10 pr-3 py-2.5 border rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    touched.password && !password ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  placeholder="Enter password"
                  disabled={isLoading}
                />
              </div>
              {touched.password && !password && (
                <p className="mt-1.5 text-sm text-red-600">Password is required</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                'Create account'
              )}
            </button>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button 
                  onClick={() => console.log('Navigate to login')}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors bg-none border-none cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;