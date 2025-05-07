import axios from 'axios';
import { create } from 'zustand';

const useBoardStore = create((set) => ({
  boards: [],
  loading: false,
  error: null,

  addBoard: async (newBoard) => {
    set({ loading: true, error: null });

    console.log(newBoard);
    try {
      const result = await axios.post('http://localhost:3001/boards', newBoard);

      console.log('newBoard', newBoard);
      set((state) => ({ boards: [...state.boards, result.data], loading: false }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  getBoards: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get('http://localhost:3001/boards');

      set({ boards: response.data, loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
  updateBoard: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.put(`http://localhost:3001/boards/${id}`, updatedData);
      const updatedBoard = res.data;
      set((state) => ({
        boards: state.boards.map((b) => (b.id === Number(id) ? updatedBoard : b)),
      }));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
}));

export default useBoardStore;
