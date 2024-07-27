import React from 'react';
import { Category, Transaction } from '../../types';
import dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';



interface Props {
  transaction: Transaction;
  categories: Category[];
  deleteTransactions: (id: string) => void;
}

const TransactionCard: React.FC<Props> = ({categories, transaction, deleteTransactions }) => {
  const category = categories.find(cat => cat.id === transaction.category);
  const categoryTitle = category ? category.title : '';

  const createdAt = transaction.date;
  const formatDate = dayjs(createdAt).format('DD.MM.YYYY HH:mm:ss');

  return (
    <div className="card w-50 mx-auto p-4 mb-3  shadow-lg">
      <div className="card-body">
        <h5 className="card-title">{transaction.title}</h5>
        <p className="card-text">
          {transaction.type === 'income' ? (
            <span className="text-success"><b>+{transaction.transactionSum}</b></span>
          ) : (
            <span className="text-danger"><b>-{transaction.transactionSum}</b></span>
          )}
        </p>
        <p className="card-text"><b>Category</b> {categoryTitle}</p>
        <p className="card-text"><b>Type</b> {transaction.type}</p>
        <p className="card-text"><b>Date</b> {formatDate}</p>
      </div>

      <div className="card-footer text-end">
        <NavLink to={`edit-transaction/${transaction.id}`} className="btn btn-warning ms-3">Edit</NavLink>
        <button
          onClick={() => deleteTransactions(transaction.id)}
          type="button"
          className="ms-3 btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;