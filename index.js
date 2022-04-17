const express = require('express')
const ethers = require('ethers')

const NFT_CONTRACT = '0x33becfc69ded1e3aa1ff0d805f38017b84d58eac'

let currentSupply = 0;

const webSocket = new ethers.providers.WebSocketProvider(
  'wss://speedy-nodes-nyc.moralis.io/8b6b7b98fecf639d09092d6d/polygon/mumbai/ws',
  80001
)


const eventFilter = {
  address: NFT_CONTRACT,
  topics: [
    // Minting emits a Transfer event from the 0x0 address
    ethers.utils.id("Transfer(address,address,uint256)"),
    ethers.utils.hexZeroPad("0x0", 32),
  ]
}

webSocket.on(eventFilter, (event) => {

  console.log('event:', event)
    let [name, from, to, tokenIdHex] = event.topics;
    // All data returned is in hexidecimal, so we need to convert it
    let tokenId = ethers.BigNumber.from(tokenIdHex).toNumber();
    if (tokenId > currentSupply) {
      currentSupply = tokenId;
      console.log("increased current supply to ", currentSupply);
    }
  }
);

const app = express()
const port = 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})