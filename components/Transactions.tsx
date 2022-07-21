import useTransactions from "../state/transactions/use";
import { Transaction } from "../state/transactions/types";

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
  const { state } = useTransactions();
  return (
    <div>
      <h2>Transactions</h2>
      {state.transactions.map((trxn: Transaction) => Transaction(trxn))}
    </div>
  );
};

export default Transactions;
