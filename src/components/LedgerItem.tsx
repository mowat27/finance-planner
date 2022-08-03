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
      className={`flex gap-x-6 p-2 m-1 rounded-md shadow-md bg-white  hover:bg-stone-100 ${formatting}`}
    >
      <div className="flex-none w-1/12">
        <CalendarDate datetime={date} />
      </div>
      <div className="flex-1 align-text-bottom">
        <div className="flex">
          <span className="flex-none w-32 text-xl">
            <MoneyAmount amount={amount} />
          </span>
          <span className="flex-1 ml-2 text-base">{otherParty}</span>
          &nbsp;
        </div>
        <div>
          <Label description={description} reference={reference} />
          &nbsp;
        </div>
      </div>
      <div className="flex-1">
        <Balance amount={balance} />
      </div>
    </div>
  );
}

export default LedgerItem;
