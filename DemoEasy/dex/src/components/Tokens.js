import React, { useState, useEffect } from "react";
import tokenList from "../tokenList.json";
import axios from "axios";

function Tokens() {
  const USDC = tokenList[0];
  const ETH = tokenList[1];
  const USDT = tokenList[2];
  const GUSD = tokenList[3];
  const DAI = tokenList[4];
  const WETH = tokenList[5];
  const WBTC = tokenList[6];
  const MATIC = tokenList[7];
  const UNI = tokenList[8];
  const MKR = tokenList[10];
  const SHIB = tokenList[11];
  const AAVE = tokenList[12];
  const [ethPrice, setEthPrice] = useState(null);
  const [usdcPrice, setUsdcPrice] = useState(null);
  const [usdtPrice, setUsdtPrice] = useState(null);
  const [gusdPrice, setGusdPrice] = useState(null);
  const [daiPrice, setDaiPrice] = useState(null);
  const [wethPrice, setWethPrice] = useState(null);
  const [wbtcPrice, setWbtcPrice] = useState(null);
  const [maticPrice, setMaticPrice] = useState(null);
  const [uniPrice, setUniPrice] = useState(null);
  const [shibPrice, setShibPrice] = useState(null);
  const [aavePrice, setAavePrice] = useState(null);
  const [mkrPrice, setMkrPrice] = useState(null);

  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const usernamelocal = localStorage.getItem('username');


  const addToCart = (item) => {
    // Check if the item already exists in the cart
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.name === item.name);

    if (existingItemIndex !== -1) {
      // If the item exists, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1; // Increase quantity by 1
      setCartItems(updatedCartItems);
    } else {
      // If the item doesn't exist, add it to the cart with quantity 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };
  const clearCart = () => {
    setCartItems([]);
  };

  const cartItemsToString = cartItems.map((item) => {
    return `${item.name} - Quantity: ${item.quantity}`;
  }).join(', ');

  const handlecheckout = () => {
    console.log(cartItemsToString);
    console.log(usernamelocal);
    axios.post('http://localhost:3001/tokens', {
      cartItemsToString,
      usernamelocal
    })
      .then(response => {
        console.log(response.data); // Log the response data
        alert('Success')

      })
      .catch(error => {
        // Log the error for debugging purposes
        console.error('Error:', error);
        // Handle the error or display a message to the user
        alert('Error')

      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ethRes = await axios.get("http://localhost:3002/tokenPrice", {
          params: { addressOne: ETH.address, addressTwo: ETH.address }
        });
        setEthPrice(ethRes.data.tokenOne);

        const usdcRes = await axios.get("http://localhost:3002/tokenPrice", {
          params: { addressOne: USDC.address, addressTwo: USDC.address }
        });
        setUsdcPrice(usdcRes.data.tokenOne);

        const usdtRes = await axios.get("http://localhost:3002/tokenPrice", {
          params: { addressOne: USDT.address, addressTwo: USDT.address }
        });
        setUsdtPrice(usdtRes.data.tokenOne);

        const gusdRes = await axios.get("http://localhost:3002/tokenPrice", {
          params: { addressOne: GUSD.address, addressTwo: GUSD.address }
        });
        setGusdPrice(gusdRes.data.tokenOne);

        const daiRes = await axios.get("http://localhost:3002/tokenPrice", {
          params: { addressOne: DAI.address, addressTwo: DAI.address }
        });
        setDaiPrice(daiRes.data.tokenOne);

        const wethRes = await axios.get("http://localhost:3002/tokenPrice", {
          params: { addressOne: WETH.address, addressTwo: WETH.address }
        });
        setWethPrice(wethRes.data.tokenOne);

        const wbtcRes = await axios.get("http://localhost:3002/tokenPrice", {
          params: { addressOne: WBTC.address, addressTwo: WBTC.address }
        });
        setWbtcPrice(wbtcRes.data.tokenOne);

        const maticRes = await axios.get("http://localhost:3002/tokenPrice", {
          params: { addressOne: MATIC.address, addressTwo: MATIC.address }
        });
        setMaticPrice(maticRes.data.tokenOne);

        const uniRes = await axios.get("http://localhost:3002/tokenPrice", {
          params: { addressOne: UNI.address, addressTwo: UNI.address }
        });
        setUniPrice(uniRes.data.tokenOne);

        const shibRes = await axios.get("http://localhost:3002/tokenPrice", {
          params: { addressOne: SHIB.address, addressTwo: SHIB.address }
        });
        setShibPrice(shibRes.data.tokenOne);

        const aaveRes = await axios.get("http://localhost:3002/tokenPrice", {
          params: { addressOne: AAVE.address, addressTwo: AAVE.address }
        });
        setAavePrice(aaveRes.data.tokenOne);

        const mkrRes = await axios.get("http://localhost:3002/tokenPrice", {
          params: { addressOne: MKR.address, addressTwo: MKR.address }
        });
        setMkrPrice(mkrRes.data.tokenOne);

      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchData();
  }, [ETH.address, USDC.address]);

  return (
    <div>
      <div className="Markets">
        <h1 style={{ color: 'white' }}>Markets</h1>
      </div>
      <div className="MarketContainers">
        <div className="MarketContainer" >
          <div>{ETH.name}</div>
          <div>{ETH.ticker}</div>
          <img src={ETH.img} height={150} alt={ETH.name}></img>
          <div>{ethPrice}</div>
          <button className="btn btn-primary btn-lg btn-block" onClick={() => addToCart(ETH)}>Add to cart</button>
        </div>
        <div className="MarketContainer">
          <div>{USDC.name}</div>
          <div>{USDC.ticker}</div>
          <img src={USDC.img} height={150} alt={USDC.name}></img>
          <div>{usdcPrice}</div>
          <button className="btn btn-primary btn-lg btn-block" onClick={() => addToCart(USDC)}>Add to cart</button>
        </div>
        <div className="MarketContainer">
          <div>{USDT.name}</div>
          <div>{USDT.ticker}</div>
          <img src={USDT.img} height={150} alt={USDT.name}></img>
          <div>{usdtPrice}</div>
          <button className="btn btn-primary btn-lg btn-block" onClick={() => addToCart(USDT)}>Add to cart</button>
        </div>
        <div className="MarketContainer">
          <div>{GUSD.name}</div>
          <div>{GUSD.ticker}</div>
          <img src={GUSD.img} height={150} alt={GUSD.name}></img>
          <div>{gusdPrice}</div>
          <button className="btn btn-primary btn-lg btn-block" onClick={() => addToCart(GUSD)}>Add to cart</button>
        </div>
        <div className="MarketContainer">
          <div>{DAI.name}</div>
          <div>{DAI.ticker}</div>
          <img src={DAI.img} height={150} alt={DAI.name}></img>
          <div>{daiPrice}</div>
          <button className="btn btn-primary btn-lg btn-block" onClick={() => addToCart(DAI)}>Add to cart</button>
        </div>
        <div className="MarketContainer">
          <div>{WETH.name}</div>
          <div>{WETH.ticker}</div>
          <img src={WETH.img} height={150} alt={WETH.name}></img>
          <div>{wethPrice}</div>
          <button className="btn btn-primary btn-lg btn-block" onClick={() => addToCart(WETH)}>Add to cart</button>
        </div>
      </div>
      <div>
      </div>
      <div className="Markets">
      </div>
      <div className="MarketContainers">
        <div className="MarketContainer">
          <div>{WBTC.name}</div>
          <div>{WBTC.ticker}</div>
          <img src={WBTC.img} height={150} alt={WBTC.name}></img>
          <div>{wbtcPrice}</div>
          <button className="btn btn-primary btn-lg btn-block" onClick={() => addToCart(WBTC)}>Add to cart</button>
        </div>
        <div className="MarketContainer">
          <div>{MATIC.name}</div>
          <div>{MATIC.ticker}</div>
          <img src={MATIC.img} height={150} alt={MATIC.name}></img>
          <div>{maticPrice}</div>
          <button className="btn btn-primary btn-lg btn-block" onClick={() => addToCart(MATIC)}>Add to cart</button>
        </div>
        <div className="MarketContainer">
          <div>{UNI.name}</div>
          <div>{UNI.ticker}</div>
          <img src={UNI.img} height={150} alt={UNI.name}></img>
          <div>{uniPrice}</div>
          <button className="btn btn-primary btn-lg btn-block" onClick={() => addToCart(UNI)}>Add to cart</button>
        </div>
        <div className="MarketContainer">
          <div>{SHIB.name}</div>
          <div>{SHIB.ticker}</div>
          <img src={SHIB.img} height={150} alt={SHIB.name}></img>
          <div>{shibPrice}</div>
          <button className="btn btn-primary btn-lg btn-block" onClick={() => addToCart(SHIB)}>Add to cart</button>
        </div>
        <div className="MarketContainer">
          <div>{AAVE.name}</div>
          <div>{AAVE.ticker}</div>
          <img src={AAVE.img} height={150} alt={AAVE.name}></img>
          <div>{aavePrice}</div>
          <button className="btn btn-primary btn-lg btn-block" onClick={() => addToCart(AAVE)}>Add to cart</button>
        </div>
        <div className="MarketContainer">
          <div>{MKR.name}</div>
          <div>{MKR.ticker}</div>
          <img src={MKR.img} height={150} alt={MKR.name}></img>
          <div>{mkrPrice}</div>
          <button className="btn btn-primary btn-lg btn-block" onClick={() => addToCart(MKR)}>Add to cart</button>
        </div>

      </div>
      <div className="MarketContainers">
        <div className="col-md-10"> {/* Increase the width of the column */}
          <div className="MarketContainer col-md-10">
            <ul className="list-group">
              {cartItems.map((item, index) => (
                <li key={index} className="list-group-item">
                  {item.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-2"> {/* Adjust the width of the buttons container */}
          <div className="d-grid gap-2">
            <button className="btn btn-danger" onClick={clearCart}>Clear Cart</button>
            <button className="btn btn-success" onClick={handlecheckout}>Check out</button>
          </div>
        </div>
      </div>



    </div>

  );
}

export default Tokens;
