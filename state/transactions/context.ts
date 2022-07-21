import { createContext } from "react";
import { Transaction } from "./types";

const initialState = {
  state: { transactions: [] as Transaction[] },
  actions: { setTransactions: (transactions: Transaction[]) => {} },
};

const TransactionsContext = createContext(initialState);

export default TransactionsContext;
