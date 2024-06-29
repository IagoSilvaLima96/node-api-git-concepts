import { Driver } from "../../domain/driver/driver";
import { DriverRepository } from "../repositoy/driver.repository";

export interface CreateDriverInput {
  name: string;
  email: string;
  document: string;
  carPlate: string;
}

export interface CreateDriverOutput {
  driverId: string;
}

export default class CreateDriver {
  constructor(private readonly driverRepository: DriverRepository) {}

  async execute(input: CreateDriverInput): Promise<CreateDriverOutput> {
    const driver = Driver.create(
      input.name,
      input.email,
      input.document,
      input.carPlate
    );
    await this.driverRepository.create(driver);
    return {
      driverId: driver.driverId,
    };
  }
}
