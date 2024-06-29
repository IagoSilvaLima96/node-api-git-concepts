import { PGPromiseAdapter } from "./infra/database/pg-promise.adapter";
import { MainController } from "./infra/http/main.controller";
import { ExpressAdapter } from "./infra/http/express.adapter";
import { RepositoryDatabaseFactory } from "./infra/factory/repository-database.factory";
import { Registry } from "./infra/di/registry";
import { ProcessPayment } from "./application/usecase/process-payment";
import { PayPalPaymentGateway } from "./infra/gateway/paypal-payment.gateway";
import { GetTransaction } from "./application/usecase/get-transaction";

const connection = new PGPromiseAdapter();
const httpServer = new ExpressAdapter();
const repositoryFactory = new RepositoryDatabaseFactory(connection);
const transactionRepository = repositoryFactory.createTransactionRepository();
const paymentGateway = new PayPalPaymentGateway();
const registry = Registry.getInstance();
registry.provide(
  "processPayment",
  new ProcessPayment(paymentGateway, transactionRepository)
);
registry.provide("getTransaction", new GetTransaction(transactionRepository));
new MainController(httpServer);
httpServer.listen(4333, () => console.log("server running"));
