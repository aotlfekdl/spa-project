import { create } from 'zustand';

import axios from 'axios';

const useUserStore = create((set) => ({
  users: [],
  currentUser: null,
  loading: false,
  error: null,

  getUsers: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get('http://localhost:8888/api/members');

      set({ users: response.data, loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  addUser: async (newUser) => {
    set({ loading: true, error: null });
    try {
      const result = await axios.post('http://localhost:8888/api/members', newUser);

      set((state) => ({ users: [...state.users, result.data], loading: false }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

loginUser: async (id, pwd) => {
  set({ loading: true, error: null });
  try {
    const response = await axios.post("http://localhost:8888/api/members/login", {
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

  updateUser: async (id, updateData) => {
    try {
      set({ loading: true, error: null });

      const response = await axios.put(`http://localhost:8888/api/Members/${id}`, updateData);

      const updateUser = response.data;

      set((state) => ({
        users: state.users.map((u) => (u.id === id ? updateUser : u)),
        currentUser: state.currentUser?.id === id ? updateUser : state.currentUser,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useUserStore;
