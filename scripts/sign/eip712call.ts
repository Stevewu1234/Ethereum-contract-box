/* eslint-disable node/no-missing-import */
import hre, { ethers } from 'hardhat';
// import * as eip712 from 'eip-712';
// import * as tools from '../utils';
// import web3 from 'web3';
// import * as sigUtil from 'eth-sig-util';
// import * as permit from 'eth-permit-ethers';
// import * as config from '../config';
// import { getABI, readDeployedContractDetails } from '../utils';
// import { signDaiPermit } from 'eth-permit-ethers';

const types = {
  Permit: [
    { name: 'owner', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
  ],
};
const domain = {
  name: 'SignMessage',
  version: '1',
  chainId: 0,
  verifyingContract: '0xf8e81D47203A594245E36C48e151709F0C19fBe8',
};
const message = {
  owner: '',
  value: 1,
  deadline: 0,
};

const eip712Call = async () => {
  /**
   * @dev generate signature
   */

  // basic info
  const [signer1] = await ethers.getSigners();

  const currentBlockNumber = await ethers.provider.getBlockNumber();
  const currentBlock = await ethers.provider.getBlock(currentBlockNumber);
  const currentTime = currentBlock.timestamp + 3600;
  const chainId = ethers.provider.network.chainId;

  const signMessageFactory = await ethers.getContractFactory('SignMessage');
  const signMessageContract = await signMessageFactory.deploy(chainId);
  await signMessageContract.deployed();

  domain.verifyingContract = signMessageContract.address;
  domain.chainId = chainId;
  message.deadline = currentTime;
  message.owner = signer1.address;

  const encoder = hre.ethers.utils._TypedDataEncoder;
  const Message = encoder.encode(domain, types, message);
  const messageHash = ethers.utils.keccak256(Message);

  // const funcResult = await signMessageContract.Permit(
  //   signer1.address,
  //   message.value,
  //   message.deadline
  // );

  console.log('local message:', Message);
  console.log('local typedDataHash: ', messageHash);

  // console.log('contract message: ', funcResult[3]);
  // console.log('messageHash: ', funcResult[2]);
};

(async () => {
  await eip712Call();
})();
