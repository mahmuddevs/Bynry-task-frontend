import { createSlice } from '@reduxjs/toolkit'

export interface User {
    _id: string;
    name: string;
    photo: string;
    description: string;
    email: string;
    location: {
        address: string;
        latitude: number;
        longitude: number;
    };
    contact: {
        phone: string;
        social: {
            linkedin: string;
            twitter: string;
        };
    };
    createdAt: string;
    updatedAt: string;
}

const initialState: User[] | null = []

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (_, action) => {
            return action.payload
        },
        addUser: (state, action) => {
            state.push(action.payload)
        },
        removeUser: (state, action) => {
            return state.filter((user) => (user._id !== action.payload))
        },
        updateUser: (state, action) => {
            const updatedUser = action.payload;
            const index = state.findIndex((user) => user._id === updatedUser._id);

            if (index !== -1) {
                state[index] = updatedUser;
            }
        }

    }
});

export const { setUsers, addUser, updateUser, removeUser } = usersSlice.actions

export default usersSlice.reducer