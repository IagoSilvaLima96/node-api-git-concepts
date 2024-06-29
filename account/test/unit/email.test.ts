import { Email } from "../../src/domain/email";

test("Deve criar email valido", () => {
  const email = new Email("iagosilvalima@hotmail.com");
  expect(email).toBeDefined();
});

test("Nao deve criar email invalido", () => {
  expect(() => {
    const email = new Email("iago");
  }).toThrow(new Error("Email invalido"));
});
