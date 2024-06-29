import { UserRepository } from "../../application/repositoy/user.repository";
import { User } from "../../domain/user/user";
import { DatabaseConnection } from "../database/database-connection";

export class UserDatabaseRepository implements UserRepository {
  constructor(private connection: DatabaseConnection) {}
  async getByEmail(email: string): Promise<User> {
    const [user] = await this.connection.query(
      "select * from users where email = $1",
      [email]
    );
    return User.restore(
      user.user_id,
      user.email,
      user.password,
      user.password_type,
      user.salt
    );
  }

  async create(data: User): Promise<void> {
    await this.connection.query(
      "insert into users (user_id, email, password, password_type, salt) values ($1, $2, $3, $4, $5)",
      [
        data.userId,
        data.email.value,
        data.password.value,
        data.passwordType,
        data.password.salt,
      ]
    );
  }
}
