/* eslint-disable node/no-missing-import */
import { task } from 'hardhat/config';
import * as config from '../config';
import { saveDeployedContractDetails, getDeploymentArgus } from '../utils';

const argus = config.contractDetails.StorageTest.argus;

task('test-deploy', 'deploy test contract')
  .addParam('contract', 'select contract to deploy')
  .setAction(async (args, hre) => {
    console.log(args.model);
    const contractName = args.contractname;
    const deploymentArgus = getDeploymentArgus(contractName);
    console.log(deploymentArgus);
    const contractFactory = await hre.ethers.getContractFactory(contractName);
    const contract = await contractFactory.deploy(argus[0]);

    await contract.deployed();

    // save contract details
    const details: config.contractDeployment = {
      name: contractName,
      address: contract.address,
      args: argus as any[],
    };

    saveDeployedContractDetails(details);

    console.log('deployed:', contract.address);
  });
