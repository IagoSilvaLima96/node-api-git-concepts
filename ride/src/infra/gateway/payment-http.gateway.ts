import {
  Input,
  PaymentGateway,
} from "../../application/gateway/payment.gateway";
import { HttpClient } from "../http/http-client";

export class PaymentHttpGateway implements PaymentGateway {
  constructor(private readonly httpClient: HttpClient) {}

  async process(input: Input): Promise<void> {
    await this.httpClient.post("http://localhost:4333/payment", input);
  }
}
