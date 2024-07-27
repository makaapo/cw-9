
import {useEffect} from 'react';
import {deleteTransaction, fetchTransactions} from '../store/transactionThunk';
import {fetchCategories} from '../store/categoriesThunks';
import TransactionCard from '../../components/TransactionCard/TransactionCard';
import Spinner from '../../components/Spinner/Spinner';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectFetchTransactionLoading, selectTransactions, selectTransactionsTotal} from '../store/transactionSlice';
import {selectCategories} from '../store/categoriesSlice';

const Home = () => {
  const transaction = useAppSelector(selectTransactions);
  const categories = useAppSelector(selectCategories);
  const total = useAppSelector(selectTransactionsTotal);
  const isLoading = useAppSelector(selectFetchTransactionLoading);
  const dispatch= useAppDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);

  const deleteTransactions = async (id: string) => {
    await dispatch(deleteTransaction(id));
    dispatch(fetchTransactions());
  };
  const balanceColor = total >= 0 ? 'text-success' : 'text-danger';

  return categories && (
    <>
      {isLoading ? <Spinner/> :
        <>
          <h4 className="mt-2 mb-4 text-center">Balance <strong className={balanceColor}>{total}</strong> KGS</h4>

          {transaction.length === 0 ? <h4>No transactions</h4> :
            <>
              {transaction.map(transaction => (
                <TransactionCard
                  key={transaction.id}
                  categories={categories}
                  transaction={transaction}
                  deleteTransactions={deleteTransactions}
                />
              ))}
            </>
          }
        </>
      }
    </>
  );
};

export default Home;