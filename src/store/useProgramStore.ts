import { create } from 'zustand';
import type { Program } from '../types/database.types';

type ProgramState = {
  programs: Program[];
  selectedProgram: string | null;
  isLoading: boolean;
  error: string | null;
  setSelectedProgram: (programId: string) => void;
  fetchPrograms: () => Promise<void>;
};

export const useProgramStore = create<ProgramState>((set) => ({
  programs: [],
  selectedProgram: localStorage.getItem('selectedProgram'),
  isLoading: false,
  error: null,

  setSelectedProgram: (programId: string) => {
    set({ selectedProgram: programId });
    localStorage.setItem('selectedProgram', programId);
  },

  fetchPrograms: async () => {
    set({ isLoading: true, error: null });
    try {
      // Mock data until we have the database set up
      const programs: Program[] = [
        {
          id: 'law',
          name: 'Law',
          description: 'Study legal principles, cases, and regulations',
          icon: '⚖️',
          is_available: true
        },
        {
          id: 'accounting',
          name: 'Accounting',
          description: 'Master financial principles and practices',
          icon: '📊',
          is_available: false
        },
        {
          id: 'political-science',
          name: 'Political Science',
          description: 'Explore governance, policy, and international relations',
          icon: '🏛️',
          is_available: false
        },
        {
          id: 'business',
          name: 'Business Administration',
          description: 'Learn management and business strategies',
          icon: '💼',
          is_available: false
        },
        {
          id: 'economics',
          name: 'Economics',
          description: 'Understand market dynamics and economic theories',
          icon: '📈',
          is_available: false
        },
        {
          id: 'sociology',
          name: 'Sociology',
          description: 'Study social behavior and human societies',
          icon: '👥',
          is_available: false
        }
      ];

      set({ programs, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  }
}));