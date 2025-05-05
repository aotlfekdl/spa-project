  import axios from 'axios';
  import { create } from 'zustand';

  const useBoardStore = create((set) => ({
    boards: [],
    loading: false,
    error: null,

    addBoard: async (newBoard) => {
      set({ loading: true, error: null });


      console.log(newBoard)
      try {
        const result = await axios.post('http://localhost:3001/boards', newBoard);

        console.log("newBoard",newBoard)
        set((state) => ({ boards: [...state.boards, result.data], loading: false }));
      } catch (err) {
        set({error:err.message, loading: false});
      }
    },


    getBoards : async() => {
      set({loading:true, error: null});

      try{
        const response = await axios.get('http://localhost:3001/boards');
        console.log(response);
      set({ boards: response.data, loading: false});
      }catch(error) {
        set({ loading:false, error: error.message});
      }
    }
  }));

  export default useBoardStore;
