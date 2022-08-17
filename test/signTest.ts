/* eslint-disable node/no-missing-import */
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import hre from 'hardhat';
import { BigNumber } from 'ethers';
import { expect } from 'chai';
import { SignTestContract } from '../typechain';

let deployer: SignerWithAddress;
let signer1: SignerWithAddress;
let signer2: SignerWithAddress;
let signContract: SignTestContract;

// typed data
let domain = {
  name: 'SignTestContract',
  version: '1',
  chainId: 0,
  verifyingContract: '',
};
const types = {
  permitWithValue: [
    { name: 'owner', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'testString', type: 'string' },
    { name: 'deadline', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
  ],
};
let message = {
  owner: '',
  value: 0,
  testString: '',
  deadline: 0,
  nonce: 0,
};

beforeEach(async () => {
  //
  [deployer, signer1, signer2] = await hre.ethers.getSigners();
  const blockChainId = hre.config.networks.hardhat.chainId;
  const currentBlockNumber = hre.ethers.provider.getBlockNumber();
  const currentBlock = await hre.ethers.provider.getBlock(currentBlockNumber);
  const deadline = currentBlock.timestamp + 3600; // duration is 1 hour

  // deploy signMessage contract
  const signMessageFactory = await hre.ethers.getContractFactory(
    'SignTestContract'
  );
  signContract = await signMessageFactory.deploy();
  await signContract.deployed();

  // fill out basic info
  domain.chainId = blockChainId;
  domain.verifyingContract = signContract.address;
  message.deadline = deadline;
});

describe('sign contract verify off-chain signature', () => {
  it('call PermitWithValue()', async () => {
    message.owner = signer1.address;
    message.value = 1;
    message.testString = 'sign with PermitWithValue()';
    message.nonce = BigNumber.from(
      await signContract.nonce(signer1.address)
    ).toNumber();

    const signature = await signer1._signTypedData(domain, types, message);

    await signContract
      .connect(signer1)
      .PermitWithValue(
        message.owner,
        message.value,
        message.testString,
        message.deadline,
        signature
      );

    // check sign success or not
    expect(await signContract.Permit1RecordUser()).to.equal(signer1.address);
    expect(await signContract.testString()).to.equal(message.testString);
  });
  it('call PermitWithHashedMessage()', async () => {
    const encoder = hre.ethers.utils._TypedDataEncoder;
    const messageHash = encoder.hash(domain, types, message);
    const signature = await signer2._signTypedData(domain, types, message);

    await signContract
      .connect(signer2)
      .permitWithHasedhMessage(messageHash, signature);

    // check sign success or not
    expect(await signContract.Permit2RecordUser()).to.equal(signer2.address);
  });
});
