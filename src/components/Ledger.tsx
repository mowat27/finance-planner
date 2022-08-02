import { useApp } from "../state";
import LedgerItem from "./LedgerItem";

function Ledger() {
  const {
    state: { transactions, upcoming },
    actions: { addMonth },
  } = useApp();

  const items = [
    ...upcoming.map((item) => LedgerItem(item, "upcoming")),
    ...transactions.map((item) => LedgerItem(item, "past")),
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

export default Ledger;
