import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTransaction, deleteTransaction, editTransaction, getTransactions } from "./transactionAPI";

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: '',
    editing:{},



}


// create async functions

export const fetchTranasctions = createAsyncThunk('transaction/fetchTranasctions', async () => {

    const transactions = await getTransactions();
    return transactions;

})

export const createTransaction = createAsyncThunk('transaction/createTransaction', async (data) => {

    const transaction = await addTransaction(data);
    return transaction;

})

export const updateTransaction = createAsyncThunk('transaction/updateTransaction', async ({id, data}) => {

    const transaction = await editTransaction({id, data});

    return transaction;

})

export const removeTransaction = createAsyncThunk("transaction/deleteTransaction", async (id) => {

    const transaction = await deleteTransaction(id);
    return id;

})


// create slice

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers:{
        editActive:(state,action)=>{
            state.editing = action.payload;
        },
        editInactive:(state,action)=>{
            state.editing = {};
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTranasctions.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchTranasctions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTranasctions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
                state.transactions = [];
            })


            .addCase(createTransaction.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.transactions.push(action.payload);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;

            })

            .addCase(updateTransaction.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.transactions = state.transactions.map((transaction) => {
                    if (transaction.id === action.payload.id) {
                        return action.payload;
                    }
                    return transaction;
                })
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;

            })

            .addCase(removeTransaction.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })

            .addCase(removeTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload);
            })

            .addCase(removeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;

            })
    }
})



export default transactionSlice.reducer;
export const {editActive,editInactive} = transactionSlice.actions;