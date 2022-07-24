import { DateTime } from "luxon";
import { Transaction } from "../types";

function TransactionListItem({
  date,
  amount,
  otherParty,
  description,
  reference,
}: Transaction) {
  return (
    <div key={`${date}${amount}${otherParty}${description}`}>
      <span>{date.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</span>&nbsp;
      <span>{amount}</span>&nbsp;
      <span>{otherParty}</span>&nbsp;
      <span>{description}</span>&nbsp;
      <span>{reference}</span>
    </div>
  );
}

export default TransactionListItem;
