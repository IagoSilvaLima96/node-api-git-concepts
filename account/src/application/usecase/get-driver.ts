import { DriverRepository } from "../repositoy/driver.repository";

export interface GetDriverOutput {
  driverId: string;
  name: string;
  email: string;
  document: string;
  carPlate: string;
}

export default class GetDriver {
  constructor(private readonly driverRepository: DriverRepository) {}

  async execute(driverId: string): Promise<GetDriverOutput> {
    const driver = await this.driverRepository.get(driverId);
    return {
      driverId: driver.driverId,
      name: driver.name,
      email: driver.email.value,
      document: driver.document.value,
      carPlate: driver.carPlate.value,
    };
  }
}
