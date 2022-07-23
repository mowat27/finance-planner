import React from "react";
import { render, screen } from "@testing-library/react";
import TransactionsProvider from "../../../state/transactions/provider";
import useTransactions from "../../../state/transactions/use";
import "@testing-library/jest-dom";

describe("TransactionsProvider", () => {
  it("provides a list of past transactions", () => {
    const TransactionCount = () => {
      const {
        state: { transactions },
      } = useTransactions();
      return <div>Count: {transactions.length}</div>;
    };

    render(
      <TransactionsProvider>
        <TransactionCount />
      </TransactionsProvider>
    );

    const count = screen.getByText(/Count/);
    expect(count).toHaveTextContent("Count: 3");
  });
});
