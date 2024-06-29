import { RepositoryFactory } from "../factory/repository.factory";
import { AccountGateway } from "../gateway/account.gateway";
import { RideRepository } from "../repositoy/ride.repository";

export class GetRide {
  private rideRepository: RideRepository;

  constructor(
    repositoryFactory: RepositoryFactory,
    private readonly accountGateway: AccountGateway
  ) {
    this.rideRepository = repositoryFactory.createRideRepository();
  }

  async execute(input: Input): Promise<Output> {
    const ride = await this.rideRepository.get(input.rideId);
    const passenger = await this.accountGateway.getPassenger(ride.passengerId);
    let driver;
    if (ride.driverId) {
      driver = await this.accountGateway.getDriver(ride.driverId);
    }
    return {
      rideId: ride.rideId,
      status: ride.status.value,
      requestDate: ride.requestDate,
      driverId: ride.driverId,
      acceptDate: ride.acceptDate,
      startDate: ride.startDate,
      endDate: ride.endDate,
      passengerId: ride.passengerId,
      passengerName: passenger.name,
      driverName: driver?.name,
    };
  }
}

type Input = {
  rideId: string;
};

type Output = {
  rideId: string;
  status: string;
  requestDate: Date;
  driverId?: string;
  acceptDate?: Date;
  startDate?: Date;
  endDate?: Date;
  passengerId: string;
  driverName?: string;
  passengerName: string;
};
