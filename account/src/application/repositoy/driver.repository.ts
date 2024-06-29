import { Driver } from "../../domain/driver/driver";

export interface DriverRepository {
  get(driverId: string): Promise<Driver>;
  create(data: Driver): Promise<void>;
}
