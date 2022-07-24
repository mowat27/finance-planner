import { Transaction, ThirdParty } from "../state/transactions/types";
import { DateTime } from "luxon";

export interface MonthlyPayment {
  amount: number;
  otherParty: ThirdParty;
  description: string;
  dayOfMonth: number;
  lastPayment?: DateTime;
  reference?: string;
}

export function* generatePaymentSchedule(
  schedule: MonthlyPayment,
  startingFrom: DateTime
) {
  let date = startingFrom;
  const { amount, otherParty, description, reference } = schedule;

  let nextPayment: Transaction = {
    date,
    amount,
    otherParty,
    description,
    reference,
  };
  while (true) {
    yield nextPayment;
    date = date.plus({ months: 1 });
    nextPayment = { ...nextPayment, date };
  }
}
