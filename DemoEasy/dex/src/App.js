import "./App.css";
import Header from "./components/Header";
import Swap from "./components/Swap";
import Tokens from "./components/Tokens";
import { Routes, Route } from "react-router-dom";
import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import Register from './components/LoginRegister/Register';
import Login from './components/LoginRegister/Login';
import Home from './components/LoginRegister/home';
import Admin from './components/LoginRegister/admin';
import AdminPage from "./components/LoginRegister/admin";
import Review from "./components/LoginRegister/review";
import Transaction from "./components/LoginRegister/trans";
import Review_table from "./components/LoginRegister/Review_table";
import User_Table from "./components/LoginRegister/user_table";

function App() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  return (

    <div className="App">
      <Header connect={connect} isConnected={isConnected} address={address} />
      <div className="mainWindow">
        <Routes>
          <Route path="/swap" element={<Swap isConnected={isConnected} address={address} />} />
          <Route path="/tokens" element={<Tokens />} />
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/review' element={<Review />} />
          <Route path='/transaction' element={<Transaction />} />
          <Route path='/review_table' element={<Review_table />} />
          <Route path='/user_table' element={<User_Table />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
