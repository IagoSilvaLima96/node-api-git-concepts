export class Email {
  readonly value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new Error("Email invalido");
    }
    this.value = value;
  }

  private validate(value: string) {
    return String(value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
}
