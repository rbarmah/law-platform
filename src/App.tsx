import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useProgramStore } from './store/useProgramStore';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProgramSelection from './pages/ProgramSelection';
import QuizPage from './pages/QuizPage';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Achievements from './pages/Achievements';
import Categories from './pages/Categories';
import QuizResults from './pages/QuizResults';
import ResetPassword from './pages/ResetPassword';
import UpdatePassword from './pages/UpdatePassword';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingScreen from './components/LoadingScreen';
import './index.css';

function App() {
  const { isLoading, refreshUser } = useAuthStore();
  const { selectedProgram } = useProgramStore();

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-white">
        <Navigation />
        <main className="container mx-auto px-4 py-8 pt-24">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/program-selection" element={
              <ProtectedRoute>
                <ProgramSelection />
              </ProtectedRoute>
            } />
            
            <Route path="/" element={
              <ProtectedRoute>
                {selectedProgram ? <Dashboard /> : <Navigate to="/program-selection" replace />}
              </ProtectedRoute>
            } />
            
            <Route path="/quiz/:categoryId?" element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            } />
            
            <Route path="/quiz-results" element={
              <ProtectedRoute>
                <QuizResults />
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            <Route path="/leaderboard" element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } />
            
            <Route path="/achievements" element={
              <ProtectedRoute>
                <Achievements />
              </ProtectedRoute>
            } />
            
            <Route path="/categories" element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;