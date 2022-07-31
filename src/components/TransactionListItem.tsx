import { DateTime } from "luxon";
import { Transaction } from "../types";

export type TransactionListItemType = "past" | "upcoming";

function TransactionListItem(
  { date, amount, otherParty, description, reference }: Transaction,
  transactionClass: string
) {
  const formatting = transactionClass === "upcoming" ? "text-teal-600" : "";
  return (
    <div
      key={`${date}${amount}${otherParty}${description}`}
      className={`flex p-2 hover:bg-stone-200 ${formatting}`}
    >
      <div className="flex-1">
        {date.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
      </div>
      <div className="flex-1">{amount}</div>
      <div className="flex-1">{otherParty}</div>
      <div className="flex-1">{description}</div>
      <div className="flex-1">{reference}</div>
    </div>
  );
}

export default TransactionListItem;
