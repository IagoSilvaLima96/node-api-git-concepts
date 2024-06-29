import crypto from "crypto";
import { CarPlate } from "./car-plate";
import { CPF } from "../cpf";
import { Email } from "../email";

export class Driver {
  readonly document: CPF;
  readonly email: Email;
  readonly carPlate: CarPlate;

  constructor(
    readonly driverId: string,
    readonly name: string,
    email: string,
    document: string,
    carPlate: string
  ) {
    this.document = new CPF(document);
    this.carPlate = new CarPlate(carPlate);
    this.email = new Email(email);
  }

  static create(
    name: string,
    email: string,
    document: string,
    carPlate: string
  ) {
    const id = crypto.randomUUID();
    return new Driver(id, name, email, document, carPlate);
  }
}
