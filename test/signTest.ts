/* eslint-disable node/no-missing-import */
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { SignMessage } from '../typechain';
import { expect } from 'chai';

let signer1: SignerWithAddress;
// let signer2: SignerWithAddress;
let signMessageContract: SignMessage;
let signature: string;

// typed data
const domain = {
  name: 'SignMessage',
  version: '1',
  chainId: 0,
  verifyingContract: '',
};
const types = {
  Permit: [
    { name: 'owner', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
  ],
};
const message = {
  owner: '',
  value: 1,
  deadline: 0,
};

beforeEach(async () => {
  // basic info
  [signer1] = await ethers.getSigners();
  const blockChainId = ethers.provider.network.chainId;
  const currentBlockNumber = ethers.provider.getBlockNumber();
  const currentBlock = await ethers.provider.getBlock(currentBlockNumber);
  const deadline = currentBlock.timestamp + 3600; // duration is 1 hour

  // deploy signMessage contract
  const signMessageFactory = await ethers.getContractFactory('SignMessage');
  signMessageContract = await signMessageFactory.deploy(blockChainId);
  await signMessageContract.deployed();

  domain.chainId = blockChainId;
  domain.verifyingContract = signMessageContract.address;
  message.owner = signer1.address;
  message.deadline = deadline;

  // const encoder = ethers.utils._TypedDataEncoder;
  // const Message = encoder.encode(domain, type, value);
  // const messageHash = ethers.utils.keccak256(Message);

  signature = await signer1._signTypedData(domain, types, message);
});

describe('test sign contract', () => {
  it('check deployed contract domain chainId', async () => {
    expect(await signMessageContract.connect(signer1).chainId()).to.equal(
      domain.chainId
    );
  });
  it('check signature verification', async () => {
    await signMessageContract.permitWithValue(
      message.owner,
      message.value,
      message.deadline,
      signature
    );
  });
});
