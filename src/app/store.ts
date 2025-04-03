import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './slices/usersSlice/usersSlice';
import selectedUserReducer from './slices/userSelectSlice/userSelectSlice'

export const store = configureStore({
    reducer: {
        users: usersReducer,
        selectedUser: selectedUserReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;