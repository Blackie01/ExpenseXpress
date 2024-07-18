import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NameProp {
    username: string | undefined;
}

const initialState: NameProp = {
    username: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<NameProp>) => {
            state.username = action.payload.username || ''
        },
        clearUsername: (state) => {
            state.username = ''
        }
    }
})

export const{setUsername, clearUsername} = authSlice.actions
export default authSlice.reducer