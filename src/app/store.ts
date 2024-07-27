import {configureStore} from '@reduxjs/toolkit';
import {CategoryReducer} from '../containers/store/categoriesSlice';



export const store = configureStore({
  reducer: {
    // transactions: TransactionReducer,
    category: CategoryReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;