import { PGPromiseAdapter } from "./infra/database/pg-promise.adapter";
import { MainController } from "./infra/http/main.controller";
import { ExpressAdapter } from "./infra/http/express.adapter";
import { UsecaseFactory } from "./application/factory/usecase.factory";
import { RepositoryDatabaseFactory } from "./infra/factory/repository-database.factory";
import { Registry } from "./infra/di/registry";

const connection = new PGPromiseAdapter();
const httpServer = new ExpressAdapter();
const repositoryFactory = new RepositoryDatabaseFactory(connection);
const usecaseFactory = new UsecaseFactory(repositoryFactory);
const registry = Registry.getInstance();
new MainController(httpServer, usecaseFactory);
httpServer.listen(5333, () => console.log("server running"));
