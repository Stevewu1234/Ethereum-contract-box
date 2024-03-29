import { BigNumber } from 'ethers';
import hre from 'hardhat';
import { Logic1, ProxyTest, ProxyTestAdmin } from '../typechain';

let proxy: ProxyTest;
let proxyAdmin: ProxyTestAdmin;
let logic1: Logic1;

const evnetTest = async () => {
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
  const logicInterface = new hre.ethers.utils.Interface(
    hre.artifacts.readArtifactSync('Logic1').abi
  );
  const data = logicInterface.encodeFunctionData('logicInit', [
    BigNumber.from(1),
  ]);
  const proxyFactory = await hre.ethers.getContractFactory('ProxyTest');
  proxy = await proxyFactory.deploy(logic1.address, proxyAdmin.address, data);
  await proxy.deployed();

  // check event
  const newNumber2 = BigNumber.from(2);
  const proxyWithLogic = logic1.attach(proxy.address);
  const updateTx = await proxyWithLogic.updateUint(newNumber2);

  const events = (await updateTx.wait()).events;
  console.log(events![0].args);
};

(async () => {
  await evnetTest();
})();
