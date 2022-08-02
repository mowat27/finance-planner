import { DateTime } from "luxon";
import { Money } from "ts-money";

export type Payee = string;
export type Recipient = string;
export type ThirdParty = Payee | Recipient;

export interface Transaction {
  date: DateTime;
  amount: Money;
  otherParty: ThirdParty;
  description: string;
  reference?: string;
}

export interface LedgerEntry extends Transaction {
  balance: Money;
}

export interface MonthlyPayment {
  amount: Money;
  otherParty: ThirdParty;
  description: string;
  paymentDay: number;
  lastPayment?: DateTime;
  reference?: string;
}
