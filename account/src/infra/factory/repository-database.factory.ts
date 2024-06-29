import { RepositoryFactory } from "../../application/factory/repository.factory";
import { DriverRepository } from "../../application/repositoy/driver.repository";
import { PassengerRepository } from "../../application/repositoy/passenger.repository";
import { UserRepository } from "../../application/repositoy/user.repository";
import { DatabaseConnection } from "../database/database-connection";
import { DriverDatabaseRepository } from "../repository/driver-database.repository";
import { PassengerDatabaseRepository } from "../repository/passenger-database.repository";
import { UserDatabaseRepository } from "../repository/user-database.repository";

export class RepositoryDatabaseFactory implements RepositoryFactory {
  constructor(private readonly connection: DatabaseConnection) {}
  createUserRepository(): UserRepository {
    return new UserDatabaseRepository(this.connection);
  }

  createDriverRepository(): DriverRepository {
    return new DriverDatabaseRepository(this.connection);
  }
  createPassengerRepository(): PassengerRepository {
    return new PassengerDatabaseRepository(this.connection);
  }
}
