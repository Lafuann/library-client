"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            return { ...state, data: action.payload };
        },
        removeUser: (state, action) => {
            return { ...state, token: initialState.data };
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
