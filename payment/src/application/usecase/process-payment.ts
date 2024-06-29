import { Transaction } from "../../domain/transaction";
import { PaymentGateway } from "../gateway/payment.gateway";
import { TransactionRepository } from "../repositoy/transaction.repository";

export class ProcessPayment {
  constructor(
    private readonly paymentGateway: PaymentGateway,
    private readonly transactionRepository: TransactionRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    console.log(input);
    const { transactionId } = await this.paymentGateway.process(input);
    const transaction = new Transaction(
      transactionId,
      input.name,
      input.email,
      input.amount
    );
    await this.transactionRepository.save(transaction);
    return {
      transactionId,
    };
  }
}

type Input = {
  name: string;
  email: string;
  amount: number;
};

type Output = {
  transactionId: string;
};
