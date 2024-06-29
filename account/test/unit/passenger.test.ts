import { Passenger } from "../../src/domain/passenger/passenger";

test("Deve criar passageiro valido", () => {
  const passenger = Passenger.create(
    "Iago",
    "iagosilva@hotmail.com",
    "61032799331"
  );
  expect(passenger).toBeDefined();
});

test("Nao deve criar passageiro com email invalido", () => {
  expect(() => {
    Passenger.create("Iago", "iagosilva", "61032799331");
  }).toThrow(new Error("Email invalido"));
});

test("Nao deve criar passageiro com cpf invalido", () => {
  expect(() => {
    Passenger.create("Iago", "iagosilva@gotmail.com", "61032799332");
  }).toThrow(new Error("CPF Invalido"));
});
