import { User } from "../../src/domain/user/user";
import crypto from "crypto";

test("Deve criar um usuário com senha plain", () => {
  const user = User.create("iago@gmail.com", "123456", "plain");
  expect(user.userId).toBeDefined();
  expect(user.email.value).toEqual("iago@gmail.com");
  expect(user.password.value).toEqual("123456");
});

test("Deve restaurar um usuário existente", () => {
  const userId = crypto.randomUUID();
  const user = User.restore(userId, "iago@gmail.com", "123456", "plain");
  expect(user.userId).toBeDefined();
  expect(user.email.value).toEqual("iago@gmail.com");
  expect(user.password.value).toEqual("123456");
});

test("Deve criar um usuário com senha encriptada", () => {
  const user = User.create("iago@gmail.com", "123456", "sha1");
  expect(user.userId).toBeDefined();
  expect(user.email.value).toEqual("iago@gmail.com");
  expect(user.password.value).toEqual(
    "7c4a8d09ca3762af61e59520943dc26494f8941b"
  );
});

test("Deve validar um usuário existente com senha plain", () => {
  const userId = crypto.randomUUID();
  const user = User.restore(userId, "iago@gmail.com", "123456", "plain");
  expect(user.userId).toBeDefined();
  expect(user.validatePassword("123456")).toBe(true);
});

test("Deve validar um usuário existente com senha encriptada", () => {
  const userId = crypto.randomUUID();
  const user = User.restore(
    userId,
    "iago@gmail.com",
    "7c4a8d09ca3762af61e59520943dc26494f8941b",
    "sha1"
  );
  expect(user.userId).toBeDefined();
  expect(user.validatePassword("123456")).toBe(true);
});

test("Deve validar um usuário existente com senha encriptada pbkdf2", () => {
  const salt = "95468a3fc6268ab2b0853ebd7b96013a111814de";
  const password =
    "b6cd594c88d9067e3ef29659271f458e080408c84133dbb7d67f18fad58ab3c6e80c72a9bec7b428caf667dd2b32a9a48fc71dc46553748628f7b5c401c9f1d5";
  const userId = crypto.randomUUID();
  const user = User.restore(userId, "iago@gmail.com", password, "pbkdf2", salt);
  expect(user.userId).toBeDefined();
  expect(user.validatePassword("123456")).toBe(true);
});

test("Deve criar um usuário com senha encriptada pbkdf2", () => {
  const user = User.create("iago@gmail.com", "123456", "pbkdf2");
  expect(user.userId).toBeDefined();
  expect(user.email.value).toEqual("iago@gmail.com");
  expect(user.password.value).toBeDefined();
});
