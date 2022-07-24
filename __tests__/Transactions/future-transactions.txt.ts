import "@testing-library/jest-dom";

import { DateTime } from "luxon";

import { generateUpcomingTransaction } from "../../src/state/provider";
import { MonthlyPayment } from "../../src/types";

describe("Generating transactions from a payment schedule", () => {
  it("generates a list of monthly transactions", () => {
    const payment: MonthlyPayment = {
      amount: 100,
      otherParty: "The Bank",
      description: "Loan",
      paymentDay: 15,
    };
    const schedule = generateUpcomingTransaction(
      payment,
      DateTime.fromISO("2022-01-14")
    );

    let { value: first } = schedule.next();
    let { value: second } = schedule.next();
    let { value: third } = schedule.next();

    expect(first).toStrictEqual({
      amount: 100,
      date: DateTime.fromISO("2022-01-15"),
      description: "Loan",
      otherParty: "The Bank",
      reference: undefined,
    });
    expect(second).toStrictEqual({
      ...first,
      date: DateTime.fromISO("2022-02-15"),
    });
    expect(third).toStrictEqual({
      ...first,
      date: DateTime.fromISO("2022-03-15"),
    });
  });

  it("returns next months payment if this months payment date has passed", () => {
    const payment: MonthlyPayment = {
      amount: 100,
      otherParty: "The Bank",
      description: "Loan",
      paymentDay: 14,
    };
    const schedule = generateUpcomingTransaction(
      payment,
      DateTime.fromISO("2022-01-15")
    );

    let { value, done } = schedule.next();
    expect(value.date).toStrictEqual(DateTime.fromISO("2022-02-14"));
    expect(done).toBeFalsy();
  });
});
