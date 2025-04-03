import { createSlice } from '@reduxjs/toolkit'
import { User } from '../usersSlice/usersSlice';

const initialState: User | null = null

const userSelectSlice = createSlice({
    name: 'selectedUser',
    initialState,
    reducers: {
        selectUser: (_, action) => {
            return action.payload;
        }
    }
});

export const { selectUser } = userSelectSlice.actions

export default userSelectSlice.reducer