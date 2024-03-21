import React, { useState, useEffect } from "react";
import tokenList from "../tokenList.json";
import axios from "axios";

function Body() {
  const ETH = tokenList[1];
  const [prices, setPrices] = useState(null);

  async function fetchPrices(one, two){

    const res = await axios.get(`http://localhost:3002/tokenPrice`, {
      params: {addressOne: one, addressTwo: two}
    })

    // console.log(c.data)
    setPrices(res.data.tokenOne) //  set ราคาไปที่ prices
}

    if (tokenList.length > 0) {
      fetchPrices(ETH.address, ETH.address);
    }
  // }, []); 

  console.log("prices : ",prices); 


    return (
      <div>
        <div className='Markets'>
          <h1>Markets</h1>
        </div>
        <div className="MarketContainers">
        {/* Additional MarketContainers */}
            <div className="MarketContainer">
              <div>{ETH.name}</div>
              <div>{ETH.ticker}</div>
              <img src = {ETH.img} height={200}></img>
              <div>{prices}</div>
            </div>
            <div className="MarketContainer">Market 2</div>
            <div className="MarketContainer">Market 3</div>
            <div className="MarketContainer">Market 4</div>
            <div className="MarketContainer">Market 5</div>
        </div>
        <div className='Contact'>
          <h1>Contact</h1>
          <div className = 'ContactContainer'></div>
        </div>
        <div className='About'>

        </div>
      </div>

      
      
      
    );
  }
  

export default Body