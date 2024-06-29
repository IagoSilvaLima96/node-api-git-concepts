import { Transaction } from "../../domain/transaction";

export interface TransactionRepository {
  save(transaction: Transaction): Promise<void>;
  get(transactionId: string): Promise<Transaction>;
}
