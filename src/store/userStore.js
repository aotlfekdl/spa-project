import { create } from 'zustand';

import axios from 'axios';

const useUserStore = create((set) => ({
  users: [],
  currentUser: null,
  loading: false,
  error: null,

  getUsers: async (id) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get(`http://localhost:8888/api/members/${id}`);

      set({
        users: Array.isArray(response.data) ? response.data : [response.data],
      });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  addUser: async (formData) => {
    set({ loading: true, error: null });

    try {
      const result = await axios.post('http://localhost:8888/api/members', formData);

      set((state) => ({ users: [...state.users, result.data], loading: false }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  loginUser: async (id, pwd) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('http://localhost:8888/api/members/login', {
        user_id: id,
        user_pwd: pwd,
      });

      const user = response.data;

      if (!user) {
        set({ loading: false });
        return { success: false };
      }

      set({ loading: false, currentUser: user });
      return { success: true, user };
    } catch (err) {
      set({ error: err.message, loading: false });
      return { success: false, error: err.message };
    }
  },

  logoutUser: async (currentUser) => {
    set({ currentUser: null });

    return { currentUser };
  },

  updateUser: async (userId, updateData) => {
    try {
      set({ loading: true, error: null });
      console.log(`여기로 오시나요?3333${userId}`);
      const response = await axios.put(`http://localhost:8888/api/members/${userId}`, updateData);

      console.log('resporesponsense::', response);

      const updatedUser = response.data;

      set((state) => ({
        loading: false, // ✅ 로딩 상태 해제 포함

        users: state.users.map(
          (u) => (u.user_id === userId ? updatedUser : u) // ✅ 기존 users 배열에서 해당 유저만 교체
        ),

        currentUser: state.currentUser?.user_id === userId ? updatedUser : state.currentUser, // ✅ id → user_id
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useUserStore;
