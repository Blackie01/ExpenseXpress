import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackBarProps {
    message: string;
    status: boolean
    display: boolean
}

const initialState: SnackBarProps = {
    message: '',
    status: false,
    display: false,
}

const snackBarSlice = createSlice({
    name: 'snackBar',
    initialState,
    reducers: {
        setSnackBar: (state, action: PayloadAction<SnackBarProps>) => {
            const {message, status, display} = action.payload
            state.message = message
            state.status = status
            state.display = display
        },
        clearSnackBar: (state) => {
            state.message = ''
            state.status = false
            state.display = false
        }
    }
})

export const {setSnackBar, clearSnackBar} = snackBarSlice.actions
export default snackBarSlice.reducer

