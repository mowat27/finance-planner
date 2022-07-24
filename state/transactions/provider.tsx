import React, { useState } from "react";
import { DateTime } from "luxon";

import { Transaction, MonthlyPayment } from "./types";
import TransactionsContext from "./context";

const fetchTransactions = (): Transaction[] => {
  return [
    {
      date: DateTime.fromISO("2022-07-01"),
      amount: 3000,
      otherParty: "ACME Payroll",
      reference: "emp12345",
      description: "July salary",
    },
    {
      date: DateTime.fromISO("2022-07-02"),
      amount: -100,
      otherParty: "Highland Council",
      description: "Council tax",
    },
    {
      date: DateTime.fromISO("2022-07-03"),
      amount: -132.87,
      otherParty: "Leccy & Co",
      description: "Electricity Monthly DD",
    },
  ];
};

const fetchPaymentSchedule = (): MonthlyPayment[] => {
  return [
    {
      amount: 100,
      otherParty: "The Bank",
      description: "Loan",
      dayOfMonth: 1,
    },
    {
      amount: 35,
      otherParty: "Insurance co",
      description: "House Insurance",
      dayOfMonth: 15,
    },
  ];
};

type Props = {
  children?: React.ReactNode;
};

// TODO: figure out why React.FC's implicit children gives an error
const TransactionsProvider = ({ children }: Props) => {
  const [transactions, setTransactions] = useState(fetchTransactions());
  const [paymentSchedule, setPaymentSchedule] = useState(
    fetchPaymentSchedule()
  );

  const value = {
    state: { transactions, paymentSchedule },
    actions: { setTransactions, setPaymentSchedule },
  };

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
