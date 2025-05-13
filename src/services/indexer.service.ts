import algosdk from "algosdk";
import dotenv from "dotenv";

dotenv.config();

export class IndexerService {
  indexerClient: algosdk.Indexer;

  constructor() {
    this.indexerClient = new algosdk.Indexer(
      process.env.INDEXER_TOKEN || "",
      process.env.INDEXER_SERVER || "",
      process.env.INDEXER_PORT || ""
    );
  }

  async getLastIndexedRound(): Promise<bigint> {
    try {
      const response = await this.indexerClient.makeHealthCheck().do();

      return response.round;
    } catch (error) {
      throw new Error("Could not get the last indexed round." + error);
    }
  }

  async getBlockInfo(round: bigint): Promise<algosdk.indexerModels.Block> {
    try {
      const response = await this.indexerClient.lookupBlock(round).do();

      return response;
    } catch (error) {
      throw new Error("Could not get the block info." + error);
    }
  }

  async getBlockTransactions(
    round: bigint
  ): Promise<algosdk.indexerModels.Transaction[]> {
    try {
      const response = await this.indexerClient
        .searchForTransactions()
        .round(round)
        .do();

      return response.transactions;
    } catch (error) {
      throw new Error("Could not get the block transactions." + error);
    }
  }

  async getAccountInfo(
    address: string
  ): Promise<algosdk.indexerModels.Account> {
    try {
      const response = await this.indexerClient.lookupAccountByID(address).do();

      return response.account;
    } catch (error) {
      throw new Error("Could not get the account info." + error);
    }
  }

  async getAccountTransactions(
    address: string
  ): Promise<algosdk.indexerModels.Transaction[]> {
    try {
      const response = await this.indexerClient
        .lookupAccountTransactions(address)
        .do();

      return response.transactions;
    } catch (error) {
      throw new Error("Could not get the account transactions." + error);
    }
  }

  async getTransaction(txId: string): Promise<algosdk.indexerModels.Transaction> {
    try {
      const response = await this.indexerClient
        .lookupTransactionByID(txId)
        .do();

      return response.transaction;
    } catch (error) {
      throw new Error("Could not get the transaction." + error);
    }
  }
}
