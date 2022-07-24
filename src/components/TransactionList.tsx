import { useApp } from "../state";
import TransactionListItem from "./TransactionListItem";

function TransactionList() {
  const {
    state: { transactions, upcoming },
  } = useApp();

  return (
    <div>
      <h2>Transactions</h2>
      <h3>Past</h3>
      {transactions.map((trxn) => TransactionListItem(trxn))}
      <h3>Upcoming</h3>
      {upcoming.map((trxn) => TransactionListItem(trxn))}
    </div>
  );
}

export default TransactionList;
