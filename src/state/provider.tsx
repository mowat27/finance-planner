import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

import { AppContext } from "./context";

import { Transaction, MonthlyPayment } from "../types";
import { fetchTransactions, fetchPaymentSchedule } from "../api";

export function* generateUpcomingTransaction(
  schedule: MonthlyPayment,
  startingFrom: DateTime
): Iterator<Transaction> {
  const { amount, otherParty, description, reference, paymentDay } = schedule;

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

function appendNextTransaction(
  arr: Transaction[],
  commitment: MonthlyPayment
): Transaction[] {
  let { value, done } = generateUpcomingTransaction(
    commitment,
    DateTime.now()
  ).next();
  return done ? arr : [...arr, value];
}

// TODO: figure out why React.FC's implicit children gives an error
type Props = {
  children?: React.ReactNode;
};

export function AppProvider({ children }: Props) {
  const [transactions, setTransactions] = useState(fetchTransactions());
  const [paymentSchedule, setPaymentSchedule] = useState(
    fetchPaymentSchedule()
  );
  const [upcoming, setUpcoming] = useState([] as Transaction[]);

  useEffect(() => {
    setUpcoming(
      paymentSchedule.reduce(appendNextTransaction, []).sort((a, b) => {
        // ascending order of date
        return a.date.toMillis() - b.date.toMillis();
      })
    );
  }, [paymentSchedule]);

  const value = {
    state: { transactions, upcoming, paymentSchedule },
    actions: {
      setTransactions,
      setPaymentSchedule,
      generateUpcomingTransaction,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
