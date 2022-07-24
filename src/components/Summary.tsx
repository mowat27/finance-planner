import { useApp } from "../state";

const Summary = () => {
  const {
    state: { transactions },
  } = useApp();

  return (
    <div>
      <h2>Summary</h2>
      <p>You have {transactions.length} transactions</p>
    </div>
  );
};

export default Summary;
