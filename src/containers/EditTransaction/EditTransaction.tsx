import {useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {ApiTransaction} from '../../types';
import {toast} from 'react-toastify';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import Spinner from '../../components/Spinner/Spinner';
import TransactionForm from '../../components/Forms/TransactionForm/TransactionForm';
import {fetchOneTransaction, editTransaction } from '../store/transactionThunk';
import {selectFetchOneTransactionLoading, selectOneTransaction,selectUpdateTransactionLoading} from '../store/transactionSlice';

const EditDish = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectFetchOneTransactionLoading);
  const isUpdating = useAppSelector(selectUpdateTransactionLoading);
  const transaction = useAppSelector(selectOneTransaction);

  const onSubmit = async (apiTrans: ApiTransaction) => {
    try {
      await dispatch(editTransaction({ id, apiTrans })).unwrap();
      navigate('/');
      toast.success('transaction updated!');
    } catch (e) {
      toast.error('Could not update transaction!');
    }
  };

  useEffect(() => {
    dispatch(fetchOneTransaction(id));
  }, [dispatch, id]);

  return (
    <div className="row mt-2">
      <div className="col">
        {isFetching && <Spinner />}
        {transaction && (
          <TransactionForm
            onSubmit={onSubmit}
            existingTrans={transaction}
            isLoading={isUpdating}
          />
        )}
      </div>
    </div>
  );
};

export default EditDish;
