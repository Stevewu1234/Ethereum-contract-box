/* eslint-disable node/no-missing-import */
import fs, { existsSync } from 'fs';
import path from 'path';
import * as config from './config';

// before deployment
export const getDeploymentArgus = (contractName: string): any[] => {
  const detailJSON = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, './data/deploymentArgus.json'),
      'utf-8'
    )
  );

  detailJSON.forEach((contract: config.ARGUS) => {
    if (contract.contractName === contractName) {
      return contract.argus;
    }
  });

  return [];
};

export const saveDeployedContractDetails = (detail: config.CONTRACTDETAILS) => {
  fs.writeFileSync(
    path.join(__dirname, `./data/deployedContract/${detail.name}.json`),
    JSON.stringify(detail)
  );
};

/**
 *
 * @dev after deployment, get deployed contract details on one func
 */
export const readDeployedContractDetail = (
  contractName?: string | undefined
): config.CONTRACTDETAILS => {
  // read single contract

  contractName !== undefined &&
    existsSync(
      path.join(__dirname, `./data/deployedContract/${contractName}.json`)
    );

  return JSON.parse(
    fs.readFileSync(
      path.join(__dirname, `./data/deployedContract/${contractName}.json`),
      'utf8'
    )
  );
};
