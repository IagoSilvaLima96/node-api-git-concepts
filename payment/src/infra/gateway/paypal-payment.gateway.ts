import { PaymentGateway } from "../../application/gateway/payment.gateway";
import crypto from "crypto";

export class PayPalPaymentGateway implements PaymentGateway {
  async process(input: {
    name: string;
    email: string;
    amount: number;
  }): Promise<{ transactionId: string }> {
    return {
      transactionId: crypto.randomUUID(),
    };
  }
}
