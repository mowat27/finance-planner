import type { NextPage } from "next";
import Head from "next/head";

import TransactionsProvider from "../src/Transactions/state/provider";

import styles from "../styles/Home.module.css";

import Header from "../src/Header";
import Transactions from "../src/Transactions";
import Summary from "../src/Summary";

const Home: NextPage = () => {
  return (
    <TransactionsProvider>
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
    </TransactionsProvider>
  );
};

export default Home;
