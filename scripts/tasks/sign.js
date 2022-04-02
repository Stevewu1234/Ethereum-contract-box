const EthCrypto = require('eth-crypto');
require('dotenv').config();

const message = 'foobar';
const messageHash = EthCrypto.hash.keccak256(message);
const signature = EthCrypto.sign(
  'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', // privateKey
  messageHash // hash of message
);

const signer = EthCrypto.recover(
  signature,
  EthCrypto.hash.keccak256('foobar') // signed message hash
);

console.log(signer);
