import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import authService from './authService';
import {extractErrorMessage} from '../../utils';

// Get the user from Local Storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isLoading: false,
}

// Register new User
export const register = createAsyncThunk(
    'auth/register',
    async(user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error) {
            console.log(extractErrorMessage(error));
           return thunkAPI.rejectWithValue(extractErrorMessage(error));
        }
    }
)


// Login user
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    try {
        return await authService.login(user);
    }
    catch(error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
})

// Logout User
// ? here we don't need a thunk as we are not doing anything async so we can use a createAction instead

export const logout = createAction('auth/logout', () => {
    authService.logout();
    return {}
    // return an empty object as our payload as we don't need a payload but the prepare function requires a payload return
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action)=> {
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(register.rejected, (state)=> {
                state.isLoading = false
            })
            .addCase(login.pending, (state) => {
                state.isLoading = false
            }) 
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false
            })
    },
})
export default authSlice.reducer; 