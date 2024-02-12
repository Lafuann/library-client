"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import filterReducer from "./Features/Book/filter";
import addBookReducer from "./Features/Book/addBook";
import authReducer from "./Features/Auth/auth";
import userReducer from "./Features/User/user";

const persistAuth = {
    key: "token",
    version: 1,
    storage,
};

const persistUser = {
    key: "user",
    version: 1,
    storage,
};
const persistedAuth = persistReducer(persistAuth, authReducer);
const persistedUser = persistReducer(persistUser, userReducer);

const rootReducer = combineReducers({
    filter: filterReducer,
    addBook: addBookReducer,
    auth: persistedAuth,
    user: persistedUser,
    //add all your reducers here
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export let persistor = persistStore(store);
