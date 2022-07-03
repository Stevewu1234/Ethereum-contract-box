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
  PermitWithValue: [
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
  const [signer1, signer2] = await ethers.getSigners();

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
  message.owner = signer2.address;

  const encoder = hre.ethers.utils._TypedDataEncoder;
  const Message = encoder.encode(domain, types, message);
  const messageHash = ethers.utils.keccak256(Message);

  const signature = await signer2._signTypedData(domain, types, message);

  await signMessageContract
    .connect(signer2)
    .permitWithHasedhMessage(messageHash, signature);

  console.log(await signMessageContract.Permit1RecordUser());

  console.log(`signer1: ${signer1.address}`);
  console.log(`signer2: ${signer2.address}`);
};

(async () => {
  await eip712Call();
})();
