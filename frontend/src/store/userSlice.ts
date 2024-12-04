import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';

interface UserState {
    selectedUser: User | null;
}

const initialState: UserState = {
    selectedUser: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.selectedUser = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;