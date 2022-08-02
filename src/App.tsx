import { AppProvider } from "./state";

import Ledger from "./components/Ledger";
import Header from "./components/Header";
import Summary from "./components/Summary";

function App() {
  return (
    <AppProvider>
      <div className="container mx-auto p-6">
        <Header />
        <main>
          <Summary />
          <Ledger />
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
