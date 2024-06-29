import { DriverRepository } from "../repositoy/driver.repository";
import { PassengerRepository } from "../repositoy/passenger.repository";
import { UserRepository } from "../repositoy/user.repository";

export interface RepositoryFactory {
  createDriverRepository(): DriverRepository;
  createPassengerRepository(): PassengerRepository;
  createUserRepository(): UserRepository;
}
