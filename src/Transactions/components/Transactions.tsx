import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { useTransactions } from "..";
import { Transaction } from "../types";

import { generatePaymentSchedule } from "../lib/generators";

const Transaction = ({
  date,
  amount,
  otherParty,
  description,
  reference,
}: Transaction) => {
  return (
    <div key={`${date}${amount}${otherParty}${description}`}>
      <span>{date.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</span>&nbsp;
      <span>{amount}</span>&nbsp;
      <span>{otherParty}</span>&nbsp;
      <span>{description}</span>&nbsp;
      <span>{reference}</span>
    </div>
  );
};

const Transactions = () => {
  const {
    state: { transactions, paymentSchedule },
  } = useTransactions();

  const [futureTransactions, setFutureTransactions] = useState(
    [] as Transaction[]
  );

  useEffect(() => {
    setFutureTransactions(
      paymentSchedule.map(
        (ps) => generatePaymentSchedule(ps, DateTime.now()).next().value
      ) as Transaction[]
    );
  }, [paymentSchedule]);

  return (
    <div>
      <h2>Transactions</h2>
      <h3>Past</h3>
      {transactions.map((trxn: Transaction) => Transaction(trxn))}
      <h3>Upcoming</h3>
      {futureTransactions.map((trxn: Transaction) => Transaction(trxn))}
    </div>
  );
};

export default Transactions;
