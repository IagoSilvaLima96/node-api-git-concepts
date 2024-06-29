export class CPF {
  readonly value: string;
  private CPF_SIZE = 11;

  constructor(cpf: string) {
    this.validate(cpf);
    this.value = cpf;
  }

  private validate(cpf: string) {
    if (!cpf) {
      throw new Error("CPF Invalido");
    }
    const cpfOnlyNumbers = cpf.replace(/\D/g, "");
    if (cpfOnlyNumbers.length !== this.CPF_SIZE) {
      throw new Error("CPF Invalido");
    }
    if (this.isSameCharacters(cpfOnlyNumbers)) {
      throw new Error("CPF Invalido");
    }
    const cpfWithoutVerifyingDigits = cpfOnlyNumbers.substring(
      0,
      cpfOnlyNumbers.length - 2
    );
    const { firstDigit, secondDigit } = this.calcVerifyingDigits(
      cpfWithoutVerifyingDigits
    );
    const cpfWithVerifyingDigits = `${cpfWithoutVerifyingDigits}${firstDigit}${secondDigit}`;

    if (cpfWithVerifyingDigits !== cpfOnlyNumbers) {
      throw new Error("CPF Invalido");
    }
  }

  private isSameCharacters(cpfOnlyNumbers: string): boolean {
    const firstCharacter = cpfOnlyNumbers[0];
    return cpfOnlyNumbers.split("").every((char) => char === firstCharacter);
  }

  private calcVerifyingDigits(cpfWithoutVerifyingDigits: string): {
    firstDigit: string;
    secondDigit: string;
  } {
    let sumfirstDigit = 0;
    let sumSecondDigit = 0;
    for (let index = 0; index < cpfWithoutVerifyingDigits.length; index++) {
      const currentDigit = parseInt(cpfWithoutVerifyingDigits[index]);
      sumfirstDigit += currentDigit * (10 - index);
      sumSecondDigit += currentDigit * (11 - index);
    }
    const firstVerifyingDigit = this.calcVerifyingDigit(sumfirstDigit);
    sumSecondDigit += firstVerifyingDigit * 2;
    const secondVerifyingDigit = this.calcVerifyingDigit(sumSecondDigit);
    return {
      secondDigit: secondVerifyingDigit.toString(),
      firstDigit: firstVerifyingDigit.toString(),
    };
  }

  private calcVerifyingDigit(sum: number): number {
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  }
}
