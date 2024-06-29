import { RepositoryFactory } from "../../application/factory/repository.factory";
import { TransactionRepository } from "../../application/repositoy/transaction.repository";
import { DatabaseConnection } from "../database/database-connection";
import { TransactionDatabaseRepository } from "../repository/transaction-database.repository";

export class RepositoryDatabaseFactory implements RepositoryFactory {
  constructor(private readonly connection: DatabaseConnection) {}

  createTransactionRepository(): TransactionRepository {
    return new TransactionDatabaseRepository(this.connection);
  }
}
