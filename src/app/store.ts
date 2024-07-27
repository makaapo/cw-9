import {configureStore} from '@reduxjs/toolkit';
import {CategoryReducer} from '../containers/store/categoriesSlice';
import {transactionReducer} from '../containers/store/transactionSlice';



export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    category: CategoryReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;