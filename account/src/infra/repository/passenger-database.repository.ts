import { PassengerRepository } from "../../application/repositoy/passenger.repository";
import { Passenger } from "../../domain/passenger/passenger";
import { DatabaseConnection } from "../database/database-connection";

export class PassengerDatabaseRepository implements PassengerRepository {
  constructor(private connection: DatabaseConnection) {}

  async get(passengerId: string): Promise<Passenger> {
    const [passenger] = await this.connection.query(
      "select * from passenger where passenger_id = $1",
      [passengerId]
    );
    return new Passenger(
      passenger.passenger_id,
      passenger.name,
      passenger.email,
      passenger.document
    );
  }
  async create(data: Passenger): Promise<void> {
    await this.connection.query(
      "insert into passenger (passenger_id, name, email, document) values ($1, $2, $3, $4)",
      [data.passengerId, data.name, data.email.value, data.document.value]
    );
  }
}
