import { CPF } from "../../src/domain/cpf";

test("Deve criar cpf valido", () => {
  const cpf = new CPF("61032799331");
  expect(cpf).toBeDefined();
});

test("Não deve criar cpf com valor vazio", () => {
  expect(() => {
    const cpf = new CPF("");
  }).toThrow(new Error("CPF Invalido"));
});

test("Não deve criar cpf com tamanho invalido", () => {
  expect(() => {
    const cpf = new CPF("61032799310");
  }).toThrow(new Error("CPF Invalido"));
});

test("Não deve criar cpf com todos os caraceteres iguais", () => {
  expect(() => {
    const cpf = new CPF("00000000000");
  }).toThrow(new Error("CPF Invalido"));
});

test("Não deve criar cpf com digito verificador invalido", () => {
  expect(() => {
    const cpf = new CPF("6103279932");
  }).toThrow(new Error("CPF Invalido"));
});
