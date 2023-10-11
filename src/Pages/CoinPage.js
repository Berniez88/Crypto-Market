import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CryptoContext } from "../CryptoProvider";
import { SingleCoin } from "../config/api";
import axios from "axios";
import CoinInfo from "../components/CoinInfo";
import { LinearProgress, Typography, styled } from "@mui/material";
import { numberWithCommas } from "../components/Banner/Carousel";
import { useTheme } from "@emotion/react";
// import parse from "html-react-parser";
// import ReactHtmlParser from "react-html-parser";
function CoinPage() {
  const selectedCoin = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = useContext(CryptoContext);

  // const useStyles = makeStyles((theme) => ({
  //   container: {
  //     display: "flex",
  //     [theme.breakpoints.down("md")]: {
  //       flexDirection: "column",
  //       alignItems: "center",
  //     },
  //   },
  //   sidebar: {
  //     width: "30%",
  //     [theme.breakpoints.down("md")]: {
  //       width: "100%",
  //     },
  //     display: "flex",
  //     flexDirection: "column",
  //     alignItems: "center",
  //     marginTop: 25,
  //     borderRight: "2px solid grey",
  //   },
  // }));
  const theme = useTheme();
  const Container = styled("div")(({ theme }) => ({
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const Sidebar = styled("div")(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  }));

  const StyledTypography = styled(Typography)(({ theme }) => ({
    // Your styles here
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "montserrat",
  }));

  const CoinDescription = styled(Typography)(({ theme }) => ({
    // Your styles here
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  }));

  const MarketData = styled("div")(({ theme }) => ({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justiContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      display: "column",
      justiContent: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  }));

  // const styles = {
  //   marketData: {
  //     alignSelf: "start",
  //     padding: 25,
  //     paddingTop: 10,
  //     width: "100%",
  //     [theme.breakpoints.down("md")]: {
  //       display: "flex",
  //       justiContent: "space-around",
  //     },
  //     [theme.breakpoints.down("sm")]: {
  //       display: "column",
  //       justiContent: "center",
  //     },
  //     [theme.breakpoints.down("xs")]: {
  //       alignItems: "start",
  //     },
  //   },
  // };

  const fetchCoin = async () => {
    try {
      const response = await axios.get(SingleCoin(selectedCoin.id));
      const data = await response.data;
      setCoin(data);
    } catch (err) {
      console.log("Error is: ", err);
    }
  };
  console.log("coin", coin);

  useEffect(() => {
    fetchCoin();
  }, []);

  console.log("selectedCoin", selectedCoin);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <Container className="container">
      <Sidebar className="sidebar">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <StyledTypography variant="h3" className="heading">
          {coin?.name}
        </StyledTypography>
        <CoinDescription variant="subtitle1">
          {coin?.description.en.split(". ")[0]}
        </CoinDescription>
        <MarketData>
          <span style={{ display: "flex" }}>
            <Typography variant="h5">Rank:</Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5">Current Price:</Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5">Market Cap</Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </MarketData>
      </Sidebar>
      <CoinInfo coin={coin}></CoinInfo>
    </Container>
  );
}

export default CoinPage;
