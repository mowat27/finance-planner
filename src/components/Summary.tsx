import { useApp } from "../state";

const Summary = () => {
  const {
    state: { transactions },
  } = useApp();

  return (
    <div className="py-2">
      <h2 className="text-2xl">Summary</h2>
      <p>You have {transactions.length} transactions</p>
    </div>
  );
};

export default Summary;
