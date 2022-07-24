import { createContext } from "react";

import { Transaction, MonthlyPayment } from "../types";

export interface State {
  state: {
    transactions: Transaction[];
    upcoming: Transaction[];
    paymentSchedule: MonthlyPayment[];
    months: number;
  };
  actions: {
    setTransactions(transactions: Transaction[]): void;
    setPaymentSchedule(paymentSchedule: MonthlyPayment[]): void;
    addMonth(): void;
  };
}

const initialState: State = {
  state: {
    transactions: [],
    upcoming: [],
    paymentSchedule: [],
    months: 1,
  },
  actions: {
    setTransactions: (transactions: Transaction[]) => {},
    setPaymentSchedule: (paymentSchedule: MonthlyPayment[]) => {},
    addMonth: () => {},
  },
};

export const AppContext = createContext(initialState);
