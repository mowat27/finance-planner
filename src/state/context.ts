import { createContext } from "react";

import { Transaction, MonthlyPayment } from "../types";

export interface State {
  state: {
    transactions: Transaction[];
    upcoming: Transaction[];
    paymentSchedule: MonthlyPayment[];
  };
  actions: {
    setTransactions(transactions: Transaction[]): void;
    setPaymentSchedule(paymentSchedule: MonthlyPayment[]): void;
  };
}

const initialState: State = {
  state: {
    transactions: [],
    upcoming: [],
    paymentSchedule: [],
  },
  actions: {
    setTransactions: (transactions: Transaction[]) => {},
    setPaymentSchedule: (paymentSchedule: MonthlyPayment[]) => {},
  },
};

export const AppContext = createContext(initialState);
