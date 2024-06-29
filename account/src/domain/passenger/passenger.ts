import crypto from "crypto";
import { CPF } from "../cpf";
import { Email } from "../email";

export class Passenger {
  readonly document: CPF;
  readonly email: Email;

  constructor(
    readonly passengerId: string,
    readonly name: string,
    email: string,
    document: string
  ) {
    this.document = new CPF(document);
    this.email = new Email(email);
  }

  static create(name: string, email: string, document: string) {
    const id = crypto.randomUUID();
    return new Passenger(id, name, email, document);
  }
}
