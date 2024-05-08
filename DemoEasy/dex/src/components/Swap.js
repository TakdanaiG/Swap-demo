import React, { useState, useEffect } from "react";
import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import tokenList from "../tokenList.json";
import { useSendTransaction, useWaitForTransaction } from "wagmi";
import axios from "axios";
const { Web3 } = require('web3');

function Swap(props) {
  const { address, isConnected } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const [prices, setPrices] = useState(null);
  const [txDetails, setTxDetails] = useState({
    to:null,
    data: null,
    value: null,
  }); 

  const {data, sendTransaction} = useSendTransaction({
    request: {
      from: address,
      to: String(txDetails.to),
      data: String(txDetails.data),
      value: String(txDetails.value),
    }
  })

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  
  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }

  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
    if(e.target.value && prices){
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2))
    }else{
      setTokenTwoAmount(null);
    }
  }

  function switchTokens() {
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    fetchPrices(two.address, one.address);
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  function modifyToken(i){ /*เปลี่ยน token ตอนกด list */
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    if (changeToken === 1) {
      setTokenOne(tokenList[i]);
      fetchPrices(tokenList[i].address, tokenTwo.address)
    } else {
      setTokenTwo(tokenList[i]);
      fetchPrices(tokenOne.address, tokenList[i].address)
    }
    setIsOpen(false);
  }
  
  async function fetchPrices(one, two){

      const res = await axios.get(`http://localhost:3002/tokenPrice`, {
        params: {addressOne: one, addressTwo: two}
      })

      // console.log(res.data)
      setPrices(res.data) //  res.data ราคา 2 เหรียญ + ratio
      console.log("prices: ", prices.tokenTwo)
  }


  async function handleSwap() {
    try {
      // Determine input parameters
      const buyToken = tokenTwo.address; 
      const sellToken = tokenOne.address; 
      const slippagePercentage = slippage * 0.01 ;
      const usernamelocal = localStorage.getItem('username');

      console.log("slippagePercentage: ", slippagePercentage);
      console.log('Buy Token:', buyToken);
      console.log('Sell Token:', sellToken);
      console.log('Sell Amount:', tokenOneAmount);
      console.log('Buy Amount:', tokenTwoAmount);
      console.log('Buy Amount:', usernamelocal);
      axios.post('http://localhost:3001/swap', { 
        buyToken,
        sellToken,
        tokenOneAmount,
        tokenTwoAmount,
        usernamelocal
    })
    .then(response => {
        console.log(response.data); // Log the response data
        alert('Swap Success')

    })
    .catch(error => {
        // Log the error for debugging purposes
        console.error('Error:', error);
        alert(':(')

        // Handle the error or display a message to the user
    });
    

      
      const web3 = new Web3(window.ethereum);
      // Convert tokenOneAmount to Wei
      const sellAmount = web3.utils.toWei(tokenOneAmount.toString(), 'ether');
  
      // Construct request to 0x API swap endpoint
      const apiUrl = 'https://api.0x.org/swap/v1/quote';
      const apiKey = '6308c10f-a9e0-444a-859d-9d2fdb48e513'; // Replace API key
      
      const url = `${apiUrl}?buyToken=${buyToken}&sellToken=${sellToken}&sellAmount=${sellAmount}&slippagePercentage=${slippagePercentage}`;
      const headers = {
        '0x-api-key': apiKey,
      };
  
      // Send request to 0x API
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      const data = await response.json();
  
      // Handle response
      if (response.ok) {
        // Check if response contains valid data
        if (data && data.price) {
          // Trade details
          console.log('Trade price:', data.price);
          console.log('Trade data:', data);
  
          // Perform swap execution (if needed)
          executeSwap(data.data);
        } else {
          console.error('Invalid response from 0x API:', data);
        }
      } else {
        // Handle API error
        console.error('Error response from 0x API:', data);
      }
    } catch (error) {
      // Handle any other errors
      console.error('Error occurred during swap:', error);
    }
  }
  
  async function executeSwap(data) {
    try {
        const ERC20_ABI = [{ "inputs": [ { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint256", "name": "max_supply", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" } ], "name": "decreaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" } ], "name": "increaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }]
        // Get the user's Ethereum address from MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const userAddress = accounts[0];

        const web3 = new Web3(window.ethereum);
        const DEX_CONTRACT_ADDRESS = "0xdef1c0ded9bec7f1a1670819833240f027b25eff"; // Dex
        const ERC20_CONTRACT_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"; // ERC20 token address
        const MAX_ALLOWANCE = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; // Maximum uint256 value for allowance

        // Check current allowance
        const tokenContract = new web3.eth.Contract(ERC20_ABI, ERC20_CONTRACT_ADDRESS);
        const allowance = await tokenContract.methods.allowance(userAddress, DEX_CONTRACT_ADDRESS).call();

        // If allowance is insufficient, set a higher allowance
        if (parseInt(allowance) < parseInt(MAX_ALLOWANCE)) {
            await tokenContract.methods.approve(DEX_CONTRACT_ADDRESS, MAX_ALLOWANCE).send({ from: userAddress });
            console.log('Allowance updated');
        }

        // Estimate gas for the transaction
        const gas = await web3.eth.estimateGas({
            to: DEX_CONTRACT_ADDRESS,
            data: data,
        });

        // Send the transaction to execute the swap
        const tx = await web3.eth.sendTransaction({
            from: userAddress,
            to: DEX_CONTRACT_ADDRESS,
            data: data,
            gas: gas,
        });

        console.log('Transaction hash:', tx.transactionHash);
    } catch (error) {
        console.error('Error executing swap:', error);
    }
}

  useEffect(()=>{

    fetchPrices(tokenList[0].address, tokenList[1].address)

  }, [])

  useEffect(()=>{

      if(txDetails.to && isConnected){
        sendTransaction();
      }
  }, [txDetails])

  useEffect(()=>{

    messageApi.destroy();

    if(isLoading){
      messageApi.open({
        type: 'loading',
        content: 'Transaction is Pending...',
        duration: 0,
      })
    }    

  },[isLoading])

  useEffect(()=>{
    messageApi.destroy();
    if(isSuccess){
      messageApi.open({
        type: 'success',
        content: 'Transaction Successful',
        duration: 1.5,
      })
    }else if(txDetails.to){
      messageApi.open({
        type: 'error',
        content: 'Transaction Failed',
        duration: 1.50,
      })
    }


  },[isSuccess])


  const settings = (
    <>
      <div>Slippage Tolerance</div>
      <div>
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );

  return (
    
    <>
      {contextHolder}
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title="Select a token"
      >
        <div className="modalContent">
          {tokenList?.map((e, i) => {
            return (
              <div
                className="tokenChoice"
                key={i}
                onClick={() => modifyToken(i)}
              >
                <img src={e.img} alt={e.ticker} className="tokenLogo" />
                <div className="tokenChoiceNames">
                  <div className="tokenName">{e.name}</div>
                  <div className="tokenTicker">{e.ticker}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>

      <div className="tradeBox">
        
        <div className="tradeBoxHeader">
        <h2 style={{ color: 'white' }}>Swap </h2>
          <Popover
            content={settings}
            title="Settings"
            trigger="click"
            placement="bottomRight"
          >
            <SettingOutlined className="cog" />
          </Popover>
        </div>
        <div className="inputs">
          <Input
            placeholder="0"
            value={tokenOneAmount}
            onChange={changeAmount}
            disabled={!prices}
          />
          <Input placeholder="0" value={tokenTwoAmount} disabled={true} />
          <div className="switchButton" onClick={switchTokens}>
            <ArrowDownOutlined className="switchArrow" />
          </div>
          <div className="assetOne" onClick={() => openModal(1)}>
            <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo" />
            {tokenOne.ticker}
            <DownOutlined />
          </div>
          <div className="assetTwo" onClick={() => openModal(2)}>
            <img src={tokenTwo.img} alt="assetOneLogo" className="assetLogo" />
            {tokenTwo.ticker}
            <DownOutlined />
          </div>
        </div>

        <div className="swapButton" disabled={!tokenOneAmount} onClick={handleSwap}>Swap</div>
      </div>
      
    </>
  );
}
export default Swap;