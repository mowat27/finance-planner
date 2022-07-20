import { Payee, Recipient } from "./types";

export interface Transaction {
  date: Date;
  amount: number;
  otherParty: Payee | Recipient;
  description: string;
  reference?: string;
}
