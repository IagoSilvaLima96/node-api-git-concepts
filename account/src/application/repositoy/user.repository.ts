import { User } from "../../domain/user/user";

export interface UserRepository {
  create(data: User): Promise<void>;
  getByEmail(email: string): Promise<User>;
}
