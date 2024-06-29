import { AccountGateway } from "../gateway/account.gateway";
import { PaymentGateway } from "../gateway/payment.gateway";
import { RideRepository } from "../repositoy/ride.repository";

export class EndRide {
  constructor(
    private readonly rideRepository: RideRepository,
    private readonly accountGateway: AccountGateway,
    private readonly paymentGateway: PaymentGateway
  ) {}

  async execute(input: Input): Promise<void> {
    const ride = await this.rideRepository.get(input.rideId);
    ride.end(input.date);
    await this.rideRepository.update(ride);
    const amount = ride.calculate();
    const passenger = await this.accountGateway.getPassenger(ride.passengerId);
    const paymentGatewayInput = {
      name: passenger.name,
      email: passenger.email,
      amount,
    };
    await this.paymentGateway.process(paymentGatewayInput);
  }
}

type Input = {
  rideId: string;
  date: Date;
};
