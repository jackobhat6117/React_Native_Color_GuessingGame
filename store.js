import { create } from 'zustand'; 

const useStore = create((set) => ({
  mode: 'easy', // 'easy' or 'hard'
  language: 'english', // 'english', 'amharic', 
  colors: [],
  correctColor: null,
  score: 0,
  players: [],

  setMode: (mode) => set({ mode }),
  setLanguage: (language) => set({ language }),
  setColors: (colors) => set({ colors }),
  setCorrectColor: (correctColor) => set({ correctColor }),
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  addPlayer: (player) => set((state) => ({ players: [...state.players, player] })),
}));

export default useStore;