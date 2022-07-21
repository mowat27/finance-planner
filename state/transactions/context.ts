import { createContext } from "react";
import { Transaction } from "./types";

// interface State {
//   transactions: Transaction[];
// }

// interface Actions {
//   setTransactions(transactions: Transaction[]): void;
// }

const initialState = {
  state: { transactions: [] as Transaction[] },
  actions: { setTransactions: (transactions: Transaction[]) => {} },
};

const TransactionsContext = createContext(initialState);

export default TransactionsContext;
