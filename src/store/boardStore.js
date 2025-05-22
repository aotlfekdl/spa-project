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
      const result = await axios.post('http://localhost:8888/api/boards', newBoard);

      console.log('newBoard', newBoard);
      set((state) => ({ boards: [...state.boards, result.data], loading: false }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  getBoards: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get('http://localhost:8888/api/boards');
      const data = response.data;

      console.log('boards 응답:', data);

      set({ boards: Array.isArray(data) ? data : [], loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
  updateBoard: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.put(`http://localhost:8888/api/boards/${id}`, updatedData);
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
