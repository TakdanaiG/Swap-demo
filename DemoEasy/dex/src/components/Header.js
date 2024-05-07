import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Eth from '../eth.svg';
import Elgato from '../elgato.jpg';

function Header(props) {
  const { address, isConnected, connect } = props;

  const[name, setShowName] = useState('')
  const username = localStorage.getItem('username');
  
  return (
    <header>
      <div className="leftH">
        <img src={Elgato} alt="logo" className="logo" />
        <Link to="/" className="link">
          <div className="headerItem">Swap</div>
        </Link>
        <Link to="/tokens" className="link">
          <div className="headerItem">Tokens</div>
        </Link>
        <Link to="/review" className="link">
          <div className="headerItem">Review</div>
        </Link>
      </div>
      <h1 className="Easyswap">Easy Swap !</h1>
      <div className="rightH">
        <div className="headerItem">
          <div>Welcome {username}</div>
        </div>
        <Link to="/" className="link">
          <div className="headerItem">Login</div>
        </Link>
        <Link to="/register" className="link">
          <div className="headerItem">Register</div>
        </Link>
      </div>
    </header>
  );
}

export default Header;