import React, { useContext } from "react";
import { TransactionsContext } from "../pages/index";
import { Transaction } from "../shared/interfaces";

export interface TransactionProps {
  transactions: Transaction[];
}

const Transaction = ({
  date,
  amount,
  otherParty,
  description,
  reference,
}: Transaction) => {
  return (
    <div>
      <span>{date.toDateString()}</span>&nbsp;
      <span>{amount}</span>&nbsp;
      <span>{otherParty}</span>&nbsp;
      <span>{description}</span>&nbsp;
      <span>{reference}</span>
    </div>
  );
};

const Transactions = () => {
  const { transactions } = useContext(TransactionsContext);
  return (
    <div>
      <h2>Transactions</h2>
      {transactions.map((trxn) => Transaction(trxn))}
    </div>
  );
};

export default Transactions;
