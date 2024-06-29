import { TokenGenerator } from "../../domain/user/token-generator";

type Output = {
  email: string;
};

type Input = {
  token: string;
};

export class GetSession {
  execute(input: Input): Output {
    const output = TokenGenerator.verify("iago", input.token);
    return {
      email: output.email,
    };
  }
}
