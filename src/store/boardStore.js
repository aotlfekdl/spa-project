import axios from 'axios';
import { create } from 'zustand';

const useBoardStore = create((set) => ({
  boards: [],
  loading: false,
  error: null,

  addBoard: async (newBoard) => {
    set({ loading: true, error: null });

    try {
      const result = await axios.post('http://localhost:3001/boards', newBoard);

      set((state) => ({ boards: [...state.boards, result.data], loading: false }));
    } catch (err) {
      set({error:err.message, loading: false});
    }
  },
}));

export default useBoardStore;
