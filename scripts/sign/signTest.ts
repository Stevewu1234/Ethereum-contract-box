/* eslint-disable node/no-missing-import */
import { BigNumber } from 'ethers';
import hre, { ethers } from 'hardhat';
// import * as eip712 from 'eip-712';
// import * as tools from '../utils';
// import web3 from 'web3';
// import * as sigUtil from 'eth-sig-util';
// import * as permit from 'eth-permit-ethers';
// import * as config from '../config';
// import { getABI, readDeployedContractDetails } from '../utils';
// import { signDaiPermit } from 'eth-permit-ethers';

let domain = {
  name: 'SignTestContract',
  version: '1',
  chainId: 0,
  verifyingContract: '',
};
const types = {
  PermitWithValue: [
    { name: 'owner', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'testString', type: 'string'},
    { name: 'deadline', type: 'uint256' },
    { name: 'nonce', type: 'uint256'}
  ],
};
let message = {
  owner: '',
  value: 0,
  testString: '',
  deadline: 0,
  nonce: 0
}; 

const typedataSign = async () => {
  /**
   * @dev generate signature
   */

  // basic info
  const [deployer, signer1, signer2] = await ethers.getSigners();

  const currentBlockNumber = await ethers.provider.getBlockNumber();
  const currentBlock = await ethers.provider.getBlock(currentBlockNumber);
  const deadline = currentBlock.timestamp + 3600;
  const blockChainId = hre.config.networks.hardhat.chainId;

  const signMessageFactory = await ethers.getContractFactory('SignTestContract');
  const signMessageContract = await signMessageFactory.deploy();
  await signMessageContract.deployed();

  domain.chainId = blockChainId;
  domain.verifyingContract = signMessageContract.address;
  message.deadline = deadline;
  message.owner = signer1.address;
  message.value = 1;
  message.testString = 'sign with PermitWithValue()';
  message.nonce = BigNumber.from(await signMessageContract.nonce(signer1.address)).toNumber();

  const encoder = hre.ethers.utils._TypedDataEncoder;
  const domainHash = encoder.hashDomain(domain);
  const structHash = encoder.hashStruct('PermitWithValue', types, message);
  const messageHash = encoder.hash(domain, types, message);
  const messageHashWithoutEtherjs = hre.ethers.utils.keccak256(Buffer.concat([
    Buffer.from('1901', 'hex'),
    Buffer.from(domainHash),
    Buffer.from(structHash)
  ]))

  console.log(Buffer.concat([
    Buffer.from('1901', 'hex'),
    Buffer.from(domainHash),
    Buffer.from(structHash)
  ]))


  const signature1 = await signer1._signTypedData(domain, types, message);

  console.log('local domain hash: ', domainHash)
  console.log('local struct hash: ', structHash);
  console.log('local message hash: ', messageHash);
  console.log('local message hash without etherjs generator: ', messageHashWithoutEtherjs);

  console.log('contract signature message: ', await signMessageContract.testSignatureMessage(      
    message.owner,
    message.value,
    message.testString,
    message.deadline
    ));


  // @dev the point of verifying the signature with value is if there is a string value,
  // need to deal with the value on contract with keccak256(bytes('yourstringValue'));
  await signMessageContract.connect(signer1).PermitWithValue(
    message.owner,
    message.value,
    message.testString,
    message.deadline,
    signature1
  );

  // call PermitWithHashedMessage()
  const signature2 = await signer2._signTypedData(domain, types, message);

  await signMessageContract.connect(signer2).permitWithHasedhMessage(
    messageHash,
    signature2
  );
};

(async () => {
  await typedataSign();
})();
