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
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Banner/Carousel";
function CoinsTable() {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  console.log("search is: ", search);
  const { currency, symbol } = useContext(CryptoContext);

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

  const handleSearch = () => {
    return coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
      );
    });
  };

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
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => {
                    return (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        sx={{
                          backgroundColor: "#707687",
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "#9094a1",
                          },
                          fontFamily: "montserrat",
                        }}
                        onClick={() => {
                          navigate(`/coins/${row.id}`);
                        }}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          style={{
            padding: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          //! come back to this sx={{ color: "gold" }}
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            console.log("value is: ", value);
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}
export default CoinsTable;
