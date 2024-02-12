"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "",
    description: "",
    image_url: "",
    release_year: null,
    price: "",
    total_page: null,
    thickness: null,
    category_id: null,
};

export const addBookSlice = createSlice({
    name: "addBook",
    initialState: initialState,
    reducers: {
        setValue: (state, action) => {
            return { ...state, [action.payload.key]: action.payload.value };
        },
    },
});

export const { setValue, resetFilters } = addBookSlice.actions;

export default addBookSlice.reducer;
