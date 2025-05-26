import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white relative mb-6"
      >
        <div className="absolute top-1 right-1 w-3 h-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-sm"></div>
        <span className="text-2xl font-bold">M</span>
      </motion.div>
      <motion.h3 
        className="mt-4 font-bold text-lg bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading Masterie...
      </motion.h3>
    </div>
  );
};

export default LoadingScreen;