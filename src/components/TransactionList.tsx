import { useApp } from "../state";
import TransactionListItem from "./TransactionListItem";

function TransactionList() {
  const {
    state: { transactions, upcoming, months },
    actions: { addMonth },
  } = useApp();

  return (
    <div className="py-2">
      <h2 className="text-2xl">Transactions</h2>
      <h3>Past</h3>
      {transactions.map((trxn) => TransactionListItem(trxn))}
      <h3>Next {months} Month(s)</h3>
      <div>
        <a onClick={addMonth} href="#">
          More
        </a>
      </div>
      <br />
      <div>{upcoming.map((trxn) => TransactionListItem(trxn))}</div>
    </div>
  );
}

export default TransactionList;
