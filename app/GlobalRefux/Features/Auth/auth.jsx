"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setToken: (state, action) => {
            return { ...state, token: action.payload };
        },
        removeToken: (state, action) => {
            return { ...state, token: initialState.token };
        },
    },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
