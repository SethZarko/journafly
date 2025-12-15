import { Outlet } from "react-router";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { useAppState } from "./context/AppStateContext";

function App() {
  const { quotes, currentQuote, selectedName } = useAppState()

  return (
    <div className="app-wrapper">
      <Header quotes={quotes} currentQuote={currentQuote} author={selectedName} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
