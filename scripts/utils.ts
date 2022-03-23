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

export const getDeploymentArgus = (contractName: string): any[] => {
  const detailJSON = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, './data/contractDetails.json'),
      'utf-8'
    )
  );
  return detailJSON[contractName].argus;
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

export const readAllDeployedContractDetails = (): object[] => {
  const fileNames: string[] = fs.readdirSync(
    path.join(__dirname, './data/contractDetails'),
    'utf-8'
  );
  let details: object[];

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
