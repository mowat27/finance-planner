import { DateTime } from "luxon";
import { LedgerEntry } from "../types";

import CalendarDate from "./CalendarDate";
import MoneyAmount from "./MoneyAmount";
import Balance from "./Balance";

export type LedgerItemType = "past" | "upcoming";

interface LabelProps {
  description: string | undefined;
  reference: string | undefined;
}

function isBlank(s: string | undefined | null): boolean {
  return s === undefined || s === null || s === "";
}

function Label({ description, reference }: LabelProps) {
  let text = "";
  text += isBlank(description) ? "" : description;

  if (!isBlank(reference) && reference !== description) {
    text += `(${reference})`;
  }
  return <span className="text-sm italic text-gray-400">{text}</span>;
}

function LedgerItem(
  { date, amount, otherParty, description, reference, balance }: LedgerEntry,
  itemType: LedgerItemType
) {
  const formatting = itemType === "upcoming" ? "text-neutral-400" : "";

  return (
    <div
      key={`${date}${amount}${otherParty}${description}`}
      className={`grid grid-cols-4 grid-rows-2 my-2 p-2 rounded-md shadow-md bg-white  hover:bg-stone-100 ${formatting}`}
    >
      <div className="row-span-2 w-64 flex items-center justify-left">
        <CalendarDate datetime={date} />
      </div>
      <div className="w-32 text-xl">
        <MoneyAmount amount={amount} />
      </div>
      <div className="ml-2 text-base">{otherParty}</div>
      <div className="row-span-2 flex items-center justify-center">
        <Balance amount={balance} />
      </div>
      <div className="col-start-2 col-span-2">
        <Label description={description} reference={reference} />
        &nbsp;
      </div>
    </div>
  );
}

export default LedgerItem;
