import { DateTime } from "luxon";

import { server } from "../../config";
import { Transaction, MonthlyPayment } from "../types";

// Because dates are serialized as strings in JSON
interface ApiTransaction extends Omit<Transaction, "date"> {
  date: string;
}

function toTransaction(apiTransaction: ApiTransaction): Transaction {
  return { ...apiTransaction, date: DateTime.fromISO(apiTransaction.date) };
}

export async function fetchTransactions(): Promise<Transaction[]> {
  const res = await fetch(`${server}/api/statements`);
  return await res
    .json()
    .then((apiTransactions) => apiTransactions.map(toTransaction));
}

export function fetchPaymentSchedule(): MonthlyPayment[] {
  return [
    {
      amount: +3000,
      otherParty: "ACME Payroll",
      description: "Salary",
      paymentDay: 1,
    },
    {
      amount: -100,
      otherParty: "The Bank",
      description: "Loan",
      paymentDay: 1,
    },
    {
      amount: -35,
      otherParty: "Insurance co",
      description: "House Insurance",
      paymentDay: 25,
    },
  ];
}
