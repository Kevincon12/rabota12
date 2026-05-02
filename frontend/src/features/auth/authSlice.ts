import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

interface User {
    _id: string;
    email: string;
    displayName: string;
    role: string;
    token: string;
}

interface AuthState {
    user: User | null;
}

const initialState: AuthState = {
    user: null,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (data: { email: string; password: string }) => {
        const res = await api.post('/users/sessions', data);
        return res.data;
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (data: { email: string; password: string; displayName: string }) => {
        const res = await api.post('/users', data);
        return res.data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            localStorage.setItem('token', action.payload.token);
        });

        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload;
            localStorage.setItem('token', action.payload.token);
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;