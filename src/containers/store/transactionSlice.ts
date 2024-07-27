import {createSlice} from '@reduxjs/toolkit';
import {ApiTransaction, Transaction} from '../../types';
import {addTransaction, deleteTransaction, editTransaction, fetchOneTransaction, fetchTransactions} from './transactionThunk';


export interface TransactionState {
  transactions: Transaction[];
  oneTransaction: ApiTransaction | null;
  total: number;
  isFetching: boolean;
  isCreated: boolean;
  isDeleted: false | string;
  isUpdated: boolean;
  oneLoading: boolean
}

const initialState: TransactionState = {
  transactions: [],
  oneTransaction: null,
  total: 0,
  isFetching: false,
  isCreated: false,
  isDeleted: false,
  isUpdated: false,
  oneLoading: false,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.total = action.payload.reduce((total, transaction) => {
          return transaction.type === 'income' ? total + transaction.transactionSum : total - transaction.transactionSum;
        }, 0);
        state.isFetching = false;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(addTransaction.pending, (state) => {
        state.isCreated = true;
      })
      .addCase(addTransaction.fulfilled, (state) => {
        state.isCreated = false;
      })
      .addCase(addTransaction.rejected, (state) => {
        state.isCreated = false;
      })
      .addCase(deleteTransaction.pending, (state, {meta: {arg: id} }) => {
        state.isDeleted = id;
      })
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.isDeleted = false;
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.isDeleted = false;
      })
      .addCase(editTransaction.pending, (state) => {
        state.isUpdated = true;
      })
      .addCase(editTransaction.fulfilled, (state) => {
        state.isUpdated = false;
      })
      .addCase(editTransaction.rejected, (state) => {
        state.isUpdated = false;
      })
      .addCase(fetchOneTransaction.pending, (state) => {
        state.oneTransaction = null;
        state.oneLoading = true;
      })
      .addCase(fetchOneTransaction.fulfilled, (state, {payload }) => {
        state.oneTransaction = payload;
        state.oneLoading = false;
      })
      .addCase(fetchOneTransaction.rejected, (state) => {
        state.oneLoading = false;
      });
  },
  selectors: {
    selectTransactions: (state) => state.transactions,
    selectCreateTransactionLoading: (state) => state.isCreated,
    selectFetchTransactionLoading: (state) => state.isFetching,
    selectFetchOneTransactionLoading: (state) => state.oneLoading,
    selectUpdateTransactionLoading: (state) => state.isUpdated,
    selectOneTransaction: (state) => state.oneTransaction,
    selectDeleteTransactionLoading: (state) => state.transactions,
    selectTransactionsTotal: (state) => state.total,
  },
});

export const transactionReducer = transactionSlice.reducer;
export const {
  selectTransactions,
  selectCreateTransactionLoading,
  selectFetchTransactionLoading,
  selectFetchOneTransactionLoading,
  selectUpdateTransactionLoading,
  selectOneTransaction,
  selectTransactionsTotal

} = transactionSlice.selectors;
