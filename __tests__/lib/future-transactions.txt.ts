import { DateTime } from "luxon";
import { Seq, Range } from "immutable";
import "@testing-library/jest-dom";

import { Transaction, ThirdParty } from "../../state/transactions/types";

interface MonthlyPayment {
  amount: number;
  otherParty: ThirdParty;
  description: string;
  dayOfMonth: number;
  lastPayment?: DateTime;
  reference?: string;
}

function testSeq() {
  return Range(1, Infinity);
}

function* generatePaymentSchedule(
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

describe("Generating transactions from a payment schedule", () => {
  it("generates a list of transactions from a monthly payment schedule", () => {
    const payment: MonthlyPayment = {
      amount: 100,
      otherParty: "The Bank",
      description: "Loan",
      dayOfMonth: 1,
    };

    expect(testSeq().take(2).toArray()).toStrictEqual([1, 2]);
  });

  it("generates a list of monthly transactions", () => {
    const payment: MonthlyPayment = {
      amount: 100,
      otherParty: "The Bank",
      description: "Loan",
      dayOfMonth: 1,
    };
    const schedule = generatePaymentSchedule(
      payment,
      DateTime.fromISO("2022-01-01")
    );

    let { value: first } = schedule.next();
    let { value: second } = schedule.next();
    let { value: third } = schedule.next();

    expect(first).toStrictEqual({
      amount: 100,
      date: DateTime.fromISO("2022-01-01"),
      description: "Loan",
      otherParty: "The Bank",
      reference: undefined,
    });
    expect(second).toStrictEqual({
      ...first,
      date: DateTime.fromISO("2022-02-01"),
    });
    expect(third).toStrictEqual({
      ...first,
      date: DateTime.fromISO("2022-03-01"),
    });
  });
});
