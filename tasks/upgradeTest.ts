import { BigNumber } from 'ethers';
import hre from 'hardhat';
import { Logic1, ProxyTest, ProxyTestAdmin } from '../typechain';

let proxy: ProxyTest;
let proxyAdmin: ProxyTestAdmin;
let logic1: Logic1;

before('deploy proxy contract', async () => {
  // deploy logic1
  const logic1Factory = await hre.ethers.getContractFactory('Logic1');
  logic1 = await logic1Factory.deploy();
  await logic1.deployed();

  // deploy logic2
  const proxyAdminFactory = await hre.ethers.getContractFactory(
    'ProxyTestAdmin'
  );
  proxyAdmin = await proxyAdminFactory.deploy();
  await proxyAdmin.deployed();

  // deploy proxy
  // get initial data
  const data = new hre.ethers.utils.Interface('Logic1').encodeFunctionData(
    'logicInit',
    [BigNumber.from(1)]
  );
  const proxyFactory = await hre.ethers.getContractFactory('ProxyTest');
  proxy = await proxyFactory.deploy(logic1.address, proxyAdmin.address, data);
  await proxy.deployed();
});

describe('test to acquire logic event log from proxy', async () => {});
