import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Coin from './components/coinItem/Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then(response => {
        setCoins(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filterCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="header">
        <h1 className="brand">
          <i className="fas fa-moon" />
          CoinMoon
        </h1>
        <form>
          <input
            onChange={handleChange}
            className="inputField"
            type="text"
            placeholder="Search a Coin"
          />
        </form>
      </div>
      <div className="coinsContainer">
        {filterCoins.map(coin => (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketCap={coin.market_cap}
            volume={coin.total_volume}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
