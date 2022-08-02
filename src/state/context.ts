import { createContext } from "react";

import { LedgerEntry, MonthlyPayment } from "../types";

export interface State {
  state: {
    transactions: LedgerEntry[];
    upcoming: LedgerEntry[];
    paymentSchedule: MonthlyPayment[];
    months: number;
  };
  actions: {
    setTransactions(transactions: LedgerEntry[]): void;
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
    setTransactions: (transactions: LedgerEntry[]) => {},
    setPaymentSchedule: (paymentSchedule: MonthlyPayment[]) => {},
    addMonth: () => {},
  },
};

export const AppContext = createContext(initialState);
