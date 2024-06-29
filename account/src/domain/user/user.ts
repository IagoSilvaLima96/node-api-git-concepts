import { Email } from "../email";
import crypto from "crypto";
import { PasswordFactory } from "./password.factory";
import { Password } from "./password";

export class User {
  private constructor(
    readonly userId: string,
    readonly email: Email,
    readonly password: Password,
    readonly passwordType: string
  ) {}

  static create(email: string, password: string, passwordType: string) {
    const userId = crypto.randomUUID();
    return new User(
      userId,
      new Email(email),
      PasswordFactory.create(passwordType).create(password),
      passwordType
    );
  }

  static restore(
    userId: string,
    email: string,
    password: string,
    passwordType: string,
    salt: string = ""
  ) {
    return new User(
      userId,
      new Email(email),
      PasswordFactory.create(passwordType).restore(password, salt),
      passwordType
    );
  }

  validatePassword(password: string): boolean {
    return this.password.validate(password);
  }
}
