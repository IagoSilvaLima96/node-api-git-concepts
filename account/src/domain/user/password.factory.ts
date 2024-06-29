import { PBKDF2Password } from "./pbkdf2-password";
import { PlainPassword } from "./plain-password";
import { Sha1Password } from "./sha1-password";

export class PasswordFactory {
  static create(passwordType: string) {
    if (passwordType === "plain") {
      return PlainPassword;
    } else if (passwordType === "sha1") {
      return Sha1Password;
    } else if (passwordType === "pbkdf2") {
      return PBKDF2Password;
    }
    throw new Error();
  }
}
