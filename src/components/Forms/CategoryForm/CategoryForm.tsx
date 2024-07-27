import React, { useState, useEffect } from 'react';
import { CategoryMutation, CategoryId } from '../../../types';
import ButtonSpinner from '../../Spinner/ButtonSpinner';

interface Props {
  onSubmit: (category: CategoryMutation) => void;
  existingCategory?: CategoryId;
  isLoading?: boolean;
}

const emptyState: CategoryMutation = {
  type: 'income',
  title: '',
};

const CategoryForm: React.FC<Props> = ({onSubmit, existingCategory, isLoading = false}) => {
  const [categoryMutation, setCategoryMutation] = useState<CategoryMutation>(emptyState);

  useEffect(() => {
    if (existingCategory) {
      setCategoryMutation({
        title: existingCategory.title,
        type: existingCategory.type
      });
    } else {
      setCategoryMutation(emptyState);
    }
  }, [existingCategory]);

  const changeCategory = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCategoryMutation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(categoryMutation);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4>{existingCategory ? 'Edit Category' : 'Add new Category'}</h4>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          className="form-control"
          onChange={changeCategory}
          value={categoryMutation.title}
        />
      </div>
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select
          className="form-control"
          value={categoryMutation.type}
          name="type"
          id="type"
          onChange={changeCategory}
          required
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-2"
        disabled={isLoading}
      >
        {isLoading && <ButtonSpinner />}
        {existingCategory ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default CategoryForm;