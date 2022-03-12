/* eslint-disable node/no-missing-import */
import { task } from 'hardhat/config';
import * as config from '../config';
import { getABI } from '../utils';

task('test-Storage', 'just to find contract storage data').setAction(
  async (args, hre) => {
    const contractname = config.contractDetails.StorageTest.name;
    const abi = getABI(contractname);
    
    const 
  }
);
