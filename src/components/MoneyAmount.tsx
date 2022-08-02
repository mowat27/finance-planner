import { Money } from "ts-money";

interface Props {
  amount: Money;
}

const ZERO = new Money(0, "GBP");

function MoneyAmount({ amount }: Props) {
  const formatting = amount.greaterThan(ZERO) ? "text-green-600" : "";
  return <span className={formatting}>£{amount.toString()}</span>;
}

export default MoneyAmount;
