interface Props {
  currencySymbol: string;
  amount: number;
}

function MoneyAmount({ currencySymbol, amount }: Props) {
  let prefix = " ";
  let formatting = "";

  if (amount > 0) {
    prefix = "+";
    formatting += "text-green-600";
  }
  return (
    <span className={formatting}>
      {prefix}
      {currencySymbol}
      {Math.abs(amount)}
    </span>
  );
}

export default MoneyAmount;
