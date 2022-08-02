import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import hre from 'hardhat';

let signer: SignerWithAddress;
let admin: SignerWithAddress;

beforeEach(async () => {
  [signer, admin] = await hre.ethers.getSigners();
});
