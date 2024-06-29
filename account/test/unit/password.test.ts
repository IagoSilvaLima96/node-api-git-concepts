import { PBKDF2Password } from "../../src/domain/user/pbkdf2-password";
import { PlainPassword } from "../../src/domain/user/plain-password";
import { Sha1Password } from "../../src/domain/user/sha1-password";

test("Deve criar um password plain", () => {
  const password = PlainPassword.create("123456");
  expect(password.validate("123456")).toBe(true);
});

test("Deve criar um password sha1", () => {
  const password = Sha1Password.create("123456");
  expect(password.validate("123456")).toBe(true);
});

test("Deve criar um password pbkdf2", () => {
  const password = PBKDF2Password.create("123456");
  expect(password.validate("123456")).toBe(true);
});
