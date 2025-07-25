import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
// import { toast } from "react-hot-toast";
import { Toaster as SonnerToaster } from "sonner";
import { Toaster as HotToaster } from "react-hot-toast";


//retrive user info and token from localstorage if available
const userFromStorage = localStorage.getItem("userInfo") 
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

//check for an existing guest ID in the localStorage or generate a new one
const initialGuestId = 
    localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;

localStorage.setItem("guestId", initialGuestId);

//initial state
const initialState = {
    user: userFromStorage,
    guestId: initialGuestId,
    loading: false,
    error: null,
};

//aync Thunk for User Login
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        localStorage.setItem("userToken", response.data.token);

        return response.data.user; //return user from the response

    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

//aync Thunk for User registration
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, userData);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        localStorage.setItem("userToken", response.data.token);

        return response.data.user; //return user from the response

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

//slice 
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.guestId = `guest_${new Date().getTime()}`; //reste guest id on logout
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");
            localStorage.setItem("guestId", state.guestId); //set new guest id in localstorage
        },
        generateNewGuestId: (state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem("guestId", state.guestId); //set new guest id in localstorag
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
            .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Invalid credentials.";
        })


        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
            .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    },
});

export const {logout, generateNewGuestId} = authSlice.actions;
export default authSlice.reducer;