import {
  AccountGateway,
  CreateDriverInput,
  CreateDriverOutput,
  CreatePassengerInput,
  CreatePassengerOutput,
  Driver,
  Passenger,
} from "../../application/gateway/account.gateway";
import { HttpClient } from "../http/http-client";

export class AccountHttpGateway implements AccountGateway {
  constructor(private readonly httpClient: HttpClient) {}

  async createDriver(driver: CreateDriverInput): Promise<CreateDriverOutput> {
    const response = await this.httpClient.post(
      "http://localhost:5333/drivers",
      driver
    );
    return {
      driverId: response.driverId,
    };
  }

  async createPassenger(
    passenger: CreatePassengerInput
  ): Promise<CreatePassengerOutput> {
    const response = await this.httpClient.post(
      "http://localhost:5333/passengers",
      passenger
    );
    return {
      passengerId: response.passengerId,
    };
  }

  async getDriver(driverId: string): Promise<Driver> {
    const response = await this.httpClient.get(
      `http://localhost:5333/drivers/${driverId}`
    );
    return {
      driverId,
      document: response.document,
      carPlate: response.carPlate,
      email: response.email,
      name: response.name,
    };
  }

  async getPassenger(passengerId: string): Promise<Passenger> {
    const response = await this.httpClient.get(
      `http://localhost:5333/passengers/${passengerId}`
    );
    return {
      passengerId,
      document: response.document,
      email: response.email,
      name: response.name,
    };
  }
}
