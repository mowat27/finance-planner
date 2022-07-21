import type { NextPage } from "next";
import Head from "next/head";

import TransactionsProvider from "../state/transactions/provider";

import styles from "../styles/Home.module.css";

import Header from "../components/Header";
import Transactions from "../components/Transactions";
import Summary from "../components/Summary";

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
