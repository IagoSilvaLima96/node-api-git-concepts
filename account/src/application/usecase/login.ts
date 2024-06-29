import { TokenGenerator } from "../../domain/user/token-generator";
import { PassengerRepository } from "../repositoy/passenger.repository";
import { UserRepository } from "../repositoy/user.repository";

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginOutput {
  token: string;
}

export class Login {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepository.getByEmail(input.email);
    if (user.validatePassword(input.password)) {
      return {
        token: TokenGenerator.create("iago", input.email, new Date()),
      };
    }
    throw new Error("Authentication failed");
  }
}
