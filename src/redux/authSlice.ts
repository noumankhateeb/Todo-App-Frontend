import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signupUser, loginUser } from '../services/api';

interface AuthState {
    user: null | { email: string };
    loading: boolean;
    message: string;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    message: "",
    error: null,
};

// Async Thunks
export const signup = createAsyncThunk('signup', async (userData: { email: string; password: string }) => {
    const response = await signupUser(userData.email, userData.password);
    return response.data;
}
);

export const login = createAsyncThunk('login', async (userData: { email: string; password: string }) => {
    const response = await loginUser(userData.email, userData.password);
    return response.data;
}
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(signup.fulfilled, (state, action: any) => {
                state.message = action.payload.message;
                state.user = action.payload.user;
                state.loading = false;
                state.error = '';
                if (action.payload.token) {
                    localStorage.setItem('token', action.payload.token);
                }
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Signup failed';
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(login.fulfilled, (state, action: any) => {
                state.message = action.payload.message;
                state.user = action.payload.user;
                state.loading = false;
                state.error = '';
                if (action.payload.token) {
                    localStorage.setItem('token', action.payload.token);
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Login failed';
            });
    },
});

export default authSlice.reducer;
