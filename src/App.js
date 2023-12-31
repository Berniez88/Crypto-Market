import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";

function App() {
  const styles = {
    backgroundColor: "#61677A", //14161a 61677A
    color: "white",
    minHeight: "100vh",
  };

  return (
    <BrowserRouter>
      <div style={styles}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
