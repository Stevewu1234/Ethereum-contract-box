import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import hre from 'hardhat';
import {
  Logic1,
  Logic1Upgradeable,
  ProxyTest,
  ProxyTestAdmin,
} from '../typechain';

let signer: SignerWithAddress;
let admin: SignerWithAddress;
let proxyTestAdmin: ProxyTestAdmin;
let proxyTest: ProxyTest;
let logic1: Logic1Upgradeable;

beforeEach(async () => {
  [signer, admin] = await hre.ethers.getSigners();

  const logic1Factory = await hre.ethers.getContractFactory(
    'Logic1Upgradeable'
  );
  logic1 = await logic1Factory.deploy();
  await logic1.deployed();

  const proxyTestAdminFactory = await hre.ethers.getContractFactory(
    'ProxyTestAdmin'
  );
  proxyTestAdmin = await proxyTestAdminFactory.deploy();
  await proxyTestAdmin.deployed();

  const proxyTestFactory = await hre.ethers.getContractFactory('ProxyTest');
  proxyTest = await proxyTestFactory.deploy(
    logic1.address,
    proxyTestAdmin.address,
    logic1.interface.encodeFunctionData('logicInit')
  );

  await proxyTest._deployed();
});

describe('initial setting check', () => {
  it('upgradeable contract deploymentg checking', async () => {
    expect(await proxyTestAdmin.getProxyAdmin(proxyTest.address)).to.equal(
      proxyTestAdmin.address
    );
    expect(
      await proxyTestAdmin.getProxyImplementation(proxyTest.address)
    ).to.equal(logic1.address);
  });
});
