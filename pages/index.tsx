import type { NextPage } from "next";
import Head from "next/head";
import App from "../src/App";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Finance Planner</title>
        <meta name="description" content="Personal finance planning app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </div>
  );
};

export default Home;
