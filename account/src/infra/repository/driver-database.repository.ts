import { DriverRepository } from "../../application/repositoy/driver.repository";
import { Driver } from "../../domain/driver/driver";
import { DatabaseConnection } from "../database/database-connection";

export class DriverDatabaseRepository implements DriverRepository {
  constructor(private readonly connection: DatabaseConnection) {}

  async get(driverId: string): Promise<Driver> {
    const [driver] = await this.connection.query(
      "select * from driver where driver_id = $1",
      [driverId]
    );
    return new Driver(
      driver.driver_id,
      driver.name,
      driver.email,
      driver.document,
      driver.car_plate
    );
  }
  async create(data: Driver): Promise<void> {
    await this.connection.query(
      "insert into driver (driver_id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)",
      [
        data.driverId,
        data.name,
        data.email.value,
        data.document.value,
        data.carPlate.value,
      ]
    );
  }
}
