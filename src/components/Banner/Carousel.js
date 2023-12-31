import React, { useState, useEffect, useContext } from "react";
import { TrendingCoins } from "../../config/api";
// import { useCryptoState } from "../../CryptoProvider";
import { CryptoContext } from "../../CryptoProvider";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const styles = {
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
};

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Carousel() {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = useContext(CryptoContext);

  const apiURL = TrendingCoins(currency);

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link style={styles.carouselItem}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span style={{ color: profit > 0 ? "rgb(14,203,129)" : "red" }}>
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const fetchTrendingCoins = async () => {
    try {
      const response = await axios.get(apiURL);
      const data = await response.data;
      setTrending(data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div style={styles.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
        disableButtonsControls
      ></AliceCarousel>
    </div>
  );
}

export default Carousel;
