import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import hre from 'hardhat';
import { Logic1, Logic2, ProxyTest, ProxyTestAdmin } from '../typechain';

let signer: SignerWithAddress;
let admin: SignerWithAddress;
let proxyTestAdmin: ProxyTestAdmin;
let proxyTest: ProxyTest;
let logic1: Logic1;
let logic2: Logic2;

beforeEach(async () => {
  [signer, admin] = await hre.ethers.getSigners();

  const logic1Factory = await hre.ethers.getContractFactory('Logic1');
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

describe('upgrade to logic2 contract', () => {
  before('upgrade to logic2', async () => {
    const logic2Factory = await hre.ethers.getContractFactory('Logic2');
    logic2 = await logic2Factory.deploy();
    await logic2.deployed();

    // upgrade to logic2 contract
    await proxyTestAdmin.upgrade(proxyTest.address, logic2.address);
  });

  it('call and check logic2 new number', async () => {
    await logic2.updateNewNumber(BigNumber.from(2));
    expect(await logic2.number2()).to.equal(2);
  });
});
