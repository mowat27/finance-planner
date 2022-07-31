import { useApp } from "../state";

const Summary = () => {
  const {
    state: { transactions, upcoming },
  } = useApp();

  return (
    <div className="py-2">
      <h2 className="text-2xl">Summary</h2>
      <p>
        Showing {transactions.length} past transactions and {upcoming.length}
        projected transactions
      </p>
    </div>
  );
};

export default Summary;
