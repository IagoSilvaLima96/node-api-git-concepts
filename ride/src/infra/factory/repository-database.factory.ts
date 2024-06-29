import { RepositoryFactory } from "../../application/factory/repository.factory";
import { RideRepository } from "../../application/repositoy/ride.repository";
import { DatabaseConnection } from "../database/database-connection";
import { RideDatabaseRepository } from "../repository/ride-database.repository";

export class RepositoryDatabaseFactory implements RepositoryFactory {
  constructor(private readonly connection: DatabaseConnection) {}

  createRideRepository(): RideRepository {
    return new RideDatabaseRepository(this.connection);
  }
}
