import { combineReducers } from "@reduxjs/toolkit";
import transactionEntriesReducer from "./transactionEntriesSlice";
import snackBarReducer from "./snackBarSlice"
import authReducer from './authSlice'

const rootReducer = combineReducers({
    transactionEntries: transactionEntriesReducer,
    snackBar: snackBarReducer,
    auth: authReducer,
})

export default rootReducer