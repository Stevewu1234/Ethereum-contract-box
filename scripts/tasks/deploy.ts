/* eslint-disable node/no-missing-import */
import { task } from 'hardhat/config';
import * as config from '../config';
import { saveDeployedContractDetails } from '../utils';

const contractName = config.contractDetails.StorageTest.name;
const argus = config.contractDetails.StorageTest.argus;

task('deploy-test', 'deploy test contract').setAction(async (args, hre) => {
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
