import { DateTime } from "luxon";

export type Payee = string;
export type Recipient = string;
export type ThirdParty = Payee | Recipient;

export interface Transaction {
  date: DateTime;
  amount: number;
  otherParty: ThirdParty;
  description: string;
  reference?: string;
}

export interface MonthlyPayment {
  amount: number;
  otherParty: ThirdParty;
  description: string;
  dayOfMonth: number;
  lastPayment?: DateTime;
  reference?: string;
}
