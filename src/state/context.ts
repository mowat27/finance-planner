import { createContext } from "react";

import { DateTime } from "luxon";

import { Transaction, MonthlyPayment } from "../types";

import { generatePaymentSchedule } from "./generators";

export interface State {
  state: {
    transactions: Transaction[];
    paymentSchedule: MonthlyPayment[];
  };
  actions: {
    setTransactions(transactions: Transaction[]): void;
    setPaymentSchedule(paymentSchedule: MonthlyPayment[]): void;
    generatePaymentSchedule(
      schedule: MonthlyPayment,
      startingFrom: DateTime
    ): Iterator<Transaction>;
  };
}

const initialState: State = {
  state: {
    transactions: [],
    paymentSchedule: [],
  },
  actions: {
    setTransactions: (transactions: Transaction[]) => {},
    setPaymentSchedule: (paymentSchedule: MonthlyPayment[]) => {},
    generatePaymentSchedule,
  },
};

export const AppContext = createContext(initialState);
