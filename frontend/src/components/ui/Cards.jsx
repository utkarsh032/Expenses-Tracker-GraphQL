import { useQuery } from "@apollo/client";
import Card from "./Card";

import { GET_TRANSACTIONS } from '../../graphql/queries/TransactionQuery'
import { GET_AUTHENTICATED_USER, GET_USER_AND_TRANSACTIONS } from '../../graphql/queries/UserQuery'

const Cards = () => {
  const { data, loading } = useQuery(GET_TRANSACTIONS);

  const { data: authUser } = useQuery(GET_AUTHENTICATED_USER);

  const { data: userAndTransactions } = useQuery(GET_USER_AND_TRANSACTIONS, {
    variables: {
      userId: authUser?.authUser?._id,
    },
  });

  return (
    <div className='w-full min-h-[40vh] px-4'>
      <h1 className='md:text-4xl p-4 text-2xl lg:text-4xl font-bold text-center  bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400  text-transparent bg-clip-text m-5'>History</h1>
      <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start'>
        {!loading &&
          data.transactions.map((transaction) => <Card key={transaction._id} transaction={transaction} authUser={authUser.authUser} />)}
      </div>
      {!loading && data?.transactions?.length === 0 && (
        <p className='text-2xl font-bold text-center w-full text-gray-200'>No transaction history found.</p>
      )}
    </div>
  );
};

export default Cards;