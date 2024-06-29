import { TransactionRepository } from "../repositoy/transaction.repository";

export interface RepositoryFactory {
  createTransactionRepository(): TransactionRepository;
}
