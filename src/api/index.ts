import { DateTime } from "luxon";
import { Money } from "ts-money";

import { server } from "../../config";
import { Transaction, MonthlyPayment } from "../types";

// Because dates are serialized as strings in JSON
interface ApiTransaction extends Omit<Transaction, "date" | "amount"> {
  amount: number;
  date: string;
}

function toTransaction(apiTransaction: ApiTransaction): Transaction {
  return {
    ...apiTransaction,
    amount: Money.fromDecimal(apiTransaction.amount, "GBP"),
    date: DateTime.fromISO(apiTransaction.date),
  };
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
      amount: Money.fromDecimal(3000, "GBP"),
      otherParty: "ACME Payroll",
      description: "Salary",
      paymentDay: 1,
    },
    {
      amount: Money.fromDecimal(-100, "GBP"),
      otherParty: "The Bank",
      description: "Loan",
      paymentDay: 1,
    },
    {
      amount: Money.fromDecimal(-35, "GBP"),
      otherParty: "Insurance co",
      description: "House Insurance",
      paymentDay: 25,
    },
  ];
}
