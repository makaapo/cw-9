import React, {useState} from 'react';
import Modal from '../../components/Modal/Modal';
import {ApiCategory, CategoryMutation} from '../../types';
import ButtonSpinner from '../../components/Spinner/ButtonSpinner';

interface Props {
  existingCategory?: ApiCategory;
  isLoading?: boolean;
}

const emptyState: CategoryMutation = {
  type: 'income',
  title: '',
};

const Categories: React.FC<Props>  = ({existingCategory, isLoading}) => {
  const initialState: CategoryMutation = existingCategory
    ? {...existingCategory}
    : emptyState;
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState<CategoryMutation>(initialState);

  const changeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCategory((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (category.title.trim().length === 0) {
      confirm('Title must be filled');
    } else {

      setModalOpen(false);
    }
  };

  return (
    <div className="mt-2 w-75 mx-auto">
      <div className="d-flex justify-content-between align-items-center">
        <h4>Categories</h4>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>Add</button>

        <Modal
          title={<h4>{existingCategory ? 'Edit Category' : 'Add new category'}</h4>}
          show={modalOpen}
          onClose={() => setModalOpen(false)}>
          <form
            className="p-3 mx-auto"
            onSubmit={onFormSubmit}>
            <div className="my-3">
              <label htmlFor="title" className="fw-bold me-1">Title:</label>
              <input
                className="form-control"
                type="text"
                name="title"
                id="title"
                value={category.title}
                onChange={changeForm}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="type" className="fw-bold me-2">Type:</label>
              <select
                className="form-select"
                value={category.type}
                name="type"
                id="type"
                onChange={changeForm}
                required>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <button
              className="btn btn-primary me-5"
              type="submit"
              disabled={isLoading}>
              {isLoading && <ButtonSpinner/>}
              Add
            </button>
            <button
              className="btn btn-warning"
              type="button"
              onClick={() => setModalOpen(false)}>Cancel</button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Categories;