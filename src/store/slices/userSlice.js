import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';  
import AuthService from '../../services/AuthService';
import axios from 'axios';
import { API_URL } from '../../axios/axios';
import UserService from '../../services/UserService';

const initialState = {
    userData: null, 
    isLoading: false,
    isError: null,
    isAuthenticated: false,
    users: []
};

export const login = createAsyncThunk('user/login', async ({email, password}, {rejectWithValue}) => {
    try {
        const response = await AuthService.login(email, password);
        localStorage.setItem('token', response.data.accessToken);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message);
    }
});

export const registration = createAsyncThunk(
    'user/registration',
    async ({ email, password, city }, {rejectWithValue}) => {
        try {
            const response = await AuthService.registration(email, password, city);
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }
);

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async () => {
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }
);

export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async () => {
        try {
            const response = await UserService.fetchUsers();
            return response.data;
        } catch (error) {
            console.log(error);    
        }
    }
);

const userSlice = createSlice({
  name: 'user',  
  initialState,  
  reducers: {},  
  extraReducers: (builder) => {  
    builder
    .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
    })
    .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuthenticated = true;
    })
    .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
    })
    // Регистрация
    .addCase(registration.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
    })
    .addCase(registration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuthenticated = false;
    })
    .addCase(registration.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
    })
    // Логаут
    .addCase(logout.fulfilled, (state) => {
        state.userData = null;
        state.isAuthenticated = false;
    })
    .addCase(checkAuth.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        state.isAuthenticated = true;
    })
    .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isAuthenticated = true;
    })
    .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
    })
  },
});

export default userSlice.reducer;