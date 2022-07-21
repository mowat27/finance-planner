import { createContext } from "react";

import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.css";

import Header from "../components/Header";
import Transactions from "../components/Transactions";
import Summary from "../components/Summary";

import { Transaction } from "../shared/interfaces";

export const TransactionsContext = createContext({});

const transactions: Transaction[] = [
  {
    date: new Date("2022-07-01"),
    amount: 3000,
    otherParty: "ACME Payroll",
    reference: "emp12345",
    description: "July salary",
  },
  {
    date: new Date("2022-07-02"),
    amount: -100,
    otherParty: "Highland Council",
    description: "Council tax",
  },
  {
    date: new Date("2022-07-03"),
    amount: -132.87,
    otherParty: "Leccy & Co",
    description: "Electricity Monthly DD",
  },
];

const Home: NextPage = () => {
  return (
    <TransactionsContext.Provider value={{ transactions }}>
      <div className={styles.container}>
        <Head>
          <title>Finance Planner</title>
          <meta name="description" content="Personal finance planning app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main className={styles.main}>
          <Summary />
          <Transactions />
        </main>
      </div>
    </TransactionsContext.Provider>
  );
};

export default Home;
