export class CarPlate {
  readonly value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new Error("Placa invalida");
    }
    this.value = value;
  }

  private validate(value: string) {
    return String(value)
      .toLowerCase()
      .match(/^[a-z]{3}[0-9]{4}$/);
  }
}
