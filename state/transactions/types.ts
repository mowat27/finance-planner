export type Payee = string;
export type Recipient = string;

export interface Transaction {
  date: Date;
  amount: number;
  otherParty: Payee | Recipient;
  description: string;
  reference?: string;
}
