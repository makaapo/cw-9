import { createSlice } from '@reduxjs/toolkit';
import { ApiCategory, Category } from '../../types';
import { addCategory, deleteCategory, editCategory, fetchCategories, fetchOneCategory } from './categoriesThunks';

export interface TransactionState {
  categories: Category[];
  oneCategory: (ApiCategory & {id: string}) | null;
  isFetching: boolean;
  isLoading: boolean;
  editLoading: boolean;
  deleteLoading: boolean;
  oneLoading: boolean;
}

const initialState: TransactionState = {
  categories: [],
  oneCategory: null,
  isFetching: false,
  isLoading: false,
  editLoading: false,
  deleteLoading: false,
  oneLoading: false,
};

const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchCategories.fulfilled, (state, {payload: categories }) => {
        state.isFetching = false;
        state.categories = categories;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isFetching = false;
      });

    builder
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addCategory.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(editCategory.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(editCategory.fulfilled, (state) => {
        state.editLoading = false;
      })
      .addCase(editCategory.rejected, (state) => {
        state.editLoading = false;
      });

    builder
      .addCase(deleteCategory.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.deleteLoading = false;
      });

    builder
      .addCase(fetchOneCategory.pending, (state) => {
        state.oneLoading = true;
      })
      .addCase(fetchOneCategory.fulfilled, (state, { payload: apiCategory }) => {
        state.oneCategory = {...apiCategory, id: apiCategory.id};
        state.oneLoading = false;
      })
      .addCase(fetchOneCategory.rejected, (state) => {
        state.oneLoading = false;
      });
  },
  selectors: {
    selectCategories: (state) => state.categories,
    selectCreateCategoryLoading: (state) => state.isLoading,
    selectFetchCategoryLoading: (state) => state.isFetching,
    selectFetchOneCategoryLoading: (state) => state.oneLoading,
    selectUpdateCategoryLoading: (state) => state.editLoading,
    selectOneCategory: (state) => state.oneCategory,
    selectDeleteCategoryLoading: (state) => state.deleteLoading,
  },
});

export const CategoryReducer = CategorySlice.reducer;

export const {
  selectCategories,
  selectCreateCategoryLoading,
  selectFetchCategoryLoading,
  selectFetchOneCategoryLoading,
  selectUpdateCategoryLoading,
  selectOneCategory,
  selectDeleteCategoryLoading,
} = CategorySlice.selectors;
