import { IndexerService } from "./services/indexer.service";

async function test() {
  const indexerService = new IndexerService();
  const lastIndexedRound = await indexerService.getLastIndexedRound();
  console.log("lastIndexedRound", lastIndexedRound);

  const blockInfo = await indexerService.getBlockInfo(lastIndexedRound);
  console.log("blockInfo", blockInfo);

  const blockTransactions = await indexerService.getBlockTransactions(
    blockInfo.round
  );
  console.log("blockTransactions", blockTransactions);

  const sampleAccountAddress =
    "";

  const accountTransactions = await indexerService.getAccountTransactions(
    sampleAccountAddress
  );
  console.log("accountTransactions", accountTransactions);

  const accountInfo = await indexerService.getAccountInfo(
    sampleAccountAddress
  );
  console.log("accountInfo", accountInfo);

  const transaction = await indexerService.getTransaction(
    accountTransactions[0].id!
  );
  console.log("transaction", transaction);
}

test();
