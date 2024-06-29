import { RideRepository } from "../repositoy/ride.repository";

export interface RepositoryFactory {
  createRideRepository(): RideRepository;
}
