/* eslint-disable node/no-missing-import */
import { task } from 'hardhat/config';
import * as eip712 from 'eip-712';
// import * as tools from '../utils';
// import web3 from 'web3';
// import * as sigUtil from 'eth-sig-util';
// import * as permit from 'eth-permit-ethers';
// import * as config from '../config';
// import { getABI, readDeployedContractDetails } from '../utils';
// import { signDaiPermit } from 'eth-permit-ethers';

const message = {
  types: {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ],
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
    verifyingContract: '0xf8e81D47203A594245E36C48e151709F0C19fBe8',
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
      const DOAMIN_TYPEHASH = Buffer.from(
        eip712.encodeData(message, 'EIP712Domain', message.domain)
      );
      console.log('DOAMIN_TYPEHASH', DOAMIN_TYPEHASH);

      const domainStruct = Buffer.from(
        eip712.getStructHash(message, 'EIP712Domain', message.domain)
      ).toString('hex');

      console.log('domainHash: ', domainStruct);

      const dataStruct = Buffer.from(
        eip712.getStructHash(message, 'changeUser1', message.message)
      ).toString('hex');

      console.log('dataHash: ', dataStruct);

      const messageHash = Buffer.from(eip712.getMessage(message)).toString(
        'hex'
      );

      console.log('messageHash: ', messageHash);
      const signer = await hre.ethers.getSigner(
        '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
      );

      const signature = await signer.signMessage(messageHash);
      console.log(signature);
    }
  });
