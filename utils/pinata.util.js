require('dotenv').config()
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);


// todo: should use pinata.pinFileToIPFS(readableStream, options) function link to docs: https://docs.pinata.cloud/pinata-node-sdk#pinfiletoipfs

// Function that will be called on mint event
// This function should upload metadata and image
async function onMint(tokenId){

  const promises= [
    addMetadata(tokenId),
    addImage(tokenId)
  ]

  await Promise.all(promises);
}

// Upload or pin metadata
function addMetadata(tokenId){

}

// Upload or pin image
function addImage(tokenId){

}

module.exports = {
  onMint
}