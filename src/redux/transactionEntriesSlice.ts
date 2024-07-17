import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransactionEntry {
    cid: number;
    id: number;
    amount: number;
    category: string;
    type: boolean;
    title: string;
    date: any;
}

interface TransactionEntryState {
    entries: TransactionEntry[]
}

const initialState: TransactionEntryState = {
    entries: []
}

const transactionEntriesSlice = createSlice({
    name: "transactionEntries",
    initialState,
    reducers: {
        setTransactionEntries : (state, action: PayloadAction<TransactionEntry>) => {
            state.entries.push(action.payload)
        },
        clearTransactionEntries: (state) => {
            state.entries = []
        }
    }
})

export const {setTransactionEntries, clearTransactionEntries} = transactionEntriesSlice.actions
export default transactionEntriesSlice.reducer