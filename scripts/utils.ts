/* eslint-disable node/no-missing-import */
import fs from 'fs';
import path from 'path';
import { CONTRACTDETAILS } from './config';

// before deployment
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

export const getDeploymentArgus = (contractName: string): string[] => {
  const detailJSON = JSON.parse(
    fs.readFileSync(path.join(__dirname, './data/contractArgus.json'), 'utf-8')
  );

  detailJSON.forEach((name: string) => {
    if (name === contractName) {
      return detailJSON[name];
    }
  });
};

export const saveDeployedContractDetails = (detail: CONTRACTDETAILS) => {
  fs.writeFileSync(
    path.join(__dirname, `./data/contractDetails/${detail.name}.json`),
    JSON.stringify(detail)
  );
};

export const readDeployedContractDetails = (
  contractName: string
): CONTRACTDETAILS => {
  return JSON.parse(
    fs.readFileSync(
      path.join(__dirname, `./data/contractDetails/${contractName}.json`),
      'utf8'
    )
  );
};
export const readAllDeployedContractDetails = (): CONTRACTDETAILS[] => {
  const details: CONTRACTDETAILS[] = [];

  const fileNames: string[] = fs.readdirSync(
    path.join(__dirname, './data/contractDetails'),
    'utf-8'
  );

  fileNames.forEach((name) => {
    const fileJSON = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, `./data/deployedContract/${name}.json`),
        'utf-8'
      )
    );

    details.push(fileJSON);
  });

  return details;
};
