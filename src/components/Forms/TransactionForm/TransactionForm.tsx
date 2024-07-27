import React, { useState } from 'react';
import { ApiTransaction, TransactionMutation } from '../../../types';
import ButtonSpinner from '../../Spinner/ButtonSpinner';
import { useAppSelector } from '../../../app/hooks';
import { selectCategories } from '../../../containers/store/categoriesSlice';

interface Props {
  onSubmit: (dish: ApiTransaction) => void;
  existingTrans?: ApiTransaction;
  isLoading?: boolean;
}

const emptyState: TransactionMutation = {
  title: '',
  transactionSum: '',
  type: '',
  category: '',
  date: '',
};

const TransactionForm: React.FC<Props> = ({onSubmit, existingTrans, isLoading}) => {
  const initialState: TransactionMutation = existingTrans
    ? { ...existingTrans, transactionSum: existingTrans.transactionSum.toString() }
    : emptyState;
  const [TransMutation, setTransMutation] = useState<TransactionMutation>(initialState);
  const categories = useAppSelector(selectCategories);

  const type = [
    {title: 'income', id: 'income'},
    {title: 'expense', id: 'expense'},
  ];

  const changeTrans = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setTransMutation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      ...TransMutation,
      transactionSum: parseFloat(TransMutation.transactionSum),
    });
  };

  const filterCategories = categories.filter(category => category.type === TransMutation.type);

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <h4>{existingTrans ? 'Edit transaction' : 'Add new transaction'}</h4>
        <div className="form-group">
          <label htmlFor="type" className="form-label">Transaction Type</label>
          <select
            name="type"
            className="form-select mb-3"
            value={TransMutation.type}
            onChange={changeTrans}
          >
            <option value="">Select type</option>
            {type.map(type => (
              <option key={type.id} value={type.id}>{type.title}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            className="form-select mb-3"
            disabled={filterCategories.length === 0}
            name="category"
            value={TransMutation.category}
            onChange={changeTrans}
          >
            <option value="">Select category</option>
            {filterCategories.map(category => (
              <option key={category.id} value={category.id}>{category.title}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="transactionSum" className="form-label">Transaction Sum</label>
          <input
            type="number"
            name="transactionSum"
            id="transactionSum"
            className="form-select"
            min={0}
            value={TransMutation.transactionSum}
            onChange={changeTrans}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={isLoading}
        >
          {isLoading && <ButtonSpinner />}
          {existingTrans ? 'Update' : 'Create'}
        </button>
      </form>
    </>
  );
};

export default TransactionForm;
