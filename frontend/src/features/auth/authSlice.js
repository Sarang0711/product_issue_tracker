import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';

// Get the user from Local Storage

const initialState = {
    user: null,
    isError: false,
    isLoading: false,
    isError: false,
    message: ''
}

// Register new User
export const register = createAsyncThunk(
    'auth/register',
    async(user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error) {
            const message = 
           (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

           return thunkAPI.rejectWithValue(message);
        }
    }
)

// Login user
export const login = createAsyncThunk(
    'auth/login',
    async(user, thunkAPI) => {
        console.log(user)
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: ((state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        })
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending ((state) => {
                state.isLoading = true
            }))
            .addCase(register.fulfilled, ((state, action)=> {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            }))
            .addCase(register.rejected, ((state, action)=> {
                state.isLoading = false
                state.isError = true
                state.user = null
                state.message = action.payload
            }))
    },
})

export const {reset} = authSlice.actions;
export default authSlice.reducer; 