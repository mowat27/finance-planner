import { useApp } from "../state";
import TransactionListItem, {
  TransactionListItemType,
} from "./TransactionListItem";

function TransactionList() {
  const {
    state: { transactions, upcoming, months },
    actions: { addMonth },
  } = useApp();

  const items = [
    ...transactions.map((trxn) => TransactionListItem(trxn, "past")),
    ...upcoming.map((trxn) => TransactionListItem(trxn, "upcoming")),
  ];

  return (
    <div className="py-2">
      <div className="flex items-center">
        <h2 className="text-2xl">Transactions</h2>
        <div className="p-5">
          <a
            className="px-3 py-1 bg-sky-200 hover:border-sky-800 rounded-md border-2"
            onClick={addMonth}
            href="#"
          >
            Load More
          </a>
        </div>
      </div>
      <div>{items}</div>
    </div>
  );
}

export default TransactionList;
