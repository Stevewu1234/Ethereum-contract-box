import { task } from 'hardhat/config';

task('checkTx', 'check user transactions').setAction(async (hre, agrus) => {
  const [signer] = await hre.ethers.getSigners();

  const block = await hre.ethers.provider.getBlock('latest');
  console.log(`current block: ${block}`);

  if (block !== undefined && block.transactions !== undefined) {
    for (const txHash of block.transactions) {
      const tx = await hre.ethers.provider.getTransaction(txHash);

      if (tx.to?.toLowerCase() === signer.address.toLocaleLowerCase()) {
        console.log(
          'transaction found on block: ',
          tx.blockNumber,
          'Transaction hash is ',
          tx.hash
        );
      }
    }
  }
});
