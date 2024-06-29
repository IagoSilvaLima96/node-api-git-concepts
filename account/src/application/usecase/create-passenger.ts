import { Passenger } from "../../domain/passenger/passenger";
import { User } from "../../domain/user/user";
import { PassengerRepository } from "../repositoy/passenger.repository";
import { UserRepository } from "../repositoy/user.repository";

export interface CreatePassengerInput {
  name: string;
  email: string;
  document: string;
  password?: string;
}

export interface CreatePassengerOutput {
  passengerId: string;
}

export default class CreatePassenger {
  constructor(
    private readonly passengerRepository: PassengerRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(input: CreatePassengerInput): Promise<CreatePassengerOutput> {
    const passenger = Passenger.create(input.name, input.email, input.document);
    await this.passengerRepository.create(passenger);
    if (input.password) {
      const user = User.create(input.email, input.password, "pbkdf2");
      await this.userRepository.create(user);
    }
    return {
      passengerId: passenger.passengerId,
    };
  }
}
