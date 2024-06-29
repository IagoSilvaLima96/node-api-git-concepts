import { Passenger } from "../../domain/passenger/passenger";

export interface PassengerRepository {
  get(passengerId: string): Promise<Passenger>;
  create(data: Passenger): Promise<void>;
}
