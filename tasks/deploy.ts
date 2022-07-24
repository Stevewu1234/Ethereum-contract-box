/* eslint-disable node/no-missing-import */
import { task } from 'hardhat/config';
import * as config from '../scripts/config';
import * as tools from '../scripts/utils';

// const argus = config.contractDetails.StorageTest.argus;

task('test-deploy', 'deploy test contract')
  .addParam('contract', 'select contract to deploy')
  .setAction(async (args, hre) => {
    // get deployment data
    const contractName: string = args.contract;
    // const deploymentArgus: any[] = getDeploymentArgus(contractName);
    const contractFactory = await hre.ethers.getContractFactory(contractName);
    const contract = await contractFactory.deploy();

    await contract.deployed();

    // save contract details
    const details: config.CONTRACTDETAILS = {
      name: contractName,
      address: contract.address,
      args: [],
    };

    tools.saveDeployedContractDetails(details);

    console.log('deployed:', contract.address);
  });
