import { DateTime } from "luxon";
import { Transaction, MonthlyPayment } from "../types";

export function fetchTransactions(): Transaction[] {
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
}

export function fetchPaymentSchedule(): MonthlyPayment[] {
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
}
