import React, {useEffect, useState} from 'react';
import Modal from '../../components/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {addCategory, deleteCategory, editCategory, fetchCategories, fetchOneCategory} from '../store/categoriesThunks';
import CategoryForm from '../../components/Forms/CategoryForm/CategoryForm';
import {selectCategories, selectCreateCategoryLoading, selectDeleteCategoryLoading, selectFetchCategoryLoading, selectFetchOneCategoryLoading, selectOneCategory, selectUpdateCategoryLoading} from '../store/categoriesSlice';
import {CategoryMutation} from '../../types';
import {toast} from 'react-toastify';

const Categories: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const oneCategory = useAppSelector(selectOneCategory);
  const isFetching = useAppSelector(selectFetchCategoryLoading);
  const isLoading = useAppSelector(selectCreateCategoryLoading);
  const oneLoading = useAppSelector(selectFetchOneCategoryLoading);
  const editLoading = useAppSelector(selectUpdateCategoryLoading);
  const deleteLoading = useAppSelector(selectDeleteCategoryLoading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const resetForm = () => {
    setModalOpen(false);
    setIsEditMode(false);
    dispatch(fetchCategories());
  };

  const onFormSubmit = async (category: CategoryMutation) => {
    if (isEditMode && oneCategory) {
      await dispatch(editCategory({ id: oneCategory.id, apiCat: category }));
    } else {
      await dispatch(addCategory(category));
    }
    resetForm();
  };

  const onEditCategory = async (id: string) => {
    try {
      await dispatch(fetchOneCategory(id));
      setIsEditMode(true);
      setModalOpen(true);
      toast.success('transaction updated!');
    } catch (error) {
      toast.error('category not updated!');
    }
  };

  const onDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }
    try {
      await dispatch(deleteCategory(id));
      dispatch(fetchCategories());
      toast.success('category deleted!');
    } catch (error) {
      toast.success('category not deleted!');
    }
  };

  const onAddCategory = () => {
    try {
      setIsEditMode(false);
      setModalOpen(true);
      toast.success('category added!');
    } catch (error) {
      toast.success('category not added!');
    }

  };

  return (
    <div className="mt-2 w-75 mx-auto">
      <div className="d-flex justify-content-between align-items-center">
        <h4>Categories</h4>
        <button className="btn btn-primary" onClick={onAddCategory}>Add</button>
      </div>
      <hr/>
      {isFetching ? (
        <Spinner/>
      ) : (
        <div className="d-flex justify-content-center align-items-center flex-column">
          {categories.length === 0 ? (
            <h3>No categories yet</h3>
          ) : (
            categories.map((categoryItem) => (
              <div key={categoryItem.id}
                   className="w-50 align-items-center d-flex mb-2 border p-2 justify-content-between rounded shadow-lg">
                <div>
                  <p>{categoryItem.title}</p>
                  <p className={categoryItem.type === 'income' ? 'text-success' : 'text-danger'}>{categoryItem.type}</p>
                </div>
                <div>
                  <button className="btn btn-warning ms-2" onClick={() => onEditCategory(categoryItem.id)}>Edit</button>
                  <button className="btn btn-danger ms-3" onClick={() => onDeleteCategory(categoryItem.id)}>Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      <Modal
        title={<h1>{isEditMode ? 'Edit Category' : 'Add new Category'}</h1>}
        show={modalOpen}
        onClose={resetForm}
      >
        <CategoryForm
          onSubmit={onFormSubmit}
          existingCategory={isEditMode && oneCategory ? oneCategory : undefined}
          isLoading={isLoading || oneLoading || editLoading || deleteLoading}
        />
      </Modal>
    </div>
  );
};

export default Categories;