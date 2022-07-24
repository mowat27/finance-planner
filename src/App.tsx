import styles from "../styles/Home.module.css";

import Transactions from "./Transactions";
import Header from "./Header";
import Summary from "./Summary";
import TransactionsProvider from "./Transactions/state/provider";

function App() {
  return (
    <TransactionsProvider>
      <div>
        <Header />
        <main className={styles.main}>
          <Summary />
          <Transactions />
        </main>
      </div>
    </TransactionsProvider>
  );
}

export default App;
