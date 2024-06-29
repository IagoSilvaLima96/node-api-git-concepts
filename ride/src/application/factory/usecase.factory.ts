import { RideRepository } from "../repositoy/ride.repository";
import CalculateRide from "../usecase/calculate-ride";
import { GetRide } from "../usecase/get-ride";
import RequestRide from "../usecase/request-ride";
import { RepositoryFactory } from "./repository.factory";

export class UsecaseFactory {
  private rideRepository: RideRepository;

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.rideRepository = repositoryFactory.createRideRepository();
  }

  createCalculateRide(): CalculateRide {
    return new CalculateRide();
  }

  createRequestRide(): RequestRide {
    return new RequestRide(this.rideRepository);
  }

  createGetRide(): GetRide {
    return new GetRide(this.repositoryFactory);
  }
}
