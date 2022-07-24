import { createContext } from "react";
import { Transaction, MonthlyPayment } from "../types";

const initialState = {
  state: {
    transactions: [] as Transaction[],
    paymentSchedule: [] as MonthlyPayment[],
  },
  actions: { setTransactions: (transactions: Transaction[]) => {} },
};

export const TransactionsContext = createContext(initialState);
