# Swap-demo

## How to Get Started

- Clone the repository:
 ```
  git clone https://github.com/TakdanaiG/Swap-demo
  ```
  - npm install on ./dex and ./dexBack
  ```
    npm install
  ```
  - npm install web3 on dex
  ```
     npm install web3
  ```

## Before You Start

- Get API keys from this app:
- Moralis API: [Moralis Dashboard](https://admin.moralis.io/settings)
- 0x API: [0x Dashboard](https://dashboard.0x.org/apps)
  
- Fulfill the `.env` file with the Moralis API key and set `Swap.js` in `handleSwap` with the 0x API key.

## Starting the Application

- Open two terminals and run the frontend and backend in the **same time**:
- **Frontend:**
```
  cd ./dex
  npm start
```

- **Backend:**
```
  cd ./dexBack
  node index.js
```
