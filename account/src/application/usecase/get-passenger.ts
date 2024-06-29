import { PassengerRepository } from "../repositoy/passenger.repository";
import { UserRepository } from "../repositoy/user.repository";

export interface GetPassengerOutput {
  passengerId: string;
  name: string;
  email: string;
  document: string;
  userId: string;
}

export default class GetPassenger {
  constructor(
    private readonly passengerRepository: PassengerRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(passengerId: string): Promise<GetPassengerOutput> {
    const passenger = await this.passengerRepository.get(passengerId);
    const user = await this.userRepository.getByEmail(passenger.email.value);
    return {
      passengerId: passenger.passengerId,
      name: passenger.name,
      email: passenger.email.value,
      document: passenger.document.value,
      userId: user.userId,
    };
  }
}
