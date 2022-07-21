import { useContext } from "react";
import TransactionsContext from "./context";

const useTransactions = () => useContext(TransactionsContext);

export default useTransactions;
