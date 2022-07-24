import styles from "../styles/Home.module.css";

import { AppProvider } from "./state";

import TransactionList from "./components/TransactionList";
import Header from "./components/Header";
import Summary from "./components/Summary";

function App() {
  return (
    <AppProvider>
      <div>
        <Header />
        <main className={styles.main}>
          <Summary />
          <TransactionList />
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
