import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Program {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface ProgramSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (programId: string) => void;
}

const programs: Program[] = [
  {
    id: 'law',
    name: 'Law',
    description: 'Study legal principles, cases, and regulations',
    icon: '⚖️'
  },
  {
    id: 'accounting',
    name: 'Accounting',
    description: 'Master financial principles and practices',
    icon: '📊'
  },
  {
    id: 'political-science',
    name: 'Political Science',
    description: 'Explore governance, policy, and international relations',
    icon: '🏛️'
  },
  {
    id: 'business',
    name: 'Business Administration',
    description: 'Learn management and business strategies',
    icon: '💼'
  },
  {
    id: 'economics',
    name: 'Economics',
    description: 'Understand market dynamics and economic theories',
    icon: '📈'
  },
  {
    id: 'sociology',
    name: 'Sociology',
    description: 'Study social behavior and human societies',
    icon: '👥'
  }
];

const ProgramSelectionModal = ({ isOpen, onClose, onSelect }: ProgramSelectionModalProps) => {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const handleSelect = (programId: string) => {
    setSelectedProgram(programId);
    onSelect(programId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl p-4 z-50"
          >
            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700">
              {/* Header */}
              <div className="p-6 pb-0">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                      Choose Your Program
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Select the program you want to study in Masterie
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Program Grid */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {programs.map((program) => (
                  <motion.button
                    key={program.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(program.id)}
                    className={`relative overflow-hidden rounded-xl p-6 text-left transition-all duration-300 ${
                      selectedProgram === program.id
                        ? 'bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/25'
                        : 'bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/90 dark:bg-slate-800/90 flex items-center justify-center text-2xl shadow-sm">
                        {program.icon}
                      </div>
                      <div>
                        <h3 className={`text-lg font-semibold mb-1 ${
                          selectedProgram === program.id
                            ? 'text-white'
                            : 'text-slate-800 dark:text-white'
                        }`}>
                          {program.name}
                        </h3>
                        <p className={`text-sm ${
                          selectedProgram === program.id
                            ? 'text-white/90'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}>
                          {program.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProgramSelectionModal;