import { Money } from "ts-money";

interface Props {
  amount: Money;
}

const ZERO = new Money(0, "GBP");

function Balance({ amount }: Props) {
  const colour = amount.lessThan(ZERO) ? "text-red-600" : "text-green-600";
  return <span className={`text-xl ${colour}`}>£{amount.toString()}</span>;
}

export default Balance;
