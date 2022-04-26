const ethers = require('ethers')

const BAZ_ADDRESS = '0x8aA3482320E1947f4b11265A04C2A00d2772313c'
const WEBSOCKET_URL = 'wss://speedy-nodes-nyc.moralis.io/8b6b7b98fecf639d09092d6d/eth/mainnet/ws'

let currentSupply = 0;

console.log('setup websocket for listening for baz events')

const webSocket = new ethers.providers.WebSocketProvider(WEBSOCKET_URL, 1)

const eventFilter = {
  address: BAZ_ADDRESS,
  topics: [
    // Minting emits a Transfer event from the 0x0 address
    ethers.utils.id("Transfer(address,address,uint256)"),
    ethers.utils.hexZeroPad("0x0", 32),
  ]
}

webSocket.on(eventFilter, (event) => {
    let [,,,tokenIdHex] = event.topics;
    // All data returned is in hexidecimal, so we need to convert it
    let tokenId = ethers.BigNumber.from(tokenIdHex).toNumber();
    console.log(`token #${tokenId} was just minted`)
    if (tokenId > currentSupply) {
      currentSupply = tokenId;
      console.log("increased current supply to ", currentSupply);
    }
    checkWithinRange(tokenId)
  }
);

function checkWithinRange(tokenId){
  const difference = 1888-tokenId
  if(difference<=3){
    console.log('time to mint')
  }
  else{
    console.log(`${difference} mints before 1888`)
  }
}