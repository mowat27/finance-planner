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

function newUpcoming(paymentSchedule: MonthlyPayment[], numMonths: number) {
  return paymentSchedule
    .reduce(
      (arr: Transaction[], monthlyPayment: MonthlyPayment): Transaction[] => {
        const generator = upcomingTransactionGenerator(
          monthlyPayment,
          DateTime.now()
        );
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
  const [months, setMonths] = useState(1);

  useEffect(() => {
    setUpcoming(newUpcoming(paymentSchedule, months));
  }, [paymentSchedule, months]);

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
