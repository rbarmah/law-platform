import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProgramStore } from '../store/useProgramStore';
import { AlertCircle } from 'lucide-react';

const ProgramSelection = () => {
  const navigate = useNavigate();
  const { programs, selectedProgram, isLoading, error, fetchPrograms, setSelectedProgram } = useProgramStore();

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  useEffect(() => {
    if (selectedProgram) {
      navigate('/');
    }
  }, [selectedProgram, navigate]);

  const handleProgramSelect = (programId: string) => {
    setSelectedProgram(programId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 max-w-md">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-teal-100/40 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Welcome to Masterie
            </h1>
            <p className="text-lg text-slate-600">
              Choose your program to start your learning journey
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program, index) => (
            <motion.button
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => program.is_available && handleProgramSelect(program.id)}
              className={`relative overflow-hidden rounded-xl p-6 text-left transition-all duration-300 ${
                program.is_available
                  ? 'hover:scale-102 hover:-translate-y-1'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <div className={`absolute inset-0 ${
                program.is_available
                  ? 'bg-white dark:bg-slate-800'
                  : 'bg-slate-100 dark:bg-slate-800/50'
              } rounded-xl border border-slate-200 dark:border-slate-700`}></div>
              
              <div className="relative flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/10 to-teal-600/10 flex items-center justify-center text-2xl">
                  {program.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
                    {program.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {program.description}
                  </p>
                  {!program.is_available && (
                    <p className="mt-2 text-sm font-medium text-orange-600 dark:text-orange-400">
                      Coming soon
                    </p>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramSelection;