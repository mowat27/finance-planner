import { AppProvider } from "./state";

import TransactionList from "./components/TransactionList";
import Header from "./components/Header";
import Summary from "./components/Summary";

function App() {
  return (
    <AppProvider>
      <div className="container mx-auto p-6">
        <Header />
        <main>
          <Summary />
          <TransactionList />
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
