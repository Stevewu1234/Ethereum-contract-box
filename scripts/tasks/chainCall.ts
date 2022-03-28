/* eslint-disable node/no-missing-import */
import { task } from 'hardhat/config';
import * as eip712 from 'eip-712';
import * as tools from '../utils';
// import web3 from 'web3';
// import * as sigUtil from 'eth-sig-util';

// import * as permit from 'eth-permit-ethers';

// import * as config from '../config';
// import { getABI, readDeployedContractDetails } from '../utils';

const message = {
  types: {
    // EIP712Domain: [
    //   { name: 'name', type: 'string' },
    //   { name: 'version', type: 'string' },
    //   { name: 'chainId', type: 'uint256' },
    //   { name: 'verifyingContract', type: 'address' },
    // ],
    changeUser1: [
      { name: 'owner', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  },
  primaryType: 'changeUser1',
  domain: {
    name: 'signMessage',
    version: '1',
    chainId: 31337,
    verifyingContract: '0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f',
  },
  message: {
    owner: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    value: 1,
    deadline: 1704067200000,
  },
};

task('chain-call', 'help excute function call')
  .addParam('action', 'select testing function')
  .setAction(async (args, hre) => {
    if (args.action === 'signmessage') {
      /**
       * @dev generate signature
       */
      // const messageHash = Buffer.from(eip712.getMessage(message)).toString(
      //   'hex'
      // );

      const signer = await hre.ethers.getSigner(
        '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
      );
    }
  });
