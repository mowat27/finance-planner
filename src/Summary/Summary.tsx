import useTransactions from "../Transactions/state/use";

const Summary = () => {
  const {
    state: { transactions },
  } = useTransactions();

  return (
    <div>
      <h2>Summary</h2>
      <p>You have {transactions.length} transactions</p>
    </div>
  );
};

export default Summary;