import { useState, useEffect } from "react";
import { DateTime } from "luxon";

import { useTransactions } from "..";
import { Transaction } from "../types";
import TransactionListItem from "./TransactionListItem";

import { generatePaymentSchedule } from "../lib/generators";

function TransactionList() {
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
      {transactions.map((trxn) => TransactionListItem(trxn))}
      <h3>Upcoming</h3>
      {futureTransactions.map((trxn) => TransactionListItem(trxn))}
    </div>
  );
}

export default TransactionList;
