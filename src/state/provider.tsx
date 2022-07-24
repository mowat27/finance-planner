import React, { useState } from "react";

import { AppContext } from "./context";
import { generatePaymentSchedule } from "./generators";

import { fetchTransactions, fetchPaymentSchedule } from "../api";

// TODO: figure out why React.FC's implicit children gives an error
type Props = {
  children?: React.ReactNode;
};

export function AppProvider({ children }: Props) {
  const [transactions, setTransactions] = useState(fetchTransactions());
  const [paymentSchedule, setPaymentSchedule] = useState(
    fetchPaymentSchedule()
  );

  const value = {
    state: { transactions, paymentSchedule },
    actions: { setTransactions, setPaymentSchedule, generatePaymentSchedule },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
