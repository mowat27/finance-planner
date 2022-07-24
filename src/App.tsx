import styles from "../styles/Home.module.css";

import TransactionList, {
  TransactionsProvider,
} from "./components/Transactions";
import Header from "./components/Header";
import Summary from "./components/Summary";

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
