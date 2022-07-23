export type Payee = string;
export type Recipient = string;
export type ThirdParty = Payee | Recipient;

export interface Transaction {
  date: Date;
  amount: number;
  otherParty: ThirdParty;
  description: string;
  reference?: string;
}
