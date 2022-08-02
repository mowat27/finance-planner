import { DateTime } from "luxon";
import { LedgerEntry } from "../types";
import MoneyAmount from "./MoneyAmount";

export type LedgerItemType = "past" | "upcoming";

function LedgerItem(
  { date, amount, otherParty, description, reference, balance }: LedgerEntry,
  itemType: LedgerItemType
) {
  const formatting = itemType === "upcoming" ? "text-neutral-400" : "";
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
        <MoneyAmount currencySymbol="£" amount={balance} />
      </div>
    </div>
  );
}

export default LedgerItem;
