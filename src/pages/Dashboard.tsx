import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Target, Award, DivideIcon as LucideIcon, TrendingUp, Clock, Calendar, Trophy } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import UserXPProgress from '../components/UserXPProgress';
import { getCategories, getUserAchievements } from '../lib/supabase';
import type { Category, UserAchievement } from '../types/database.types';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (user) {
        const [categoriesData, achievementsData] = await Promise.all([
          getCategories(),
          getUserAchievements(user.id)
        ]);
        
        setCategories(categoriesData);
        setAchievements(achievementsData);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Section with Gradient Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500 to-teal-600 p-8 mb-8 shadow-xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {user.username.charAt(0).toUpperCase()}
          </div>
          
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {user.username}!
            </h1>
            <p className="text-teal-50 mb-4">
              Continue your learning journey and level up your knowledge
            </p>
            <UserXPProgress user={user} />
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {renderStatCard("Total XP", user.xp, TrendingUp, "from-orange-500 to-orange-600")}
        {renderStatCard("Current Level", user.level, Trophy, "from-purple-500 to-purple-600")}
        {renderStatCard("Day Streak", user.streak_days, Calendar, "from-emerald-500 to-emerald-600")}
        {renderStatCard("Achievements", achievements.length, Award, "from-blue-500 to-blue-600")}
      </div>

      {/* Learning Paths Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.slice(0, 3).map((category, index) => (
            <Link key={category.id} to={`/quiz/${category.id}`}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/10 to-teal-600/10 dark:from-teal-500/20 dark:to-teal-600/20 flex items-center justify-center mb-4">
                    <div dangerouslySetInnerHTML={{ __html: category.icon }} className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">{category.name}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{category.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-teal-600 dark:text-teal-400">
                      {category.question_count} questions
                    </span>
                    <span className="text-teal-600 dark:text-teal-400 transform group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {renderActionCard(
            "Practice Mode",
            "Train with targeted questions in your weak areas",
            Target,
            "/categories",
            "from-teal-500 to-teal-600"
          )}
          {renderActionCard(
            "View Progress",
            "Check your learning statistics and achievements",
            Chart,
            "/profile",
            "from-orange-500 to-orange-600"
          )}
          {renderActionCard(
            "Leaderboard",
            "See how you rank against other learners",
            Trophy,
            "/leaderboard",
            "from-purple-500 to-purple-600"
          )}
        </div>
      </motion.div>

      {/* Recent Achievements */}
      {achievements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Achievements</h2>
            <Link 
              to="/achievements"
              className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium text-sm"
            >
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.slice(0, 3).map((achievement) => (
              <motion.div
                key={achievement.id}
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                
                <div className="relative flex flex-col items-center text-center">
                  <div 
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/10 dark:from-orange-500/20 dark:to-orange-600/20 flex items-center justify-center mb-4"
                    dangerouslySetInnerHTML={{ __html: achievement.achievement.icon }}
                  />
                  
                  <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white">
                    {achievement.achievement.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {achievement.achievement.description}
                  </p>
                  <div className="text-xs text-slate-500 dark:text-slate-500">
                    Earned on {new Date(achievement.achieved_at).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Helper function to render stat cards
function renderStatCard(
  title: string,
  value: number,
  Icon: LucideIcon,
  gradient: string
) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg border border-slate-200 dark:border-slate-700"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2`}></div>
      
      <div className="relative flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{title}</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{value.toLocaleString()}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Helper function to render action cards
function renderActionCard(
  title: string,
  description: string,
  Icon: LucideIcon,
  link: string,
  gradient: string
) {
  return (
    <Link to={link}>
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
        
        <div className="relative">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-4`}>
            <Icon className="w-6 h-6" />
          </div>
          
          <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">{title}</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">{description}</p>
          
          <div className="mt-4 text-teal-600 dark:text-teal-400 font-medium text-sm flex items-center">
            Get Started
            <span className="transform group-hover:translate-x-1 transition-transform duration-300 ml-1">
              →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default Dashboard;