/* eslint-disable node/no-missing-import */
import { task } from 'hardhat/config';

// import * as config from '../config';
// import { getABI, readDeployedContractDetails } from '../utils';

task('chain-call', 'help excute function call')
  .addParam('action', 'select testing function')
  .setAction(async (args, hre) => {
    if (args === 'signmessage') {
    }
  });
