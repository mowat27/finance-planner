import { DateTime } from "luxon";
import { Transaction } from "../types";
import MoneyAmount from "./MoneyAmount";

export type TransactionListItemType = "past" | "upcoming";

function TransactionListItem(
  { date, amount, otherParty, description, reference, balance }: Transaction,
  transactionClass: string
) {
  const formatting = transactionClass === "upcoming" ? "text-neutral-400" : "";
  return (
    <div
      key={`${date}${amount}${otherParty}${description}`}
      className={`flex p-2 hover:bg-stone-200 ${formatting}`}
    >
      <div className="flex-1">
        {date.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
      </div>
      <div className="flex-1">
        <MoneyAmount currencySymbol="£" amount={amount} />
      </div>
      <div className="flex-1">{otherParty}</div>
      <div className="flex-1">{description}</div>
      <div className="flex-1">{reference}</div>
      <div className="flex-1">
        <MoneyAmount
          currencySymbol="£"
          amount={typeof balance === "number" ? balance : 0}
        />
      </div>
    </div>
  );
}

export default TransactionListItem;
