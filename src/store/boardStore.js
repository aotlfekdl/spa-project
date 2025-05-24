import axios from 'axios';
import { create } from 'zustand';

const useBoardStore = create((set) => ({
  boards: [],
  boardDetail: null, 
  loading: false,
  error: null,

  addBoard: async (formData) => {
    set({ loading: true, error: null });
    console.log("addBoard");
    console.log(formData.Number)
    console.log(formData)

    try {
      const result = await axios.post('http://localhost:8888/api/boards', formData);

      set((state) => ({ boards: [...state.boards, result.data], loading: false }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // 게시글List 가져오기
  getBoards: async () => {
    set({ loading: true, error: null });

    try {
      
      const response = await axios.get(`http://localhost:8888/api/boards`);
      const data = response.data;
      console.log("response.data", data);

      set({ boards: data, loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },


  //게시글 정보 가져오기
 getBoardInfo: async (id) => {
  set({ loading: true, error: null });

  try {
    const response = await axios.get(`http://localhost:8888/api/boards/${id}`);

    set({ boardDetail: response.data,loading: false });
  } catch (error) {
    set({ loading: false, error: error.message });
  }
},
  updateBoard: async (id, formData) => {
    set({ loading: true, error: null });
    console.log("UpdateBoard", formData);
    try {
      const res = await axios.patch(`http://localhost:8888/api/boards/${id}`, formData);
      const updatedBoard = res.data;
      set((state) => ({
        boards: state.boards.map((b) => (b.id === Number(id) ? updatedBoard : b)),
      }));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  deleteBoard: async (id) =>{
    set({ loading: true, error: null});

    try{
      await axios.delete(`http:localhost:8888/api/boards/${id}`)

      set({loading: false});
    }catch(error) {
      set({loading: false, error: error.message})
    }
  }
}));

export default useBoardStore;
