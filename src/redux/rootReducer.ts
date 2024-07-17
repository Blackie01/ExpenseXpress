import { combineReducers } from "@reduxjs/toolkit";
import transactionEntriesReducer from "./transactionEntriesSlice";
import snackBarReducer from "./snackBarSlice"

const rootReducer = combineReducers({
    transactionEntries: transactionEntriesReducer,
    snackBar: snackBarReducer
})

export default rootReducer