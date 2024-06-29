import { TransactionRepository } from "../../application/repositoy/transaction.repository";
import { Transaction } from "../../domain/transaction";
import { DatabaseConnection } from "../database/database-connection";

export class TransactionDatabaseRepository implements TransactionRepository {
  constructor(private readonly connection: DatabaseConnection) {}
  async get(transactionId: string): Promise<Transaction> {
    const [transactionData] = await this.connection.query(
      "select * from transaction where transaction_id = $1",
      [transactionId]
    );
    return new Transaction(
      transactionData.transaction_id,
      transactionData.name,
      transactionData.email,
      parseFloat(transactionData.amount)
    );
  }

  async save(transaction: Transaction): Promise<void> {
    await this.connection.query(
      "insert into transaction (transaction_id, name, email, amount) values ($1, $2 , $3, $4)",
      [
        transaction.transactionId,
        transaction.name,
        transaction.email,
        transaction.amount,
      ]
    );
  }
}
