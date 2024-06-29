import { Password } from "./password";
import crypto from "crypto";

export class Sha1Password implements Password {
  private constructor(readonly value: string, readonly salt: string) {}

  static create(password: string) {
    const hashPassword = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex")
      .toString();
    return new Sha1Password(hashPassword, "");
  }

  static restore(password: string) {
    return new Sha1Password(password, "");
  }

  validate(password: string): boolean {
    const hashPassword = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex")
      .toString();
    return this.value === hashPassword;
  }
}
