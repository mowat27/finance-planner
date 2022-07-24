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
      dayOfMonth: 1,
    };
    const schedule = generateUpcomingTransaction(
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
