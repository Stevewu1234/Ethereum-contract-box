/* eslint-disable node/no-missing-import */
import { task } from 'hardhat/config';
import * as eip712 from 'eip-712';
import * as tools from '../utils';

// import * as config from '../config';
// import { getABI, readDeployedContractDetails } from '../utils';

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
    verifyingContract: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
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
      const messageHash = Buffer.from(eip712.getMessage(message)).toString(
        'hex'
      );
      const structedHash = Buffer.from(
        eip712.getStructHash(message, 'EIP712Domain', message.domain)
      ).toString('hex');
      const signer = await hre.ethers.getSigner(
        '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
      );
      console.log(structedHash);

      // const signature = await signer._signTypedData(
      //   message.domain,
      //   message.types,
      //   message.message
      // );

      const signature = await signer.signMessage(messageHash);

      // read contract
      const targetContract =
        tools.readDeployedContractDetail('signMessage').address;
      const abi = hre.artifacts.readArtifactSync('signMessage').abi;
      const SignMessage = new hre.ethers.Contract(targetContract, abi);

      // console.log(signature);
      // console.log(message.message.deadline);
      // call contract
      await SignMessage.connect(signer).changeUser1(
        message.message.owner,
        message.message.value,
        message.message.deadline,
        signature
      );

      // check call result
      const user1 = await SignMessage.connect(
        hre.ethers.provider
      ).callStatic.user1();
      console.log(user1);

      const storedValue = await SignMessage.callStatic.storedValue();
      console.log(storedValue);
    }
  });
