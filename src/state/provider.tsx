import React, { useState, useEffect, useRef } from "react";
import { DateTime } from "luxon";

import { AppContext } from "./context";

import { Transaction, MonthlyPayment } from "../types";
import { fetchTransactions, fetchPaymentSchedule } from "../api";

export function* upcomingTransactionGenerator(
  monthlyPayment: MonthlyPayment,
  startingFrom: DateTime
): Iterator<Transaction> {
  const { amount, otherParty, description, reference, paymentDay } =
    monthlyPayment;

  // DateTimes are immutable so .set creates a new object
  let date = startingFrom.startOf("day");
  date = date.set({ day: paymentDay });
  if (paymentDay <= startingFrom.day) {
    date = date.plus({ month: 1 });
  }

  let nextPayment: Transaction = {
    date,
    amount,
    otherParty,
    description,
    reference,
  };
  while (true) {
    yield nextPayment;
    date = date.plus({ months: 1 });
    nextPayment = { ...nextPayment, date };
  }
}

function nextBatch(generators: Iterator<Transaction>[]) {
  return generators
    .reduce(
      (arr: Transaction[], generator: Iterator<Transaction>): Transaction[] => {
        const { value, done } = generator.next();
        return done ? arr : [...arr, value];
      },
      []
    )
    .sort((a, b) => {
      // ascending order of date
      return a.date.toMillis() - b.date.toMillis();
    });
}

function newUpcoming(paymentSchedule: MonthlyPayment[], numMonths: number) {
  let result: Transaction[] = [];
  const generators = paymentSchedule.map((monthlyPayment: MonthlyPayment) =>
    upcomingTransactionGenerator(monthlyPayment, DateTime.now())
  );

  Array.from(
    Array(numMonths),
    () => (result = [...result, ...nextBatch(generators)])
  );
  return result;
}

function setRollingBalance(
  startingBalance: number,
  transactions: Transaction[]
): Transaction[] {
  return transactions.reduce(
    (memo, transaction) => {
      const balance = memo.balance + transaction.amount;
      return {
        balance,
        transactions: [...memo.transactions, { ...transaction, balance }],
      };
    },
    {
      balance: startingBalance,
      transactions: [] as Transaction[],
    }
  ).transactions;
}

// TODO: figure out why React.FC's implicit children gives an error
type Props = {
  children?: React.ReactNode;
};

export function AppProvider({ children }: Props) {
  const [transactions, setTransactions] = useState([] as Transaction[]);
  const [paymentSchedule, setPaymentSchedule] = useState(
    fetchPaymentSchedule()
  );
  const [upcoming, setUpcoming] = useState([] as Transaction[]);
  const [months, setMonths] = useState(3);
  const [startingBalance] = useState(0);

  useEffect(() => {
    fetchTransactions()
      .then((transactions) => setRollingBalance(startingBalance, transactions))
      .then((transactions) => transactions.reverse())
      .then(setTransactions);
  }, [setTransactions, startingBalance, transactions]);

  useEffect(() => {
    const balance = transactions.length > 0 ? transactions[0].balance! : 0;
    setUpcoming(
      setRollingBalance(balance, newUpcoming(paymentSchedule, months)).reverse()
    );
  }, [paymentSchedule, months, transactions]);

  const addMonth = () => setMonths(months + 1);

  const value = {
    state: { transactions, upcoming, paymentSchedule, months },
    actions: {
      setTransactions,
      setPaymentSchedule,
      addMonth,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
