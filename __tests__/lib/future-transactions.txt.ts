import { Seq, Range } from "immutable";
import "@testing-library/jest-dom";

import { Transaction, ThirdParty } from "../../state/transactions/types";

interface MonthlyPayment {
  amount: number;
  otherParty: ThirdParty;
  description: string;
  dayOfMonth: number;
  lastPayment?: Date;
  reference?: string;
}

function testSeq() {
  return Range(1, Infinity);
}

function* generatePaymentSchedule(
  schedule: MonthlyPayment,
  startingFrom: Date
) {
  let date;
  const { amount, otherParty, description, reference } = schedule;

  let nextPayment: Transaction = {
    date: startingFrom,
    amount,
    otherParty,
    description,
    reference,
  };
  while (true) {
    yield nextPayment;
    date = new Date(nextPayment.date);
    date.setMonth(date.getMonth() + 1);
    nextPayment = { ...nextPayment, date };
  }
}

describe("Generating transactions from a payment schedule", () => {
  it("generates a list of transactions", () => {
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
    const schedule = generatePaymentSchedule(payment, new Date("2022-01-01"));

    let { value: first } = schedule.next();
    let { value: second } = schedule.next();
    let { value: third } = schedule.next();

    expect(first).toStrictEqual({
      amount: 100,
      date: new Date("2022-01-01"),
      description: "Loan",
      otherParty: "The Bank",
      reference: undefined,
    });
    expect(second).toStrictEqual({ ...first, date: new Date("2022-02-01") });
    expect(third).toStrictEqual({ ...first, date: new Date("2022-03-01") });
  });
});
