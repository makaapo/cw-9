import React from 'react';
import TransactionForm from '../../components/Forms/TransactionForm/TransactionForm';
import {ApiTransaction} from '../../types';
import {addTransaction} from '../store/transactionThunk';
import {toast} from 'react-toastify';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {selectCreateTransactionLoading} from '../store/transactionSlice';


const NewDish: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreateTransactionLoading);

  const onSubmit = async (transaction: ApiTransaction) => {
    try {
      await dispatch(addTransaction(transaction)).unwrap();
      navigate('/');
      toast.success('transaction created');
    } catch (error) {
      toast.error('Could not create transaction!');
    }
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <TransactionForm onSubmit={onSubmit} isLoading={isCreating} />
      </div>
    </div>
  );
};

export default NewDish;