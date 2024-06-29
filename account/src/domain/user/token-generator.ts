import { sign, verify } from "jsonwebtoken";
export class TokenGenerator {
  static create(key: string, email: string, date: Date) {
    const expiresIn = 100000;
    return sign({ email, iat: date.getTime(), expiresIn }, key);
  }

  static verify(key: string, token: string): any {
    return verify(token, key);
  }
}
