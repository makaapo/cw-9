import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiTransaction, ApiTransactions, Transaction, TransactionMutation} from '../../types';
import {RootState} from '../../app/store';
import axiosApi from '../../axiosApi';

export const fetchTransactions = createAsyncThunk<Transaction[], void, {state: RootState}>('transaction/fetch', async () => {
  const {data: transaction} = await axiosApi.get<null | ApiTransactions>('transaction.json');
  if (transaction === null) {
    return [];
  }
  return Object.keys(transaction).map((id) => ({
    id,
    ...transaction[id]
  }));
});


export const addTransaction = createAsyncThunk<void, ApiTransaction, {state: RootState}>(
  'transaction/add',
  async (transaction: TransactionMutation) => {
    await axiosApi.post(`transaction.json`, transaction);
  });


export const deleteTransaction = createAsyncThunk<void, string, {state: RootState}>(
  'transaction/delete',
  async (id: string) => {
    await axiosApi.delete(`transaction/${id}.json`);
  });

export interface UpdateTransactionArg {
  id: string;
  apiTrans: ApiTransaction;
}

export const editTransaction = createAsyncThunk<void, UpdateTransactionArg, {state: RootState}>(
  'transaction/update',
  async ({id, apiTrans}) => {
    await axiosApi.put(`/transaction/${id}.json`, apiTrans);
  },
);

export const fetchOneTransaction = createAsyncThunk<ApiTransaction, string, {state: RootState}>(
  'transaction/fetchOne',
  async (id) => {
    const {data: transaction} = await axiosApi.get<ApiTransaction | null>(`/transaction/${id}.json`);
    if (transaction === null) {
      throw new Error('Not found');
    }
    return transaction;
  },
);