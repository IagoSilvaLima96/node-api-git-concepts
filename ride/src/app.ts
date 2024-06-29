import { PGPromiseAdapter } from "./infra/database/pg-promise.adapter";
import { MainController } from "./infra/http/main.controller";
import { ExpressAdapter } from "./infra/http/express.adapter";
import { UsecaseFactory } from "./application/factory/usecase.factory";
import { RepositoryDatabaseFactory } from "./infra/factory/repository-database.factory";
import { Registry } from "./infra/di/registry";
import CalculateRide from "./application/usecase/calculate-ride";

const connection = new PGPromiseAdapter();
const httpServer = new ExpressAdapter();
const repositoryFactory = new RepositoryDatabaseFactory(connection);
const usecaseFactory = new UsecaseFactory(repositoryFactory);
const registry = Registry.getInstance();
registry.provide("calculateRide", new CalculateRide());
new MainController(httpServer, usecaseFactory);
httpServer.listen(3333, () => console.log("server running"));
