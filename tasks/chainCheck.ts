/* eslint-disable node/no-missing-import */
import { task } from 'hardhat/config';
import * as tools from '../scripts/utils';

task('chain-check', 'help check chain data')
  .addParam('contract', 'select contract to check')
  .setAction(async (args, hre) => {
    // data preparation
    const contractname = args.contract;
    const address = tools.readDeployedContractDetail(contractname).address;
    const abi = hre.artifacts.readArtifactSync(contractname).abi;
    const provider = hre.ethers.provider;
    const contract = new hre.ethers.Contract(address, abi, provider);

    // data reading
    const storageData = await hre.ethers.provider.getStorageAt(address, 2);
    const aValue = await contract.callStatic.a();

    console.log(aValue);
    console.log(storageData);
  });
