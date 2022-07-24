import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

import { AppContext } from "./context";

import { Transaction, MonthlyPayment } from "../types";
import { fetchTransactions, fetchPaymentSchedule } from "../api";

export function* generateUpcomingTransaction(
  schedule: MonthlyPayment,
  startingFrom: DateTime
): Iterator<Transaction> {
  const { dayOfMonth: paymentDay } = schedule;
  const { day, month } = startingFrom;

  let date =
    paymentDay > day
      ? startingFrom.set({ day: paymentDay })
      : startingFrom.set({ day: paymentDay, month: month + 1 });

  const { amount, otherParty, description, reference } = schedule;

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
    setUpcoming(paymentSchedule.reduce(appendNextTransaction, []));
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
