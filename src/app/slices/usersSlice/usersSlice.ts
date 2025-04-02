import { createSlice } from '@reduxjs/toolkit'

interface Users {
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

const initialState: Users[] | null = []

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            return action.payload
        },
        addUser: (state, action) => {
            state.push(action.payload)
        },
        removeUser: (state, action) => {
            return state.filter((user) => (user._id !== action.payload))
        }

    }
});

export const { setUsers, addUser, removeUser } = usersSlice.actions

export default usersSlice.reducer