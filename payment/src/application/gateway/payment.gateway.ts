export interface PaymentGateway {
  process(input: Input): Promise<Output>;
}

type Input = {
  name: string;
  email: string;
  amount: number;
};

type Output = {
  transactionId: string;
};
