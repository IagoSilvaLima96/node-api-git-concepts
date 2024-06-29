import { Driver } from "../../src/domain/driver/driver";

test("Deve criar motorista valido", () => {
  const driver = Driver.create(
    "Iago",
    "iagosilva@hotmail.com",
    "61032799331",
    "AAB9090"
  );
  expect(driver).toBeDefined();
});

test("Nao deve criar motorista com email invalido", () => {
  expect(() => {
    Driver.create("Iago", "iagosilva", "61032799331", "AAB9090");
  }).toThrow(new Error("Email invalido"));
});

test("Nao deve criar motorista com cpf invalido", () => {
  expect(() => {
    Driver.create("Iago", "iagosilva@gotmail.com", "61032799332", "AAB9090");
  }).toThrow(new Error("CPF Invalido"));
});

test("Nao deve criar motorista com placa invalido", () => {
  expect(() => {
    Driver.create("Iago", "iagosilva@gotmail.com", "61032799331", "A1B9090");
  }).toThrow(new Error("Placa invalida"));
});
