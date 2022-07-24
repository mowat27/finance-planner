import { Transaction, MonthlyPayment } from "../state/transactions/types";
import { DateTime } from "luxon";

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
