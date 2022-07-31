import { NextApiRequest, NextApiResponse } from "next";

import { DateTime } from "luxon";

import { Transaction } from "../../../src/types";
import csv from "../../../src/lib/csv";

interface MonzoStatementTransaction {
  Address: string;
  Amount: number;
  Category: string;
  Categorysplit: string;
  Currency: string;
  Date: string;
  Description: string;
  Emoji: string;
  Localamount: number;
  Localcurrency: string;
  MoneyIn: number | string;
  MoneyOut: number | string;
  Name: string;
  "Notesand#tags": string;
  Receipt: string;
  Time: string;
  TransactionID: string;
  Type: string;
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse
): void {
  const csvFile = "tmp/statements/monzo/main-account.csv";
  const statement = csv.toJson(csvFile);
  const transactions: Transaction[] = statement.map(
    (row: MonzoStatementTransaction) => {
      return {
        date: DateTime.now(),
        amount: row.Amount,
        otherParty: row.Name,
        description: row.Description,
        reference: row["Notesand#tags"],
      };
    }
  );

  res.status(200).json(transactions);
}
