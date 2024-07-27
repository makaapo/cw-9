import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiCategories, ApiCategory, Category, CategoryMutation} from '../../types';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';

export const addCategory = createAsyncThunk<void, ApiCategory, {state: RootState}>(
  'category/add',
  async (category: CategoryMutation) => {
    await axiosApi.post(`category.json`, category);
  });

export interface UpdateCategoryArg {
  id: string;
  apiCat: ApiCategory;
}

export const editCategory = createAsyncThunk<void, UpdateCategoryArg, {state: RootState}>(
  'category/update',
  async ({id, apiCat}) => {
    await axiosApi.put(`/category/${id}.json`, apiCat);
  },
);

export const deleteCategory = createAsyncThunk<void, string, {state: RootState}>(
  'category/delete',
  async (id: string) => {
    await axiosApi.delete(`category/${id}.json`);
  });


export const fetchCategories = createAsyncThunk<Category[], void, {state: RootState}>('category/fetch', async () => {
  const {data: categories} = await axiosApi.get<null | ApiCategories>('category.json');
  if (categories === null) {
    return [];
  }

  return Object.keys(categories).map((id) => ({
    id,
    ...categories[id]
  }));
});

export const fetchOneCategory = createAsyncThunk<Category, string, {state: RootState}>(
  'category/fetchOne',
  async (id) => {
    const {data: category} = await axiosApi.get<ApiCategory | null>(
      `/category/${id}.json`,
    );

    if (category === null) {
      throw new Error('Not found');
    }

    return {id, ...category};
  },
);

export const getCategoriesType = createAsyncThunk<Category[], string, {state: RootState}>(
  'category/get-by-type',
  async (type: string) => {
    let url = `category.json?orderBy="type"&equalTo="${type}"`;

    const { data: categories } = await axiosApi.get<ApiCategories | null>(url);

    if (categories !== null) {
      return Object.keys(categories).map((id) => ({
        id,
        ...categories[id],
      }));
    } else {
      return [];
    }
  }
);