/* eslint-disable node/no-missing-import */
import fs from 'fs';
import path from 'path';
import { contractDeployment } from './config';

export const getABI = (contractName: string): any[] => {
  const abiPath = JSON.parse(
    fs.readFileSync(
      path.join(
        __dirname,
        `../artifacts/contracts/${contractName}.sol/${contractName}.json`
      ),
      'utf8'
    )
  );

  return abiPath.abi;
};

export const saveDeployedContractDetails = (detail: contractDeployment) => {
  fs.writeFileSync(
    path.join(__dirname, `./data/contractDetails/${detail.name}.json`),
    JSON.stringify(detail)
  );
};

export const readDeployedContractDetails = (
  contractName: string
): contractDeployment => {
  return JSON.parse(
    fs.readFileSync(
      path.join(__dirname, `./data/contractDetails/${contractName}.json`),
      'utf8'
    )
  );
};
