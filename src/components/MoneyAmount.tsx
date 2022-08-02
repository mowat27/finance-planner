import { Money } from "ts-money";

interface Props {
  currencySymbol: string;
  amount: Money;
}

const ZERO = new Money(0, "GBP");

function MoneyAmount({ currencySymbol, amount }: Props) {
  let prefix = " ";
  let formatting = "";

  if (amount.greaterThan(ZERO)) {
    formatting += "text-green-600";
  }
  return (
    <span className={formatting}>
      {prefix}
      {currencySymbol}
      {amount.toString()}
    </span>
  );
}

export default MoneyAmount;
