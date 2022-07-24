import { useState, useEffect } from "react";
import { DateTime } from "luxon";

import { useApp } from "../state";
import { Transaction } from "../types";
import TransactionListItem from "./TransactionListItem";

function TransactionList() {
  const {
    state: { transactions, paymentSchedule },
    actions: { generatePaymentSchedule },
  } = useApp();

  const [futureTransactions, setFutureTransactions] = useState(
    [] as Transaction[]
  );

  useEffect(() => {
    setFutureTransactions(
      paymentSchedule.map(
        (ps) => generatePaymentSchedule(ps, DateTime.now()).next().value
      ) as Transaction[]
    );
  }, [generatePaymentSchedule, paymentSchedule]);

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
