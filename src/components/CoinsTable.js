import React, { useContext, useState, useEffect } from "react";
import { CoinList } from "../config/api";
import { CryptoContext } from "../CryptoProvider";
import axios from "axios";
import {
  ThemeProvider,
  createTheme,
  Container,
  Typography,
  TextField,
} from "@mui/material";
function CoinsTable() {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const { currency } = useContext(CryptoContext);
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const response = await axios.get(CoinList(currency));
      const data = await response.data;
      setCoins(data);
      setLoading(false);
    } catch (err) {
      console.log("Error is: ", err);
    }
  };
  console.log("coins", coins);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Container>
    </ThemeProvider>
  );
}
export default CoinsTable;
