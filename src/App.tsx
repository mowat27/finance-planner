import styles from "../styles/Home.module.css";

import TransactionList, { TransactionsProvider } from "./Transactions";
import Header from "./Header";
import Summary from "./Summary";

function App() {
  return (
    <TransactionsProvider>
      <div>
        <Header />
        <main className={styles.main}>
          <Summary />
          <TransactionList />
        </main>
      </div>
    </TransactionsProvider>
  );
}

export default App;
