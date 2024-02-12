"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
};

const initialFilter = {
    title: "",
    minYear: "",
    maxYear: "",
    minPage: "",
    maxPage: "",
    sortByTitle: "",
    categoryId: "",
};

export const filterSlice = createSlice({
    name: "filter",
    initialState: initialFilter,
    reducers: {
        setValue: (state, action) => {
            return { ...state, [action.payload.key]: action.payload.value };
        },
        resetFilters: () => initialFilter,
    },
});

export const bookSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

export const { setValue, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;
