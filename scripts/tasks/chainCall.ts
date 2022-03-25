/* eslint-disable node/no-missing-import */
import { task } from 'hardhat/config';
import {} from 'eip-712';
import { readAllDeployedContractDetails } from '../utils';

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
    test: [
      { name: 'owner', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  },
  primaryType: 'test',
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
  },
  message: {
    owner: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    value: 1,
    deadline: Date.UTC(2023, 12),
  },
};

task('chain-call', 'help excute function call')
  .addParam('action', 'select testing function')
  .setAction(async (args, hre) => {
    if (args.action === 'signmessage') {
      //   const messageHash = Buffer.from(getMessage(message)).toString('hex');
      const signer = await hre.ethers.getSigner(
        '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
      );
      console.log(signer.address);
      const signature = await signer._signTypedData(
        message.domain,
        message.types,
        message.message
      );
      console.log(signature);
      const targetContract = readAllDeployedContractDetails()[0];
      console.log(targetContract);
    }
  });
