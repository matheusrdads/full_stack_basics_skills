import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: number;
  name: string;
  email: string;
};

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [] as User[],
    page: 1,
  },
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.list = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setUsers, setPage } = usersSlice.actions;

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});

// Typing helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
