import { GetTransaction } from "../../application/usecase/get-transaction";
import { ProcessPayment } from "../../application/usecase/process-payment";
import { inject } from "../di/inject";
import { HttpServer } from "./http-server";

export class MainController {
  @inject("processPayment")
  private processPayment?: ProcessPayment;
  @inject("getTransaction")
  private getTransaction?: GetTransaction;

  constructor(private readonly server: HttpServer) {
    this.server.on("post", "/payment", async (params: any, body: any) => {
      return this.processPayment?.execute({
        name: body.name,
        email: body.email,
        amount: body.amount,
      });
    });

    this.server.on(
      "get",
      "/transactions/:id",
      async (params: any, body: any) => {
        return this.getTransaction?.execute({ transactionId: params.id });
      }
    );
  }
}
