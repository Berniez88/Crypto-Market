import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  createTheme,
  ThemeProvider,
} from "@mui/material";
// import { CryptoState } from "../CryptoProvider"; //(this works)
import { CryptoContext } from "../CryptoProvider";

function Header() {
  const navigate = useNavigate();
  //const { currency, updateCurrency, symbol } = CryptoState(); //(this works)
  const CryptoContextData = useContext(CryptoContext);

  const styles = {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              style={styles}
              variant="h6"
            >
              Crypto Market
            </Typography>
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
                color: "white",
              }}
              value={CryptoContextData.currency}
              onChange={(e) => CryptoContextData.updateCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
