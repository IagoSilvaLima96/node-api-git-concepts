import { CarPlate } from "../../src/domain/driver/car-plate";

test("Deve criar placa valida", () => {
  const plate = new CarPlate("AAB9090");
  expect(plate).toBeDefined();
});

test("Nao deve criar placa invalida", () => {
  expect(() => new CarPlate("AA9090")).toThrow(new Error("Placa invalida"));
});
