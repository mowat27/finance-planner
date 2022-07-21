import useTransactions from "../state/transactions/use";

const Summary = () => {
  const { state } = useTransactions();

  return (
    <div>
      <h2>Summary</h2>
      <p>You have {state.transactions.length} transactions</p>
    </div>
  );
};

export default Summary;
